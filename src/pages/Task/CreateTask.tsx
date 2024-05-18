import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Id } from "react-toastify";
import "../../assets/create-company.css";
import { closeNotify, notifyError, notifyInfoLoading, notifySuccess } from "../../components/ui/Notify";
import { ApiError } from "../../types/others";
import { AuthInput } from "../../components/ui/AuthInput";
import { useCreateTaskMutation } from "../../features/task/createTaskApiSlice";

function CreateTaskPage() {
    const { id, companyId } = useParams<string>();
    const [theme, setTheme] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [budget, setBudget] = useState<string>('');
    const [deadlineDate, setDeadlineDate] = useState<string>('');
    const [deadlineTime, setDeadlineTime] = useState<string>('');

    const [createTask] = useCreateTaskMutation();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [toastId, setToastId] = useState<Id | null>(null);

    const navigate = useNavigate();

    useEffect(() => { }, [theme, description, budget, deadlineDate, deadlineTime]);

    useEffect(() => {
        if (isLoading) {
            setToastId(notifyInfoLoading('Loading...'));
        } else {
            if (toastId !== null) closeNotify(toastId);
        }
    }, [isLoading]);

    function handleBackClick() {
        navigate(`/${companyId}/project/${id}/tasks`);
        window.location.reload();
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            setIsLoading(true);
            await createTask({
                id: id,
                theme: theme,
                description: description,
                budget: +budget,
                deadline: `${deadlineDate}T${deadlineTime}:00.000Z`,
            }).unwrap();

            setIsLoading(false);
            notifySuccess("Task has been created");

            setTimeout(() => {
                navigate(`/${companyId}/project/${id}/tasks`);
                window.location.reload();
            }, 300);
        } catch (err) {
            setIsLoading(false);
            if (err && typeof err === 'object' && 'status' in err) {
                const error = err as ApiError;
                if (error.status === 400) {
                    notifyError(error.data.title);
                }
                else {
                    notifyError('Server error');
                }
            }
        }
    }

    const handleThemeInput = (e: ChangeEvent<HTMLInputElement>) => setTheme(e.target.value);
    const handleDescriptionInput = (e: ChangeEvent<HTMLInputElement>) => setDescription(e.target.value);
    const handleBudgetInput = (e: ChangeEvent<HTMLInputElement>) => setBudget(e.target.value);
    const handleDeadlineDateChange = (e: ChangeEvent<HTMLInputElement>) => setDeadlineDate(e.target.value);
    const handleDeadlineTimeChange = (e: ChangeEvent<HTMLInputElement>) => setDeadlineTime(e.target.value);

    return (
        <section className="create-company">
            <h1>Create Task</h1>
            <form onSubmit={handleSubmit}>
                {AuthInput({
                    type: "text",
                    id: "theme",
                    ref: null,
                    value: theme,
                    onChange: handleThemeInput,
                    autoComplete: "off",
                    required: true,
                    label: "Theme",
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
                <div className="date-picker">
                    <label htmlFor="deadline-date">Deadline Date:</label>
                    <input
                        type="date"
                        id="deadline-date"
                        value={deadlineDate}
                        onChange={handleDeadlineDateChange}
                        required
                    />
                    <label htmlFor="deadline-time">Deadline Time:</label>
                    <input
                        type="time"
                        id="deadline-time"
                        value={deadlineTime}
                        onChange={handleDeadlineTimeChange}
                        required
                    />
                </div>
                <div style={{ padding: "10px" }}>
                </div>
                <div className="button-container">
                    <button type='submit' className="submit-btn">Confirm</button>
                    <button type='button' onClick={handleBackClick} className="submit-btn">Back</button>
                </div>
            </form>
        </section>
    );
}

export default CreateTaskPage;
