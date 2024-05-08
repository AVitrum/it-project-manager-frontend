import { useNavigate, useParams } from "react-router-dom";
import "../assets/company-details.css";
import { useGetCompanyQuery } from "../features/company/getCompanyByIdApiSlice";
import { CompanyResponse } from "../types/responses";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { closeNotify, notifyError, notifyInfoLoading } from "../components/ui/Notify";
import { Id } from "react-toastify";
import { ApiError } from "../types/others";
import { useUploadCompanyPictureMutation } from "../features/company/uploadCompanyPictureApiSlice";
import Sidebar from "../components/ui/Sidebar";

function CompanyDetailsPage() {
    const navigate = useNavigate();
    const { id } = useParams<string>();
    const [isPhotoLoading, setIsPhotoLoading] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [toastId, setToastId] = useState<Id | null>(null);
    const [uploadPhoto] = useUploadCompanyPictureMutation();

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
                    }, 1500);
                }
            }
        }
    }

    let content;

    const {
        data: data,
        isLoading,
        isSuccess
    } = useGetCompanyQuery({ id: id });

    if (isLoading) {
        content = <div className="company-center">
            <div className="company">
                <h1>Loading...</h1>
            </div>
        </div>
    } else if (isSuccess) {
        const company: CompanyResponse = data;
        content = 
        <div className="details-container">
            <div className="sidebar-right">
                    <Sidebar />
                </div>
            <div className="centered-content">
            <div className="company">
                {company.picture === null ? <></> : <img src={company.picture} alt="" />}
                <h1>Name: {company.name}</h1>
                {company.description ?
                    <p className="company-center-p">{company.description}</p> :
                    <p className="company-center-p">There is no description</p>
                }
                <br />
                <p>Budget: {company.budget}</p>

                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
                <div className="button-container">
                    <button className="edit-button" onClick={() => navigate(`/editCompany/${company.id}`)}>Change Info</button>
                    <button className="edit-button" onClick={handleChangePhoto}>Upload Image</button>
                </div>
            </div>
            </div>
        </div>
    }

    return (
        content
    );
}

export default CompanyDetailsPage;