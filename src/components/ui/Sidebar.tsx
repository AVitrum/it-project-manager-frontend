import "../../assets/sidebar.css"
import { CompanyResponse } from "../../types/responses.ts";
import SidebarItem from "./SidebarItem.tsx";


export default function Sidebar({ data }: any) {

    const responses: CompanyResponse[] = data;

    return <div className="sidebar">
        <h3>Companies</h3>
        {responses.map((item, index) => <SidebarItem key={index} {...item} />)}
    </div>;
}