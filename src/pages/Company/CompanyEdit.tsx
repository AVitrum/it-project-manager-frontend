import { useNavigate, useParams } from "react-router-dom";
import "../../assets/company-details.css";
import { ChangeEvent, useEffect, useState } from "react";
import { useEditCompanyMutation } from "../../features/company/editCompanyApiSlice";
import { useGetCompanyQuery } from "../../features/company/getCompanyByIdApiSlice";
import { CompanyResponse } from "../../types/responses";
import { notifyError, notifySuccess } from "../../components/ui/Notify";
import { ApiError } from "../../types/others";
import Sidebar from "../../components/ui/Sidebar";
import { AuthInput } from "../../components/ui/AuthInput";

function CompanyEditPage() {
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [budget, setBudget] = useState<string>('');

    const [loaded, setLoaded] = useState<boolean>(false);

    useEffect(() => {
    }, [name, description, budget]);

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value);
    const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => setDescription(e.target.value);
    const handleBudgetChange = (e: ChangeEvent<HTMLInputElement>) => setBudget(e.target.value);

    const navigate = useNavigate();
    const [editCompany] = useEditCompanyMutation();
    const { id } = useParams<string>();

    const {
        data: data,
        isLoading,
        isSuccess
    } = useGetCompanyQuery({ id: id });

    useEffect(() => {
        if (isSuccess && !loaded) {
            const company: CompanyResponse = data;
            setName(company.name);
            setDescription(company.description);
            setBudget(company.budget.toString());
            setLoaded(true);
        }
    }, [isSuccess, data, loaded]);

    async function handleSubmit() {
        try {
            await editCompany({ id: id, name: name, description: description, budget: +budget }).unwrap();
            navigate(`/companyDetails/${id}`);
            notifySuccess("Updated");
            setTimeout(() => {
                window.location.reload();
            }, 600);
        } catch (err) {
            if (err && typeof err === 'object' && 'status' in err) {
                const error = err as ApiError;
                if (error.status === 400) {
                    if (error.data.errors?.Phone?.[0]) {
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

    let content;

    if (isLoading) {
        content = <div className="company-center">
            <div className="company">
                <h1>Loading...</h1>
            </div>
        </div>
    } else if (isSuccess) {
        content = <div className="details-container">
            <div className="sidebar-right">
                <Sidebar />
            </div>
            <section className="centered-content-details">
                <div className="company">
                    <h1>Company Edit</h1>
                    {AuthInput({
                        type: "text",
                        id: "name",
                        ref: null,
                        value: name,
                        onChange: handleNameChange,
                        autoComplete: "off",
                        required: true,
                        label: "New Name",
                        Icon: null,
                        iconColor: "#00000",
                        iconHeight: "20px",
                        iconWidth: "20px"
                    })}
                    {AuthInput({
                        type: "text",
                        id: "desc",
                        ref: null,
                        value: description,
                        onChange: handleDescriptionChange,
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
                        onChange: handleBudgetChange,
                        autoComplete: "off",
                        required: true,
                        label: "Budget",
                        Icon: null,
                        iconColor: "#00000",
                        iconHeight: "20px",
                        iconWidth: "20px"
                    })}
                    <div className="button-container">
                        <button className="edit-button" onClick={handleSubmit}>Submit</button>
                        <button className="edit-button" onClick={() => navigate(`/companyDetails/${id}`)}>Back</button>
                    </div>
                </div>
            </section>
        </div>
    }

    return content;
}

export default CompanyEditPage;
