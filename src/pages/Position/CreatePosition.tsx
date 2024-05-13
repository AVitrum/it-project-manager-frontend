import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Id } from "react-toastify";
import "../../assets/company-details.css";
import { useAddPositionToCompanyMutation } from "../../features/company/addPositionToCompanyApiSlice";
import { closeNotify, notifyError, notifyInfoLoading, notifySuccess } from "../../components/ui/Notify";
import { ApiError } from "../../types/others";
import Sidebar from "../../components/ui/Sidebar";
import { AuthInput } from "../../components/ui/AuthInput";

interface Permission {
    name: string;
    value: boolean;
}

const permissionsList: Permission[] = [
    { name: "Create Project", value: false },
    { name: "Update Project", value: false },
    { name: "Delete Project", value: false },
    { name: "Add User", value: false },
    { name: "Update User", value: false },
    { name: "Delete User", value: false },
    { name: "Add Budget", value: false },
    { name: "Update Budget", value: false },
    { name: "Create Position", value: false },
    { name: "Update Position", value: false },
    { name: "Create Task", value: false },
    { name: "Update Task", value: false },
    { name: "Delete Task", value: false }
];

function CreatePositionPage() {
    const [name, setName] = useState<string>('');
    const [priority, setPriority] = useState<string>('');
    const [permissions, setPermissions] = useState<Permission[]>(permissionsList);

    const { id } = useParams<string>();

    const [addPosition] = useAddPositionToCompanyMutation();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [toastId, setToastId] = useState<Id | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
    }, [name, permissions, priority]);

    useEffect(() => {
        if (isLoading) {
            setToastId(notifyInfoLoading('Loading...'));
        } else {
            if (toastId !== null) closeNotify(toastId);
        }
    }, [isLoading]);

    function handleBackClick() {
        navigate(`/companyDetails/${id}`);
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            setIsLoading(true);

            const permissionsObject = {};
            permissions.forEach(permission => {
                permissionsObject[permission.name.replace(/\s+/g, '')] = permission.value;
            });

            await addPosition({
                id: id,
                name: name,
                priority: +priority,
                ...permissionsObject
            }).unwrap();

            setIsLoading(false);
            notifySuccess("Position has been created");
            setTimeout(() => {
                navigate(`/companyDetails/${id}`);
                window.location.reload();
            }, 500);
        } catch (err) {
            setIsLoading(false);
            if (err && typeof err === 'object' && 'status' in err) {
                const error = err as ApiError;
                if (error.status === 409) {
                    notifyError("Position with the same name already exists");
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
    const handlePriorityInput = (e: ChangeEvent<HTMLInputElement>) => setPriority(e.target.value);

    const handlePermissionChange = (index: number) => {
        const updatedPermissions = [...permissions];
        updatedPermissions[index].value = !updatedPermissions[index].value;
        setPermissions(updatedPermissions);
    };

    return (
        <div className="details-container">
            <div className="sidebar-right">
                <Sidebar />
            </div>
            <div className="centered-content-details">
                <div className="create-position">
                    <h1 style={{ color: "#fff" }}>Create Position</h1>
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
                            id: "priority",
                            ref: null,
                            value: priority,
                            onChange: handlePriorityInput,
                            autoComplete: "off",
                            required: true,
                            label: "Priority",
                            Icon: null,
                            iconColor: "#00000",
                            iconHeight: "20px",
                            iconWidth: "20px"
                        })}
                        <div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Permission</th>
                                        <th>Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {permissions.map((permission, index) => (
                                        <tr key={index}>
                                            <td>{permission.name}</td>
                                            <td>
                                                <label>
                                                    <input
                                                        type="checkbox"
                                                        checked={permission.value}
                                                        onChange={() => handlePermissionChange(index)}
                                                    />
                                                    {permission.value ? "True" : "False"}
                                                </label>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="button-container">
                            <button type='submit' className="submit-btn">Confirm</button>
                            <button onClick={handleBackClick} className="submit-btn">Back</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreatePositionPage;
