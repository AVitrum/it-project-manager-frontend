import { useGetProfileQuery } from "../features/user/profileApiSlice.ts";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../features/auth/authSlice.ts";
import { ProfileResponse } from "../types/responses.ts";
import "../assets/profile.css"
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useUploadPhotoMutation } from "../features/user/uploadPhotoApiSlice.ts";
import { closeNotify, notifyError, notifyInfoLoading } from "../components/ui/Notify.tsx";
import { Id } from "react-toastify";
import { ApiError } from "../types/others.ts";

export default function ProfilePage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [uploadPhoto] = useUploadPhotoMutation();
    const [isPhotoLoading, setIsPhotoLoading] = useState<boolean>(false);
    const [toastId, setToastId] = useState<Id | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);



    useEffect(() => {
        if (isPhotoLoading) {
            setToastId(notifyInfoLoading('Loading...'));
        } else {
            if (toastId !== null) closeNotify(toastId);
        }
    }, [isPhotoLoading]);

    function handleLogOut() {
        dispatch(logOut());
        navigate("/");
    };

    function handleChangePassword() {
        navigate("/changePassword");
    }

    async function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file)
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
                }
            }
        }
    }

    function handleChangePhoto() {
        if (fileInputRef) {
            fileInputRef.current?.click();
        }
    }

    const {
        data: data,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetProfileQuery(undefined);

    let content;
    if (isLoading) {
        content = <p>"Loading..."</p>;
    } else if (isSuccess) {
        const profile: ProfileResponse = data;

        const date = new Date(profile.creationDate);

        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };

        const formattedDate = date.toLocaleDateString('uk-UA', options);

        content = (
            <section className="profile">
                <h1>Profile</h1>
                {profile.imageUrl === null ? <></> : <img src={profile.imageUrl} alt="Profile Image" />}
                <p>Username: {profile.username}</p>
                <p>Email: {profile.email}</p>
                <p>CreatedAt: {formattedDate}</p>
                {profile.phoneNumber ? <p>Phone: {profile.phoneNumber}</p> : <></>}
                <Link to="/welcome">Back to Welcome</Link>
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
                <div className="button-container">
                    <button className="edit-button" onClick={handleChangePassword}>Change Password</button>
                    <button className="edit-button" onClick={handleChangePhoto}>Upload Photo</button>
                </div>
                <button className="logout-button" onClick={handleLogOut}>Log Out</button>
            </section>
        )
    } else if (isError) {
        content = <p>{JSON.stringify(error)}</p>;
    }

    return content
}
