import Sidebar from "../../components/ui/Sidebar";
import "../../assets/dashboard.css";
import ProjectSquare, { ProjectSquareCreate } from "../../components/ui/ProjectSquare";
import { useGetCompaniesQuery } from "../../features/company/getAllCompaniesApiSlice";
import { CompanyResponse, ProjectResponse } from "../../types/responses";
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

    const { data: data, isLoading, isSuccess } = useGetCompaniesQuery(undefined);

    if (isLoading) {
        return <div className="dashboard-container">
            <div className="centered-content"><h1 style={{ color: "#fff" }}>Loading...</h1></div>
        </div>;
    }

    if (!isSuccess) {
        return null;
    }

    const companies: CompanyResponse[] = data;

    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="centered-content">
                <div className="main-container">
                    {companies.map((company, index) => (
                        <div className="company-container" key={index}>
                            <div className="company-title">
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    {company.picture ? (
                                        <img src={company.picture} alt="Company logo" />
                                    ) : (
                                        <img src={projectTemplate.image} alt="Default project image" />
                                    )}
                                    <h3 style={{ marginLeft: '10px' }}>{company.name}</h3>
                                </div>
                                <div>
                                    <button onClick={() => navigate(`/companyMembers/${company.id}`)}>
                                        <i className="bi bi-people"></i> Members
                                    </button>
                                    <button onClick={() => navigate(`/companyDetails/${company.id}`)}>
                                        <i className="bi bi-gear-wide-connected"></i> Settings
                                    </button>
                                </div>
                            </div>
                            <div className="projects-container">
                                {company.projects.map((project, projectIndex) => (
                                    <ProjectSquare
                                        key={projectIndex}
                                        data={project}
                                        onClick={() => navigate(`/project/${company.id}`)}
                                    />
                                ))}
                                <ProjectSquareCreate id={company.id} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
