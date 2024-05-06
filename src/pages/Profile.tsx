import { useGetProfileQuery } from "../features/user/profileApiSlice.ts";
import { useNavigate } from "react-router-dom";
import { useDispatch, } from "react-redux";
import { logOut } from "../features/auth/authSlice.ts";
import { ProfileResponse } from "../types/responses.ts";
import "../assets/profile.css"
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useUploadPhotoMutation } from "../features/user/uploadPhotoApiSlice.ts";
import { closeNotify, notifyError, notifyInfoLoading } from "../components/ui/Notify.tsx";
import { Id } from "react-toastify";
import { ApiError } from "../types/others.ts";
import { AuthInput } from "../components/ui/AuthInput.tsx";
import { PersonOutline, PhonePortraitOutline } from "react-ionicons";
import { useUpdateInfoMutation } from "../features/user/updateUserApiSlice.ts";



export default function ProfilePage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [uploadPhoto] = useUploadPhotoMutation();
    const [updateUser] = useUpdateInfoMutation();

    const [username, setUsername] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [countryCode, setCountryCode] = useState('+1');

    const [isPhotoLoading, setIsPhotoLoading] = useState<boolean>(false);
    const [isChangeProfilePressed, setIsChangeProfilePressed] = useState<boolean>(false);

    const [toastId, setToastId] = useState<Id | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    function CountryCodeSelect() {
        const handleCountryCodeChange = (e: ChangeEvent<HTMLSelectElement>) => setCountryCode(e.target.value);

        return (
            <select value={countryCode} onChange={handleCountryCodeChange}>
                <option value="+1">+1 (USA)</option>
                <option value="+380">+380 (UA)</option>
            </select>
        );
    }

    useEffect(() => {
        if (isPhotoLoading) {
            setToastId(notifyInfoLoading('Loading...'));
        } else {
            if (toastId !== null) closeNotify(toastId);
        }
    }, [isPhotoLoading, username]);

    function handleLogOut() {
        dispatch(logOut());
        navigate("/");
    };

    function handleChangeProfile(username: string) {
        setUsername(username)
        setIsChangeProfilePressed(true);
    }

    function handleChangePassword() {
        navigate("/changePassword");
    }

    async function handleSubmitProfile() {
        try {
            setIsPhotoLoading(true);

            if (phone === '') {
                await updateUser({ username: username }).unwrap();
            } else {
                await updateUser({ phone: countryCode + phone, username: username }).unwrap();
            }

            setIsPhotoLoading(false);
            setIsChangeProfilePressed(false);

            window.location.reload();
        } catch (err) {
            setIsPhotoLoading(false);
            if (err && typeof err === 'object' && 'status' in err) {
                const error = err as ApiError;
                if (error.status === 400) {
                    if (error.data.errors?.Phone?.[0]) {
                        notifyError(error.data.errors.Phone[0]);
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

    const handleUserInput = (e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value);
    const handlePhoneInput = (e: ChangeEvent<HTMLInputElement>) => setPhone(e.target.value);

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
                {isChangeProfilePressed ? AuthInput({
                    type: "text",
                    id: "username",
                    ref: null,
                    value: username,
                    onChange: handleUserInput,
                    autoComplete: "off",
                    required: true,
                    label: "Username",
                    Icon: PersonOutline,
                    iconColor: "#00000",
                    iconHeight: "20px",
                    iconWidth: "20px"
                }) : <p>Username: {profile.username}</p>}
                {isChangeProfilePressed ?
                    <>
                        <div className="phone-box">
                            <span className="icon">
                                <PhonePortraitOutline
                                    color="#00000"
                                    height="20px"
                                    width="20px" />
                            </span>
                            <CountryCodeSelect />
                            <input
                                type="text"
                                value={phone}
                                onChange={handlePhoneInput}
                            />
                        </div>
                        <br />
                    </>
                    : <></>
                }
                {profile.phoneNumber && !isChangeProfilePressed ? <p>Phone: {profile.phoneNumber}</p> : <></>}
                <p>Email: {profile.email}</p>
                <p>CreatedAt: {formattedDate}</p>
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
                <div className="button-container">
                    {isChangeProfilePressed ? <button className="confirm-button" onClick={handleSubmitProfile}>Submit</button>
                        : <button className="edit-button" onClick={() => handleChangeProfile(profile.username)}>Change Profile</button>}
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
