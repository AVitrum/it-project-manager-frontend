import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Id } from "react-toastify";
import "../../assets/company-details.css";
import "../../assets/profile.css";
import { closeNotify, notifyError, notifyInfoLoading, notifySuccess } from "../../components/ui/Notify";
import { ApiError } from "../../types/others";
import Sidebar from "../../components/ui/Sidebar";
import { AuthInput } from "../../components/ui/AuthInput";
import { useUpdatePositionMutation } from "../../features/company/updatePositionInCompany";
import { useGetPositionsQuery } from "../../features/company/getPositionsApiSlice";
import { PositionInCompanyResponse } from "../../types/responses";

interface Permission {
    row: string;
    value: boolean;
    name: string;
}

const permissionsList: Permission[] = [
    { row: "Create Project", name: "createProject", value: false },
    { row: "Update Project", name: "updateProject", value: false },
    { row: "Delete Project", name: "deleteProject", value: false },
    { row: "Add User", name: "addUser", value: false },
    { row: "Update User", name: "updateUser", value: false },
    { row: "Delete User", name: "createUser", value: false },
    { row: "Add Budget", name: "addBudget", value: false },
    { row: "Update Budget", name: "updateBudget", value: false },
    { row: "Create Position", name: "createPosition", value: false },
    { row: "Update Position", name: "updatePosition", value: false },
    { row: "Create Task", name: "createTask", value: false },
    { row: "Update Task", name: "updateTask", value: false },
    { row: "Delete Task", name: "deleteTask", value: false }
];

function UpdatePositionPage() {
    // State
    const [priority, setPriority] = useState<string>('');
    const [permissions, setPermissions] = useState<Permission[] | undefined>(permissionsList);
    const [position, setPosition] = useState<string | null>(null);
    const [loaded, setLoaded] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [toastId, setToastId] = useState<Id | null>(null);

    // Hooks
    const { id } = useParams<string>();
    const navigate = useNavigate();

    // Queries
    const [updatePosition] = useUpdatePositionMutation();
    const {
        data: positionsData,
        isSuccess: isSuccessPositions,
        isLoading: isLoadingPositions
    } = useGetPositionsQuery({ id: id });
    const positions: PositionInCompanyResponse[] = positionsData || [];

    // Functions
    function convertPermissions(obj: PositionInCompanyResponse): Permission[] {
        return [
            { row: "Create Project", name: "createProject", value: obj.createProject },
            { row: "Update Project", name: "updateProject", value: obj.updateProject },
            { row: "Delete Project", name: "deleteProject", value: obj.deleteProject },
            { row: "Add User", name: "addUser", value: obj.addUser },
            { row: "Update User", name: "updateUser", value: obj.updateUser },
            { row: "Delete User", name: "createUser", value: obj.deleteUser },
            { row: "Add Budget", name: "addBudget", value: obj.addBudget },
            { row: "Update Budget", name: "updateBudget", value: obj.updateBudget },
            { row: "Create Position", name: "createPosition", value: obj.createPosition },
            { row: "Update Position", name: "updatePosition", value: obj.updatePosition },
            { row: "Create Task", name: "createTask", value: obj.createTask },
            { row: "Update Task", name: "updateTask", value: obj.updateTask },
            { row: "Delete Task", name: "deleteTask", value: obj.deleteTask }
        ];
    }

    //Components
    const PositionSelect = () => {
        let selectorContent;
        if (isLoadingPositions) {
            selectorContent = <p>Loading...</p>;
        } else if (isSuccessPositions) {
            const handlePositionChange = (e: ChangeEvent<HTMLSelectElement>) => {
                const selectedPosition = positions.find(pos => pos.name === e.target.value);
                setPosition(selectedPosition ? selectedPosition.name : null);
                setPriority(selectedPosition?.priority.toString());
                setPermissions(convertPermissions(selectedPosition!));
            };
            selectorContent = (
                <select value={position || ''} onChange={handlePositionChange}>
                    {positions.map(pos => (
                        <option key={pos.name} value={pos.name}>{pos.name}</option>
                    ))}
                </select>
            );
        }
        return selectorContent;
    };

    // Effects
    useEffect(() => {
        if (isSuccessPositions && !loaded) {
            setPosition(positions[0].name);
            setPermissions(convertPermissions(positions[0]));
            setPriority(positions[0].priority.toString());
            setLoaded(true);
        }
    }, [positions, loaded]);

    useEffect(() => {
        if (isLoading) {
            setToastId(notifyInfoLoading('Loading...'));
        } else {
            if (toastId !== null) closeNotify(toastId);
        }
    }, [isLoading]);

    // Event Handlers
    const handleBackClick = () => {
        navigate(`/companyDetails/${id}`);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setIsLoading(true);

            const permissionsObject = {};
            permissions?.forEach(permission => {
                permissionsObject[permission.row.replace(/\s+/g, '')] = permission.value;
            });

            await updatePosition({
                id: id,
                name: position,
                priority: +priority,
                ...permissionsObject
            }).unwrap();

            setIsLoading(false);
            notifySuccess("Position has been updated");

            navigate(`/companyDetails/${id}`);
            window.location.reload();
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
    };

    const handlePriorityInput = (e: ChangeEvent<HTMLInputElement>) => setPriority(e.target.value);

    const handlePermissionChange = (index: number) => {
        const updatedPermissions = [...permissions!];
        updatedPermissions[index].value = !updatedPermissions[index].value;
        setPermissions(updatedPermissions);
    };

    // JSX Content
    let content;

    if (isLoading) {
        content = <div className="details-container"> <div className="centered-content-details">Loading</div></div>;
    } else if (isSuccessPositions) {
        content = <div className="details-container">
            <div className="sidebar-right">
                <Sidebar />
            </div>
            <div className="centered-content-details">
                <div className="create-position">
                    <h1 style={{ color: "#fff" }}>Update Position</h1>
                    <br></br>
                    <form onSubmit={handleSubmit}>
                        <div className="phone-box">
                            <PositionSelect />
                        </div>
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
                                    {permissions?.map((permission, index) => (
                                        <tr key={index}>
                                            <td>{permission.row}</td>
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
        </div>;
    }

    return content;
}

export default UpdatePositionPage;
