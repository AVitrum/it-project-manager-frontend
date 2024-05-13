import { useNavigate, useParams } from "react-router-dom";
import "../../assets/project.css"
import { AssignmentResponse } from "../../types/responses";
import { useGetTasksQuery } from "../../features/task/getAllTasksByProjectIdApiSlice";

function TaskPage() {
    const { id } = useParams<string>();
    const navigate = useNavigate();

    const {
        data: data,
        isLoading,
        isSuccess
    } = useGetTasksQuery({ id: id });

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

    let content;

    if (isLoading) {
        content = <div className="main-project-container">
            <div className="project-centered-content">
                <div className="project-content">
                    Loading...
                </div>
            </div>
        </div>
    } else if (isSuccess) {
        const tasks: AssignmentResponse[] = data;

        content = <div className="main-project-container">
            <div className="project-centered-content">
                <div className="project-content">
                    <h1>Tasks</h1>
                    {tasks.map((task) => (
                        <div className="task-content">
                            <h1>{task.theme}</h1>
                            <p>Budget: {task.budget}</p>
                            <p>CreatedAt: {convertDate(task.createdAt)}</p>
                            <p>Deadline: {convertDate(task.createdAt)}</p>
                        </div>
                    ))}
                    <div className="button-container">
                        <button className="edit-button" onClick={() => navigate(`/${id}/task/create`)}>Create New Task</button>
                        <button className="edit-button" onClick={() => navigate(`/project/${id}`)}>Back</button>
                    </div>
                </div>
            </div>
        </div>
    }

    return content;

}

export default TaskPage