import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import "../../../assets/password.css";
import { Id } from "react-toastify";
import { closeNotify, notifyError, notifyInfo, notifyInfoLoading } from "../../ui/Notify";
import { ApiError } from "../../../types/others";
import { AuthInput } from "../../ui/AuthInput";
import { MailOutline } from "react-ionicons";
import { useSendPasswordResetTokenMutation } from "../../../features/user/sendPasswordResetTokenApiSlice";
import ResetPassword from "./ResetPassword";

export default function GetPasswordToken() {

    const [email, setEmail] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isResetToken, setIsResetToken] = useState<boolean>(false);
    const [toastId, setToastId] = useState<Id | null>(null);
    const [sendPasswordResetToken] = useSendPasswordResetTokenMutation();


    useEffect(() => {
    }, [email, isResetToken]);

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

            await sendPasswordResetToken({ email: email }).unwrap();

            notifyInfo("We have sent you a password reset token by mail.");

            setTimeout(() => {
                setIsResetToken(true);
            }, 300);

            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
            if (err && typeof err === 'object' && 'status' in err) {
                const error = err as ApiError;
                if (error.status === 400) {
                    notifyError("Wrong token");
                } else {
                    notifyError('Server error');
                }
            }
        }
    }

    const handleTokenInput = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);

    const content = (
        <section className="password">
            <h1>Reset Password</h1>
            <form onSubmit={handleSubmit}>
                {AuthInput({
                    type: "text",
                    id: "email",
                    ref: null,
                    value: email,
                    onChange: handleTokenInput,
                    autoComplete: "off",
                    required: true,
                    label: "Email",
                    Icon: MailOutline,
                    iconColor: "#00000",
                    iconHeight: "20px",
                    iconWidth: "20px"
                })}
                <button type='submit' className="submit-btn">Confirm</button>
            </form>
        </section>
    );


    return (
        <div>
            {isResetToken ? <ResetPassword /> : content}
        </div>
    );
}