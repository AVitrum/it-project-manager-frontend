import Sidebar from "../components/ui/Sidebar";
import "../assets/dashboard.css";
import ProjectSquare, { ProjectSquareCreate } from "../components/ui/ProjectSquare";
import { useGetCompaniesQuery } from "../features/company/getAllCompaniesApiSlice";
import { CompanyResponse, ProjectResponse } from "../types/responses";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {

    const navigate = useNavigate();

    const projectTemplate: ProjectResponse = {
        name: "Create your project",
        image: "3548176.jpg",
        id: -1,
        description: "",
        budget: 0,
        performers: []
    };

    const {
        data: data,
        isLoading,
        isSuccess
    } = useGetCompaniesQuery(undefined);

    let content;
    if (isLoading) {
        content = <div className="dashboard-container">
            <div className="centered-content"><h1 style={{ color: "#fff" }}>Loading...</h1></div>
        </div>
    } else if (isSuccess) {
        const response: CompanyResponse[] = data;

        content = (
            <div className="dashboard-container">
                <div className="sidebar-right">
                    <Sidebar data={response} />
                </div>
                <div className="centered-content">
                    <div className="title" style={{ paddingLeft: "30px" }}><h3>Your companies</h3></div>
                    {response.map((item, index) =>
                        <div className="project-container" key={index}>
                            <div className="project-title">
                                {item.picture ?
                                    <img src={item.picture} alt="Company logo" />
                                    : <img src={projectTemplate.image} alt="Default project image" />
                                }
                                <h3>{item.name}</h3>
                            </div>
                            <div className="projects-container">
                                {item.projects.map((project, projectIndex) =>
                                    <ProjectSquare key={projectIndex} data={project} onClick={() => navigate(`/project/${item.id}`)} />
                                )}
                                <ProjectSquareCreate id={item.id} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
    return (
        content
    );
}
