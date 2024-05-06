import "../../assets/sidebar.css"
import { useGetCompaniesQuery } from "../../features/company/getAllCompaniesApiSlice.ts";
import { CompanyResponse } from "../../types/responses";
import SidebarItem from "./SidebarItem.tsx";


export default function Sidebar() {

    const {
        data: data,
        isLoading,
        isSuccess
    } = useGetCompaniesQuery(undefined);


    let content;
    if (isLoading) {
        content = <p>"Loading..."</p>;
    } else if (isSuccess) {
        const response: CompanyResponse[] = data;

        content = (
            <div className="sidebar">
                <h3>Companies</h3>
                { response.map(item => <SidebarItem key={item.id} { ...item} />) }
            </div>
        );
    }


    return content;
}