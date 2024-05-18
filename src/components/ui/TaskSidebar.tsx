import { useNavigate } from "react-router-dom";
import "../../assets/sidebar.css"

export default function TaskSidebar({ id, companyId }: { id: string, companyId: string }) {
    const navigate = useNavigate();

    return (
        <div className="sidebar">
            <h3>Menu</h3>
            <button onClick={() => navigate(`/${companyId}/project/${id}/task/create`)} className="task-sidebar-item">Create New Task</button>
            <button onClick={() => navigate(`/${companyId}/project/${id}/tasks/diagram`)} className="task-sidebar-item">Analytics</button>
            <button onClick={() => navigate(`/${companyId}/project/${id}`)} className="task-sidebar-item">Project</button>
            <button onClick={() => navigate(`/dashboard`)} className="task-sidebar-item">To Dashboard</button>
        </div>
    );
}