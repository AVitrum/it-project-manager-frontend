import { ChangeEvent, useEffect, useRef, useState } from "react";
import "../../assets/task-modal.css";
import { AssignmentResponse } from "../../types/responses";
import { AuthInput } from "./AuthInput";
import { MailOutline } from "react-ionicons";
import { useAddCommentMutation } from "../../features/task/addCommentApiSlice";
import { closeNotify, notifyError, notifyInfoLoading, notifySuccess } from "./Notify";
import { ApiError } from "../../types/others";
import { useUploadFileMutation } from "../../features/task/uploadFileApiSlice";
import { Id } from "react-toastify";
import { useReturnTaskMutation } from "../../features/task/returnTaskApiSlice";
import { useMarkAsCompletedMutation } from "../../features/task/markCompletedApiSlice";
import { useToReviewMutation } from "../../features/task/toReviewApiSlice";
import { useGetPerformerQuery } from "../../features/performer/getPerformerApiSlice";
import { selectPermissions, setData } from "../../features/performer/performerSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectActive } from "../../features/popup/popupSlice";

interface TaskModalProps {
    task: AssignmentResponse;
    companyId: string;
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

export default function TaskModal({ task, companyId, onClose }: TaskModalProps) {
    const [modal, setModal] = useState<boolean>(true);
    const [message, setMessage] = useState<string>('');
    const handleMessageInput = (e: ChangeEvent<HTMLInputElement>) => setMessage(e.target.value);
    const [addComment] = useAddCommentMutation();
    const [uploadFile] = useUploadFileMutation();
    const [isFileLoading, setIsFileLoading] = useState<boolean>(false);
    const [toastId, setToastId] = useState<Id | null>(null);
    const [id, setId] = useState<number>();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const dispatch = useDispatch();
    const permissions = useSelector(selectPermissions);

    const [toReview] = useToReviewMutation();
    const [returnTask] = useReturnTaskMutation();
    const [markAsCompleted] = useMarkAsCompletedMutation();

    const {
        data: performer,
        isSuccess: isPerformerSuccess
    } = useGetPerformerQuery({ id: companyId });

    if (isPerformerSuccess) {
        dispatch(setData({ ...performer }));
    }

    useEffect(() => { }, [permissions]);

    useEffect(() => {
        if (isFileLoading) {
            setToastId(notifyInfoLoading('Loading...'));
        } else {
            if (toastId !== null) closeNotify(toastId);
        }
    }, [isFileLoading]);

    function handleFileUpload(id: number) {
        if (fileInputRef) {
            setId(id);
            fileInputRef.current?.click();
        }
    }

    async function handleToReview() {
        try {
            await toReview({ id: task.id }).unwrap();
            setTimeout(() => {
                window.location.reload();
            }, 300);
        } catch (err) {
            if (err && typeof err === 'object' && 'status' in err) {
                const error = err as ApiError;
                if (error.status === 400) {
                    notifyError(error.data.title);
                }
                else {
                    notifyError('Server error');
                }
            }
        }
    }

    async function handleMarkTask() {
        try {
            await markAsCompleted({ id: task.id }).unwrap();
            setTimeout(() => {
                window.location.reload();
            }, 300);
        } catch (err) {
            if (err && typeof err === 'object' && 'status' in err) {
                const error = err as ApiError;
                if (error.status === 400) {
                    notifyError(error.data.title);
                }
                else {
                    notifyError('Server error');
                }
            }
        }
    }

    async function handleReturnTask() {
        try {
            await returnTask({ id: task.id }).unwrap();
            setTimeout(() => {
                window.location.reload();
            }, 300);
        } catch (err) {
            if (err && typeof err === 'object' && 'status' in err) {
                const error = err as ApiError;
                if (error.status === 400) {
                    notifyError(error.data.title);
                }
                else {
                    notifyError('Server error');
                }
            }
        }
    }

    async function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file) {
            const formData = new FormData();
            formData.append('id', id);
            formData.append('file', file);
            console.log(formData.get("id"));
            try {
                setIsFileLoading(true);
                await uploadFile(formData).unwrap();
                setIsFileLoading(false);

                setTimeout(() => {
                    window.location.reload();
                }, 300);
            } catch (err) {
                setIsFileLoading(false);
                if (err && typeof err === 'object' && 'status' in err) {
                    const error = err as ApiError;
                    if (error.status === 400) {
                        notifyError(error.data.title);
                    } else {
                        notifyError('Server error');
                    }
                    setTimeout(() => {
                        window.location.reload();
                    }, 300);
                }
            }
        }
    }

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
                        <br></br>
                        <button className="send-file-button" onClick={() => handleFileUpload(task.id)}>Upload File</button>
                        {task.type !== "COMPLETED" && task.type !== "IN_REVIEW" ? <button className="send-file-button" onClick={handleToReview}>Complete</button> : <></>}
                        {permissions.updateTask && task.type === "IN_REVIEW" && (
                            <>
                                <button className="send-file-button" onClick={handleMarkTask}>Approve</button>
                                <button className="send-file-button" onClick={handleReturnTask}>Return</button>
                            </>
                        )}

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
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />
                        <div className="modal-comments">
                            {task.files.length !== 0 ? (
                                <>
                                    <h1>Files</h1>
                                    {task.files.map((file) => (
                                        <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                            <a href={file.link}>{file.name}</a>
                                        </div>
                                    ))}
                                </>
                            ) : (
                                <></>
                            )}
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
