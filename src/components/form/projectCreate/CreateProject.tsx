import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Id } from "react-toastify";
import { closeNotify, notifyError, notifyInfoLoading, notifySuccess } from "../../ui/Notify";
import { ApiError } from "../../../types/others";
import { AuthInput } from "../../ui/AuthInput";
import "../../../assets/project-create.css";
import { useCreateProjectMutation } from "../../../features/project/createProjectCompanyApiSlice";

export default function CreateProject() {

    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [budget, setBudget] = useState<string>('');

    const [createProject] = useCreateProjectMutation();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [toastId, setToastId] = useState<Id | null>(null);

    const navigate = useNavigate();
    const { id } = useParams();

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

            await createProject({
                id: id,
                name: name,
                description: description,
                budget: +budget,
            }).unwrap();

            setIsLoading(false);
            notifySuccess("Project has been created");

            setTimeout(() => {
                navigate("/dashboard");
                window.location.reload();
            }, 300);
        } catch (err) {
            setIsLoading(false);
            if (err && typeof err === 'object' && 'status' in err) {
                const error = err as ApiError;
                if (error.status === 409) {
                    notifyError(error.data.title);
                } else if (error.status === 400) {
                    if (error.data.errors) {
                        notifyError("Wrong budget");
                    }
                    else {
                        notifyError(error.data.title)
                    }
                } else {
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
            <h1>Create your project</h1>
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