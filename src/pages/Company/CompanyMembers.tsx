import { useNavigate, useParams } from "react-router-dom";
import { useGetCompanyQuery } from "../../features/company/getCompanyByIdApiSlice";
import { CompanyResponse } from "../../types/responses";
import "../../assets/company-details.css";
import "../../assets/members.css";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentEmail } from "../../features/auth/authSlice";
import { useRemoveFromCompanyMutation } from "../../features/company/removeFromCompanyApiSlice";
import { ApiError } from "../../types/others";
import { notifyError } from "../../components/ui/Notify";
import { AuthInput } from "../../components/ui/AuthInput";
import { ChangeEvent, useEffect, useState } from "react";
import { useAddToCompanyMutation } from "../../features/company/addToCompanyApiSlice";
import Sidebar from "../../components/ui/Sidebar";
import { useGetPerformerQuery } from "../../features/performer/getPerformerApiSlice";
import { selectPermissions, setData } from "../../features/performer/performerSlice";

function CompanyMembersPage() {
    const { id } = useParams<string>();
    const navigate = useNavigate();
    const [emailToAdd, setEmail] = useState<string>('');
    const permissions = useSelector(selectPermissions);
    const dispatch = useDispatch();

    const currentEmail = useSelector(selectCurrentEmail);
    const [removeFromCompany] = useRemoveFromCompanyMutation();
    const [addToCompany] = useAddToCompanyMutation();

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);

    async function handleRemove(email: string) {
        try {
            if (confirm("Do you wish to perform this action?")) {
                await removeFromCompany({ id: id, email: email }).unwrap();
                navigate("/dashboard");
                setTimeout(() => {
                    window.location.reload();
                }, 600);
            }
        } catch (err) {
            if (err && typeof err === 'object' && 'status' in err) {
                const error = err as ApiError;
                if (error.status === 400) {
                    if (error.data.errors?.Email?.[0]) {
                        notifyError(error.data.errors.Company[0]);
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

    async function handleAddUser() {
        try {
            await addToCompany({ id: id, email: emailToAdd, position: "Default" }).unwrap();
            navigate(`/companyMembers/${id}`);
            setTimeout(() => {
                window.location.reload();
            }, 600);
        } catch (err) {
            if (err && typeof err === 'object' && 'status' in err) {
                const error = err as ApiError;
                if (error.status === 400) {
                    if (error.data.errors?.Email?.[0]) {
                        notifyError(error.data.errors.Company[0]);
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

    const {
        data: performer,
        isSuccess: isPerformerSuccess
    } = useGetPerformerQuery({ id: id });

    if (isPerformerSuccess) {
        dispatch(setData({ ...performer }));
    }

    useEffect(() => { }, [permissions]);

    let content;

    const {
        data: data,
        isLoading,
        isSuccess
    } = useGetCompanyQuery({ id: id });

    if (isLoading) {
        content = <div className="centered-content-details">
            <div className="company">
                <h1>Loading...</h1>
            </div>
        </div>
    } else if (isSuccess) {
        const company: CompanyResponse = data;
        content =
            <div className="details-container">
                <div>
                    <Sidebar />
                </div>
                <div className="centered-content-details">
                    <div className="company">
                        <h1>Company Members: {company.employees.length}</h1>
                        <div className="employee-list">
                            {company.employees.map((employee, index) => (
                                <div className="member-container" key={index}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        {employee.picture ?
                                            <img src={employee.picture} alt="Company logo" />
                                            : <img src="../../public/user.png" alt="Default project image" />
                                        }
                                        <h3>{employee.username}</h3>
                                    </div>
                                    <div>
                                        <button onClick={() => navigate(`/companyMembers/${id}/info/${employee.id}`)}><i className="bi bi-info-circle"></i> Info</button>
                                        {employee.email === currentEmail ?
                                            <button onClick={() => handleRemove(employee.email)}><i className="bi bi-door-open-fill"></i> Leave</button> :
                                            permissions.deleteUser ? <button onClick={() => handleRemove(employee.email)}><i className="bi bi-door-open-fill"></i> Kick</button> : <></>
                                        }
                                    </div>
                                </div>
                            ))}
                        </div>
                        {permissions.addUser
                            ? <>
                                {AuthInput({
                                    type: "text",
                                    id: "email",
                                    ref: null,
                                    value: emailToAdd,
                                    onChange: handleEmailChange,
                                    autoComplete: "off",
                                    required: true,
                                    label: "Email",
                                    Icon: null,
                                    iconColor: "#00000",
                                    iconHeight: "20px",
                                    iconWidth: "20px"
                                })}
                                <button className="add-user-button" onClick={() => handleAddUser()}><i className="bi bi-plus-lg"></i> Add User</button>
                            </>
                            : <></>
                        }
                        <br></br>
                        <button className="add-user-button" onClick={() => navigate(`/companyDetails/${id}`)}>Back</button>
                    </div>
                </div>
            </div>
    }
    return content;
}

export default CompanyMembersPage;
