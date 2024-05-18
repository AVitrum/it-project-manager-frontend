import { useNavigate, useParams } from "react-router-dom";
import "../../assets/project.css"
import { useGetTaskQuery } from "../../features/task/getTaskApiSlice";
import { useGetProjectQuery } from "../../features/project/getProjectByIdApiSlice";
import TaskSearch from "../../components/ui/TaskSearch";

function AddTaskPerformerPage() {
    const { id, companyId, taskId } = useParams<string>();
    const navigate = useNavigate();

    const { data: assignment, isLoading, isSuccess } = useGetTaskQuery({ id: taskId });

    if (isLoading) {
        return (
            <div className="main-project-container">
                <div className="project-centered-content">
                    <div className="project-content">
                        Loading...
                    </div>
                </div>
            </div>
        );
    }

    if (!isSuccess || !assignment) {
        return null;
    }

    return (
        <div className="main-project-container">
            <div className="project-centered-content">
                <div className="project-content">
                    <h1>Add Performer</h1>
                    <br></br>
                    <ProjectCompany taskId={assignment.id} projectId={id!} />
                    <div className="button-container">
                        <button className="edit-button" onClick={() => navigate(`/${companyId}/project/${id}/tasks`)}>Back</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ProjectCompany({ taskId, projectId }: { taskId: string, projectId: string }) {
    const { data: projectData, isSuccess: isCompanySuccess } = useGetProjectQuery({ id: projectId });

    if (!isCompanySuccess || !projectData) {
        return null;
    }

    return <TaskSearch data={projectData.performers} id={taskId} />;
}

export default AddTaskPerformerPage;
