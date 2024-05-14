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

function ProjectPage() {
    const { id } = useParams<string>();
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isPhotoLoading, setIsPhotoLoading] = useState<boolean>(false);
    const [toastId, setToastId] = useState<Id | null>(null);

    const [uploadPhoto] = useUploadProjectImageMutation();

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

    if (!isProjectSuccess || !project) {
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
                        <button className="edit-button" onClick={() => navigate(`/${id}/tasks`)}>Tasks</button>
                        <button className="edit-button" onClick={handleChangePhoto}>Upload Image</button>
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

    if (!isCompanySuccess || !companyData) {
        return null;
    }

    return <Search data={companyData.employees} id={projectId} />;
}

export default ProjectPage;
