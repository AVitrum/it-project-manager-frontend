import { ChangeEvent, useState } from "react";
import "../../assets/task-modal.css";
import { AssignmentResponse } from "../../types/responses";
import { AuthInput } from "./AuthInput";
import { MailOutline } from "react-ionicons";
import { useAddCommentMutation } from "../../features/task/addCommentApiSlice";
import { notifyError, notifySuccess } from "./Notify";
import { ApiError } from "../../types/others";

interface TaskModalProps {
    task: AssignmentResponse;
    onClose: () => void;
}

function convertDate(dateToConvert: string) {
    const date = new Date(dateToConvert);
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    return date.toLocaleDateString('uk-UA', options);
}

export default function TaskModal({ task, onClose }: TaskModalProps) {
    const [modal, setModal] = useState<boolean>(true);
    const [message, setMessage] = useState<string>('');
    const handleMessageInput = (e: ChangeEvent<HTMLInputElement>) => setMessage(e.target.value);
    const [addComment] = useAddCommentMutation();

    async function handleAddCommentClick() {
        try {
            if (message !== '') {
                await addComment({ id: task.id, message: message }).unwrap();
                notifySuccess("Added");
                setTimeout(() => {
                    window.location.reload();
                }, 300);
            }
            else {
                notifyError("Message can't be empty");
            }
        } catch (err) {
            if (err && typeof err === 'object' && 'status' in err) {
                const error = err as ApiError;
                if (error.status === 400) {
                    if (error.data.errors?.Phone?.[0]) {
                        notifyError(error.data.errors.Company[0]);
                    }
                    else {
                        notifyError(error.data.title);
                    }
                } else {
                    notifyError('Server error');
                }
            }
        }
    }

    const toggleModal = () => {
        setModal(!modal);
        onClose();
    };

    return (
        <>
            {modal && (
                <div className="modal fade-in">
                    <div onClick={toggleModal} className="overlay"></div>
                    <div className="modal-content">
                        <h2>{task.theme}</h2>
                        <p>Budget: {task.budget}</p>
                        <p>Performers: {task.performers.length}</p>
                        <p>CreatedAt: {convertDate(task.createdAt)}</p>
                        <p>UpdatedAt: {convertDate(task.updatedAt)}</p>
                        <p>Deadline: {convertDate(task.deadline)}</p>
                        {AuthInput({
                            type: "text",
                            id: "message",
                            ref: null,
                            value: message,
                            onChange: handleMessageInput,
                            autoComplete: "off",
                            required: true,
                            label: "Message",
                            Icon: MailOutline,
                            iconColor: "#00000",
                            iconHeight: "20px",
                            iconWidth: "20px"
                        })}
                        <button onClick={handleAddCommentClick} className="send-message-button">Send message</button>
                        <div className="modal-users">
                            <h1>Performers</h1>
                            {task.performers.map((performer) => (
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    {performer.picture ?
                                        <img src={performer.picture} alt="Company logo" />
                                        : <img src="/user.png" alt="Default project image" />
                                    }
                                    <h3>{performer.username}</h3>
                                </div>
                            ))}
                        </div>
                        <div className="modal-comments">
                            {task.comments.length !== 0 ? (
                                <>
                                    <h1>Comments</h1>
                                    {task.comments.map((comment) => (
                                        <div key={comment.id} style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                            {comment.user.picture ? (
                                                <img src={comment.user.picture} alt="Company logo" />
                                            ) : (
                                                <img src="/user.png" alt="Default project image" />
                                            )}
                                            <h3>{comment.user.username}:</h3>
                                            <p>{comment.message}</p>
                                        </div>
                                    ))}
                                </>
                            ) : (
                                <></>
                            )}
                        </div>
                        <div className="modal-comments">
                            {task.histories.length !== 0 ? (
                                <>
                                    <h1>Updates</h1>
                                    {task.histories.map((history) => (
                                        <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                            <p>{convertDate(history.updatedAt)}:</p>
                                            <p>{history.change}</p>
                                        </div>
                                    ))}
                                </>
                            ) : (
                                <></>
                            )}
                        </div>
                        <button className="close-modal" onClick={toggleModal}>
                            CLOSE
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
