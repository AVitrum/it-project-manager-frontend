import "../../assets/sidebar.css"
import { useGetCompaniesQuery } from "../../features/company/getAllCompaniesApiSlice.ts";
import { CompanyResponse } from "../../types/responses.ts";
import SidebarItem from "./SidebarItem.tsx";


export default function Sidebar() {


    const {
        data: data,
        isSuccess
    } = useGetCompaniesQuery({order: "asc"});

    let content;

    if (isSuccess) {
        const response: CompanyResponse[] = data;
        content = <div className="sidebar">
            <h3>Companies</h3>
            {response.map((item, index) => <SidebarItem key={index} {...item} />)}
        </div>
    }

    return content;
}