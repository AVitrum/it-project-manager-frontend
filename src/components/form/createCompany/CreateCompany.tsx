import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Id } from "react-toastify";
import { closeNotify, notifyError, notifyInfoLoading, notifySuccess } from "../../ui/Notify.tsx";
import { ApiError } from "../../../types/others.ts";
import { AuthInput } from "../../ui/AuthInput.tsx";
import { useCreateCompanyMutation } from "../../../features/company/createCompanyApiSlice.ts";
import "../../../assets/create-company.css"

function CreateCompany() {
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [budget, setBudget] = useState<string>('');

    const [createCompany] = useCreateCompanyMutation();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [toastId, setToastId] = useState<Id | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
    }, [name, description, budget]);

    useEffect(() => {
        if (isLoading) {
            setToastId(notifyInfoLoading('Loading...'));
        } else {
            if (toastId !== null) closeNotify(toastId);
        }
    }, [isLoading]);

    function handleBackClick() {
        navigate("/dashboard");
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            setIsLoading(true);

            await createCompany({
                name: name,
                description: description,
                budget: +budget,
            }).unwrap();

            setIsLoading(false);
            notifySuccess("Company has been created");

            setTimeout(() => {
                navigate("/dashboard");
            }, 300);
        } catch (err) {
            setIsLoading(false);
            if (err && typeof err === 'object' && 'status' in err) {
                const error = err as ApiError;
                if (error.status === 409) {
                    notifyError("Company with the same name already exists");
                } else if (error.status === 400) {
                    notifyError(error.data.title);
                }
                else {
                    notifyError('Server error');
                }
            }
        }
    }

    const handleNameInput = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value);
    const handleDescriptionInput = (e: ChangeEvent<HTMLInputElement>) => setDescription(e.target.value);
    const handleBudgetInput = (e: ChangeEvent<HTMLInputElement>) => setBudget(e.target.value);

    return (
        <section className="create-company">
            <h1>Create your company</h1>
            <form onSubmit={handleSubmit}>
                {AuthInput({
                    type: "text",
                    id: "name",
                    ref: null,
                    value: name,
                    onChange: handleNameInput,
                    autoComplete: "off",
                    required: true,
                    label: "Name",
                    Icon: null,
                    iconColor: "#00000",
                    iconHeight: "20px",
                    iconWidth: "20px"
                })}
                {AuthInput({
                    type: "text",
                    id: "description",
                    ref: null,
                    value: description,
                    onChange: handleDescriptionInput,
                    autoComplete: "off",
                    required: true,
                    label: "Description",
                    Icon: null,
                    iconColor: "#00000",
                    iconHeight: "20px",
                    iconWidth: "20px"
                })}
                {AuthInput({
                    type: "text",
                    id: "budget",
                    ref: null,
                    value: budget,
                    onChange: handleBudgetInput,
                    autoComplete: "off",
                    required: true,
                    label: "Budget",
                    Icon: null,
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

export default CreateCompany;