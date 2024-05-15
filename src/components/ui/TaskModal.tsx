import { useState } from "react";
import "../../assets/task-modal.css";
import { AssignmentResponse } from "../../types/responses";

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
    const [modal, setModal] = useState(true);

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
                        <p>Deadline: {convertDate(task.deadline)}</p>
                        <div className="modal-users">
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
                        <button className="close-modal" onClick={toggleModal}>
                            CLOSE
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
