import { useParams } from "react-router-dom";
import "../assets/company-details.css";
import { useGetCompanyQuery } from "../features/company/getCompanyByIdApiSlice";
import { CompanyResponse } from "../types/responses";

function CompanyDetailsPage() {
    let { id } = useParams();

    let content;

    const {
        data: data,
        isLoading,
        isSuccess
    } = useGetCompanyQuery({ id: id });

    if (isLoading) {
        content = <div className="company-center">
            <div className="company">
                <h1>Loading...</h1>
            </div>
        </div>
    } else if (isSuccess) {
        const company: CompanyResponse = data;
        content = <div className="company-center">
            <div className="company">
                <h1>Name: {company.name}</h1>
                <p>Description: {company.description}</p>
                <p>Budget: {company.budget}</p>
            </div>
        </div>
    }

    return (
        content
    );
}

export default CompanyDetailsPage;