import { useNavigate, useParams } from "react-router-dom";
import "../../assets/project.css"
import { useGetProjectQuery } from "../../features/project/getProjectByIdApiSlice";
import { ProjectResponse } from "../../types/responses";

function ProjectPage() {
    const { id } = useParams<string>();
    const navigate = useNavigate();

    const {
        data: data,
        isLoading,
        isSuccess
    } = useGetProjectQuery({ id: id });

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
        const project: ProjectResponse = data;
        content = <div className="main-project-container">
            <div className="project-centered-content">
                <div className="project-content">
                    <div>
                        {project.image === null ? <></> : <img className="company-img" src={project.image} alt="" />}
                        <h1>{project.name}</h1>
                        <h3>{project.description}</h3>
                    </div>
                    <div>
                        <p>Budget: {project.budget}</p>
                    </div>
                    <div className="button-container">
                        <button className="edit-button" onClick={() => navigate(`/${id}/tasks`)}>Tasks</button>
                        <button className="edit-button" onClick={() => navigate(`/dashboard`)}>Back</button>
                    </div>
                </div>
            </div>
        </div>
    }

    return content;

}

export default ProjectPage