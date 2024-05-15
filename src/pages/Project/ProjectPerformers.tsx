import { useNavigate, useParams } from "react-router-dom";
import { ProjectResponse } from "../../types/responses";
import "../../assets/company-details.css";
import "../../assets/members.css";
import { useSelector } from "react-redux";
import { selectCurrentEmail } from "../../features/auth/authSlice";
import { ApiError } from "../../types/others";
import { notifyError } from "../../components/ui/Notify";
import Sidebar from "../../components/ui/Sidebar";
import { useGetProjectQuery } from "../../features/project/getProjectByIdApiSlice";
import { useRemoveFromProjectMutation } from "../../features/project/removePerformerApiSlice";

function ProjectPerformersPage() {
    const { id } = useParams<string>();
    const navigate = useNavigate();

    const currentEmail = useSelector(selectCurrentEmail);
    const [removeFromProject] = useRemoveFromProjectMutation();

    async function handleRemove(email: string) {
        try {
            if (confirm("Do you wish to perform this action?")) {
                await removeFromProject({ id: id, email: email }).unwrap();
                navigate(`/project/${id}`);
                setTimeout(() => {
                    window.location.reload();
                }, 600);
            }
        } catch (err) {
            if (err && typeof err === 'object' && 'status' in err) {
                const error = err as ApiError;
                if (error.status === 400) {
                    if (error.data.errors?.Email?.[0]) {
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

    let content;

    const {
        data: data,
        isLoading,
        isSuccess
    } = useGetProjectQuery({ id: id });

    if (isLoading) {
        content = <div className="centered-content-details">
            <div className="company">
                <h1>Loading...</h1>
            </div>
        </div>
    } else if (isSuccess) {
        const project: ProjectResponse = data;
        content =
            <div className="details-container">
                <div>
                    <Sidebar />
                </div>
                <div className="centered-content-details">
                    <div className="company">
                        <h1>Company Members: {project.performers.length}</h1>
                        <div className="employee-list">
                            {project.performers.map((employee, index) => (
                                <div className="member-container" key={index}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        {employee.picture ?
                                            <img src={employee.picture} alt="Company logo" />
                                            : <img src="../../public/user.png" alt="Default project image" />
                                        }
                                        <h3>{employee.username}</h3>
                                    </div>
                                    <div>
                                        {employee.email === currentEmail ?
                                            <></> :
                                            <button onClick={() => handleRemove(employee.email)}><i className="bi bi-door-open-fill"></i> Kick</button>
                                        }
                                    </div>
                                </div>
                            ))}
                        </div>
                        <br></br>
                        <button className="add-user-button" onClick={() => navigate(`/project/${id}`)}>Back</button>
                    </div>
                </div>
            </div>
    }
    return content;
}

export default ProjectPerformersPage;
