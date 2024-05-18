import Sidebar from "../../components/ui/Sidebar";
import "../../assets/dashboard.css";
import ProjectSquare, { ProjectSquareCreate } from "../../components/ui/ProjectSquare";
import { useGetCompaniesQuery } from "../../features/company/getAllCompaniesApiSlice";
import { CompanyResponse, ProjectResponse } from "../../types/responses";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useState } from "react";

export default function Dashboard() {
    const navigate = useNavigate();
    const [sortOrder, setSortOrder] = useState<string>("asc");
    const { data: data, isLoading, isSuccess, refetch } = useGetCompaniesQuery({ order: sortOrder });

    function OrderSelect() {
        const handleCountryCodeChange = (e: ChangeEvent<HTMLSelectElement>) => {
            setSortOrder(e.target.value);
            refetch();
        }

        return (
            <select value={sortOrder} onChange={handleCountryCodeChange}>
                <option value="asc">Increased</option>
                <option value="desc">Decreased</option>
            </select>
        );
    }

    const projectTemplate: ProjectResponse = {
        name: "Create your project",
        image: "3548176.jpg",
        id: -1,
        description: "",
        budget: 0,
        performers: []
    };

    if (isLoading) {
        return <div className="dashboard-container">
            <div className="centered-content"><h1 style={{ color: "#fff" }}>Loading...</h1></div>
        </div>;
    }

    if (!isSuccess) {
        return null;
    }


    const companies: CompanyResponse[] = data;

    let content =
        <div className="dashboard-container">
            {companies.length > 0
                ? <Sidebar />
                : <></>
            }
            <div className="centered-content">
                <div className="main-container">
                    {companies.length > 0
                        ? <div className="order-selector">
                            <OrderSelect />
                        </div>
                        : <></>
                    }
                    {companies.map((company, index) => (
                        <div className="company-container" key={index}>
                            <div className="company-title">
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    {company.picture ? (
                                        <img src={company.picture} alt="Company logo" />
                                    ) : (
                                        <img src="/project-default.jpg" alt="Default project image" />
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
                                        onClick={() => navigate(`/${company.id}/project/${project.id}/tasks`)}
                                    />
                                ))}
                                <ProjectSquareCreate id={company.id} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    return content;
}
