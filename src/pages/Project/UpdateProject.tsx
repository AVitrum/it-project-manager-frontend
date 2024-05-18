import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Id } from "react-toastify";
import "../../assets/create-company.css"
import { closeNotify, notifyError, notifyInfoLoading, notifySuccess } from "../../components/ui/Notify";
import { ApiError } from "../../types/others";
import { AuthInput } from "../../components/ui/AuthInput";
import { useGetProjectQuery } from "../../features/project/getProjectByIdApiSlice";
import { ProjectResponse } from "../../types/responses";
import { useUpdateProjectMutation } from "../../features/project/updateProjectApiSlice";

export default function UpdateProjectPage() {
    const { id, companyId } = useParams<string>();
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [budget, setBudget] = useState<string>('');
    const [loaded, setLoaded] = useState<boolean>(false);
    const navigate = useNavigate();

    const {
        data: data,
        isLoading: isProjectLoading,
        isSuccess
    } = useGetProjectQuery({ id: id });

    const [updateProject] = useUpdateProjectMutation();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [toastId, setToastId] = useState<Id | null>(null);


    useEffect(() => {
    }, [name, description, budget]);

    useEffect(() => {
        if (isSuccess && !loaded) {
            const project: ProjectResponse = data;
            setName(project.name);
            setDescription(project.description);
            setBudget(project.budget.toString());
            setLoaded(true);
        }
    }, [isSuccess, data, loaded]);

    useEffect(() => {
        if (isLoading) {
            setToastId(notifyInfoLoading('Loading...'));
        } else {
            if (toastId !== null) closeNotify(toastId);
        }
    }, [isLoading]);

    function handleBackClick() {
        navigate(`/${companyId}/project/${id}`);
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            setIsLoading(true);

            await updateProject({
                id: id,
                name: name,
                description: description,
                budget: +budget,
            }).unwrap();

            setIsLoading(false);
            notifySuccess("Project has been updated");

            setTimeout(() => {
                navigate(`/${companyId}/project/${id}`);
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

    let content;

    if (isProjectLoading) {
        <section className="create-company">
            <h1>Loading...</h1>
        </section>
    } else if (isSuccess) {
        content = <section className="create-company">
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
    }

    return content;
}