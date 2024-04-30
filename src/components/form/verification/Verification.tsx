import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import "../../../assets/password.css";
import { useNavigate } from "react-router-dom";
import { Id } from "react-toastify";
import { closeNotify, notifyError, notifyInfoLoading, notifySuccess } from "../../ui/Notify";
import { ApiError } from "../../../types/others";
import { useVerifyMutation } from "../../../features/auth/verifyAccountApiSlice";
import { AuthInput } from "../../ui/AuthInput";
import { KeyOutline } from "react-ionicons";

export default function Verification() {

    const [token, setToken] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [toastId, setToastId] = useState<Id | null>(null);
    const [verifyAccount] = useVerifyMutation();


    const navigate = useNavigate();

    useEffect(() => {
    }, [token]);

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

            await verifyAccount({ token }).unwrap();
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
                    notifyError("Wrong token");
                } else {
                    notifyError('Server error');
                }
            }
        }
    }

    const handleTokenInput = (e: ChangeEvent<HTMLInputElement>) => setToken(e.target.value);

    return (
        <section className="password">
            <form onSubmit={handleSubmit}>
                {AuthInput({
                    type: "text",
                    id: "token",
                    ref: null,
                    value: token,
                    onChange: handleTokenInput,
                    autoComplete: "off",
                    required: true,
                    label: "Verification Token",
                    Icon: KeyOutline,
                    iconColor: "#00000",
                    iconHeight: "20px",
                    iconWidth: "20px"
                })}
                <button type='submit' className="submit-btn">Confirm</button>
            </form>
        </section>
    );
}