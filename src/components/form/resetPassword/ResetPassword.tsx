import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Id } from "react-toastify";
import { closeNotify, notifyError, notifyInfoLoading, notifySuccess } from "../../ui/Notify";
import { ApiError } from "../../../types/others";
import { AuthInput } from "../../ui/AuthInput";
import { KeyOutline, LockClosedOutline } from "react-ionicons";
import { useResetPasswordMutation } from "../../../features/user/resetPassword";
import "../../../assets/password.css"

export default function ResetPassword() {

    const [token, setToken] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [toastId, setToastId] = useState<Id | null>(null);
    const [resetPassword] = useResetPasswordMutation();


    const navigate = useNavigate();

    useEffect(() => {
    }, [token, password, confirmPassword]);

    useEffect(() => {
        if (isLoading) {
            setToastId(notifyInfoLoading('Loading...'));
        } else {
            if (toastId !== null) closeNotify(toastId);
        }
    }, [isLoading]);

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            setIsLoading(true);

            await resetPassword({ 
                token: token,
                password: password,
                confirmPassword: confirmPassword
            }).unwrap();
            notifySuccess("Please, login again!");
            setTimeout(() => {
                navigate("/");
            }, 300);

            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
            if (err && typeof err === 'object' && 'status' in err) {
                const error = err as ApiError;
                if (error.status === 400) {
                    notifyError("Incorrect token or passwords do not match");
                } else {
                    notifyError('Server error');
                }
            }
        }
    }

    const handleTokenInput = (e: ChangeEvent<HTMLInputElement>) => setToken(e.target.value);
    const handlePasswordInput = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
    const handleConfirmPasswordInput = (e: ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value);

    return (
        <section className="password">
            <h1>Reset Password</h1>
            <form onSubmit={handleSubmit}>
                {AuthInput({
                    type: "text",
                    id: "token",
                    ref: null,
                    value: token,
                    onChange: handleTokenInput,
                    autoComplete: "off",
                    required: true,
                    label: "Password Reset Token",
                    Icon: KeyOutline,
                    iconColor: "#00000",
                    iconHeight: "20px",
                    iconWidth: "20px"
                })}
                {AuthInput({
                    type: "password",
                    id: "token",
                    ref: null,
                    value: password,
                    onChange: handlePasswordInput,
                    autoComplete: "off",
                    required: true,
                    label: "Password",
                    Icon: LockClosedOutline,
                    iconColor: "#00000",
                    iconHeight: "20px",
                    iconWidth: "20px"
                })}
                {AuthInput({
                    type: "password",
                    id: "token",
                    ref: null,
                    value: confirmPassword,
                    onChange: handleConfirmPasswordInput,
                    autoComplete: "off",
                    required: true,
                    label: "Confirm Password",
                    Icon: LockClosedOutline,
                    iconColor: "#00000",
                    iconHeight: "20px",
                    iconWidth: "20px"
                })}
                <button type='submit' className="submit-btn">Confirm</button>
            </form>
        </section>
    );
}