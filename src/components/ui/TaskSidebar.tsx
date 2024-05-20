import { useNavigate } from "react-router-dom";
import "../../assets/sidebar.css"
import { ApiError } from "../../types/others";
import { notifyError } from "./Notify";
import { useImportTaskMutation } from "../../features/task/importTasksApiSlice";

export default function TaskSidebar({ id, companyId }: { id: string, companyId: string }) {
    const navigate = useNavigate();
    const [importTask] = useImportTaskMutation();


    async function handleImport() {
        try {
            if (confirm("All tasks to which you belong will be imported into your calendar. The system requires login via Google, if you are not logged in to your account via Google, do this!")) {
                await importTask({
                    id: id,
                }).unwrap();

                setTimeout(() => {
                    window.location.reload();
                }, 300);
            }
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

    return (
        <div className="sidebar">
            <h3>Menu</h3>
            <button onClick={() => navigate(`/${companyId}/project/${id}/task/create`)} className="task-sidebar-item">Create New Task</button>
            <button onClick={() => navigate(`/${companyId}/project/${id}/tasks/diagram`)} className="task-sidebar-item">Analytics</button>
            <button onClick={handleImport} className="task-sidebar-item">Import To Calendar</button>
            <button onClick={() => navigate(`/${companyId}/project/${id}`)} className="task-sidebar-item">Project</button>
            <button onClick={() => navigate(`/dashboard`)} className="task-sidebar-item">To Dashboard</button>
        </div>
    );
}