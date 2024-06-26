import { useNavigate, useParams } from "react-router-dom";
import "../../assets/project.css"
import { useGetProjectQuery } from "../../features/project/getProjectByIdApiSlice";
import Search from "../../components/ui/Search";
import { useGetCompanyQuery } from "../../features/company/getCompanyByIdApiSlice";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { closeNotify, notifyError, notifyInfoLoading } from "../../components/ui/Notify";
import { ApiError } from "../../types/others";
import { useUploadProjectImageMutation } from "../../features/project/uploadProjectPhotoApiSlice";
import { Id } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { selectPermissions, setData } from "../../features/performer/performerSlice";
import { useGetPerformerQuery } from "../../features/performer/getPerformerApiSlice";
import { useDeleteProjectMutation } from "../../features/project/removeProjectApiSlice";

function ProjectPage() {
    const { id, companyId } = useParams<string>();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isPhotoLoading, setIsPhotoLoading] = useState<boolean>(false);
    const [toastId, setToastId] = useState<Id | null>(null);
    const permissions = useSelector(selectPermissions);

    const [uploadPhoto] = useUploadProjectImageMutation();
    const [deleteProject] = useDeleteProjectMutation();

    const { data: project, isLoading: isProjectLoading, isSuccess: isProjectSuccess } = useGetProjectQuery({ id: id });


    useEffect(() => {
        if (isPhotoLoading) {
            setToastId(notifyInfoLoading('Loading...'));
        } else {
            if (toastId !== null) closeNotify(toastId);
        }
    }, [isPhotoLoading]);

    function handleChangePhoto() {
        if (fileInputRef) {
            fileInputRef.current?.click();
        }
    }

    async function handleDelete() {
        if (confirm("Do you wish to delete the project?")) {
            try {
                await deleteProject({ id: id }).unwrap();
                setTimeout(() => {
                    navigate("/dashboard");
                    window.location.reload();
                }, 300);
            } catch (err) {
                setIsPhotoLoading(false);
                if (err && typeof err === 'object' && 'status' in err) {
                    const error = err as ApiError;
                    if (error.status === 400) {
                        notifyError(error.data.title);
                    } else {
                        notifyError('Server error');
                    }
                    setTimeout(() => {
                        window.location.reload();
                    }, 300);
                }
            }
        }
    }

    async function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file) {
            const formData = new FormData();
            formData.append('id', id);
            formData.append('file', file);
            console.log(formData.get("id"));
            try {
                setIsPhotoLoading(true);
                await uploadPhoto(formData).unwrap();
                setIsPhotoLoading(false);

                setTimeout(() => {
                    window.location.reload();
                }, 300);
            } catch (err) {
                setIsPhotoLoading(false);
                if (err && typeof err === 'object' && 'status' in err) {
                    const error = err as ApiError;
                    if (error.status === 400) {
                        notifyError(error.data.title);
                    } else {
                        notifyError('Server error');
                    }
                    setTimeout(() => {
                        window.location.reload();
                    }, 300);
                }
            }
        }
    }

    const {
        data: performer,
        isSuccess: isPerformerSuccess
    } = useGetPerformerQuery({ id: companyId });

    if (isPerformerSuccess) {
        dispatch(setData({ ...performer }));
    }

    useEffect(() => { }, [permissions]);

    if (isProjectLoading) {
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

    if (!isProjectSuccess || !project || !isPerformerSuccess) {
        return null;
    }

    return (
        <div className="main-project-container">
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
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />
                    <div className="button-container">
                        {permissions.updateProject
                            ? <>
                                <button className="edit-button" onClick={() => navigate(`/${companyId}/project/${id}/update`)}>Update Info</button>
                                <button className="edit-button" onClick={handleChangePhoto}>Upload Image</button>
                            </>
                            : <></>
                        }
                        {permissions.deleteProject
                            ? <button className="delete-button" onClick={handleDelete}>Delete Project</button>
                            : <></>
                        }
                    </div>
                    <div className="button-container">
                        <button className="edit-button" onClick={() => navigate(`/${companyId}/project/${id}/tasks`)}>Tasks</button>
                        <button className="edit-button" onClick={() => navigate(`/${companyId}/project/${id}/members`)}>Performers</button>
                        <button className="edit-button" onClick={() => navigate(`/dashboard`)}>Back</button>
                    </div>
                    <br></br>
                    <ProjectCompany companyId={project.companyId} projectId={project.id} />
                </div>
            </div>
        </div>
    );
}

function ProjectCompany({ companyId, projectId }: { companyId: string, projectId: string }) {
    const { data: companyData, isSuccess: isCompanySuccess } = useGetCompanyQuery({ id: companyId });
    const permissions = useSelector(selectPermissions);

    if (!isCompanySuccess || !companyData) {
        return null;
    }

    return permissions.addUser ? <Search data={companyData.employees} id={projectId} /> : <></>;
}

export default ProjectPage;
