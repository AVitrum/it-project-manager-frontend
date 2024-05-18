import { ChangeEvent, useEffect, useState } from "react";
import "../../assets/profile.css";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateEmployeeMutation } from "../../features/company/updateEmployeeApiSlice";
import { useGetPositionsQuery } from "../../features/company/getPositionsApiSlice";
import { EmployeeResponse, PositionInCompanyResponse } from "../../types/responses";
import { useGetEmployeeQuery } from "../../features/company/getEmployeeApiSlice";
import { notifyError, notifySuccess } from "../../components/ui/Notify";
import { ApiError } from "../../types/others";
import { AuthInput } from "../../components/ui/AuthInput";
import { useSelector } from "react-redux";
import { selectPermissions } from "../../features/performer/performerSlice";


function MembersInfoPage() {
    const [isChangePressed, setIsChangePressed] = useState<boolean>(false);
    const { id, employeeId } = useParams<{ id: string, employeeId: string }>();
    const [salary, setSalary] = useState<string>('');
    const [position, setPosition] = useState<string | null>(null);
    const [loaded, setLoaded] = useState<boolean>(false);
    const [updateEmployee] = useUpdateEmployeeMutation();
    const permissions = useSelector(selectPermissions);

    const handleSalaryChange = (e: ChangeEvent<HTMLInputElement>) => setSalary(e.target.value);

    const {
        data: positionsData,
        isSuccess: isSuccessPositions,
        isLoading: isLoadingPositions
    } = useGetPositionsQuery({ id: id });

    const positions: PositionInCompanyResponse[] = positionsData || [];

    const PositionSelect = () => {
        let selectorContent;
        if (isLoadingPositions) {
            selectorContent = <p>Loading...</p>;
        } else if (isSuccessPositions) {
            const handlePositionChange = (e: ChangeEvent<HTMLSelectElement>) => {
                const selectedPosition = positions.find(pos => pos.name === e.target.value);
                setPosition(selectedPosition ? selectedPosition.name : null);
                console.log(position);
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

    useEffect(() => {
    }, [position, salary]);

    const navigate = useNavigate();

    const {
        data: employeeData,
        isLoading: isLoadingEmployee,
        isSuccess: isSuccessEmployee,
        isError: isErrorEmployee,
        error: errorEmployee
    } = useGetEmployeeQuery({ employeeId: employeeId });

    async function handleSubmit() {
        try {
            await updateEmployee({ id: id, email: employeeData.email, position: position, salary: +salary }).unwrap();
            navigate(`/companyMembers/${id}/info/${employeeId}`);
            notifySuccess("Updated");
            setTimeout(() => {
                window.location.reload();
            }, 600);
        } catch (err) {
            if (err && typeof err === 'object' && 'status' in err) {
                const error = err as ApiError;
                if (error.status === 400) {
                    if (error.data.errors?.Phone?.[0]) {
                        notifyError(error.data.errors.Phone?.[0]);
                    }
                    else {
                        notifyError(error.data.title);
                    }
                } else {
                    notifyError('Server error');
                }
            }
        }
    }

    useEffect(() => {
        if (isSuccessEmployee && !loaded) {
            const employee: EmployeeResponse = employeeData;
            setPosition(employee.position);
            setSalary(employee.salary.toString());
            setLoaded(true);
        }
    }, [isSuccessEmployee, employeeData, loaded]);

    let content;
    if (isLoadingEmployee && isLoadingPositions) {
        content = <p>Loading...</p>;
    } else if (isSuccessEmployee && isSuccessPositions) {
        const employee: EmployeeResponse = employeeData;

        content = (
            <section className="profile">
                <h1>Profile</h1>
                {employee.picture === null ? <></> : <img src={employee.picture} alt="Profile Image" />}
                {isChangePressed ? (
                    <>
                        {AuthInput({
                            type: "text",
                            id: "salary",
                            ref: null,
                            value: salary,
                            onChange: handleSalaryChange,
                            autoComplete: "off",
                            required: true,
                            label: "Salary",
                            Icon: null,
                            iconColor: "#00000",
                            iconHeight: "20px",
                            iconWidth: "20px"
                        })}
                        <div className="phone-box">
                            <PositionSelect />
                        </div>
                    </>
                ) : (
                    <>
                        <p>Email: {employee.email}</p>
                        <p>Username: {employee.username}</p>
                        <p>Salary: {employee.salary}</p>
                        <p>Position: {employee.position}</p>
                    </>
                )}
                <div className="button-container">
                    {isChangePressed ? (
                        <button className="confirm-button" onClick={handleSubmit}>Submit</button>
                    ) : (
                        permissions.updateUser ? <button className="edit-button" onClick={() => setIsChangePressed(true)}>Change employee info</button> : <></>
                    )}
                    <button className="edit-button" onClick={() => navigate(`/companyMembers/${id}`)}>Back</button>
                </div>
            </section>
        );
    } else if (isErrorEmployee) {
        content = <p>{JSON.stringify(errorEmployee)}</p>;
    }

    return content;
}

export default MembersInfoPage;
