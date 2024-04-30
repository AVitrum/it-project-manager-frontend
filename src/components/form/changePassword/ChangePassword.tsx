import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useChangePasswordMutation } from "../../../features/user/changePasswordApiSlice";
import { Id } from "react-toastify";
import { closeNotify, notifyError, notifyInfoLoading, notifySuccess } from "../../ui/Notify";
import { ApiError } from "../../../types/others";
import { AuthInput } from "../../ui/AuthInput";
import { LockClosedOutline } from "react-ionicons";
import "../../../assets/password.css";

export default function ChangePassword() {

    const [newPassword, setNewPassword] = useState<string>('');
    const [secondNewPassword, setSecondNewPassword] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [toastId, setToastId] = useState<Id | null>(null);

    const [changePassword] = useChangePasswordMutation();

    const navigate = useNavigate();


    useEffect(() => {
    }, [newPassword, changePassword]);

    useEffect(() => {
        if (isLoading) {
            setToastId(notifyInfoLoading('Loading...'));
        } else {
            if (toastId !== null) closeNotify(toastId);
        }
    }, [isLoading]);

    function handleBackClick() {
        navigate("/profile");
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            setIsLoading(true);

            await changePassword({
                newPassword: newPassword,
                secondNewPassword: secondNewPassword
            }).unwrap();

            setIsLoading(false);
            notifySuccess("Password has been updated");

            setTimeout(() => {
                navigate("/profile");
            }, 300);
        } catch (err) {
            setIsLoading(false);
            if (err && typeof err === 'object' && 'status' in err) {
                const error = err as ApiError;
                if (error.status === 400) {
                    notifyError("Passwords are not the same");
                } else {
                    notifyError('Server error');
                }
            }
        }
    }

    const handleNewPasswordInput = (e: ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value);
    const handleSecondNewPasswordInput = (e: ChangeEvent<HTMLInputElement>) => setSecondNewPassword(e.target.value);

    return (
        <section className="password">
            <h1>Change Password</h1>
            <form onSubmit={handleSubmit}>
                {AuthInput({
                    type: "password",
                    id: "newPassword",
                    ref: null,
                    value: newPassword,
                    onChange: handleNewPasswordInput,
                    autoComplete: "off",
                    required: true,
                    label: "New Password",
                    Icon: LockClosedOutline,
                    iconColor: "#00000",
                    iconHeight: "20px",
                    iconWidth: "20px"
                })}
                {AuthInput({
                    type: "password",
                    id: "secondNewPassword",
                    ref: null,
                    value: secondNewPassword,
                    onChange: handleSecondNewPasswordInput,
                    autoComplete: "off",
                    required: true,
                    label: "Confirm New Password",
                    Icon: LockClosedOutline,
                    iconColor: "#00000",
                    iconHeight: "20px",
                    iconWidth: "20px"
                })}
                <div className="button-container">
                    <button type='submit' className="submit-btn">Confirm</button>
                    <button onClick={handleBackClick} className="submit-btn">Back</button>
                </div>
            </form>
        </section>
    );
}