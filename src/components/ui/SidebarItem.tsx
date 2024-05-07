import { useState } from "react";
import { CompanyResponse } from "../../types/responses.ts";
import { useNavigate } from "react-router-dom";

function SidebarItem(item: CompanyResponse) {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <div className={isOpen ? "sidebar-item open" : "sidebar-item"} >
            <div className="sidebar-title" onClick={() => setIsOpen(!isOpen)}>
                <span>
                    {item.picture ? <img src={item.picture} alt="" /> : <img src="user.png" alt="" />}
                    <a>{item.name}</a>
                </span>
                <i className="bi-chevron-down toggle-btn"></i>
            </div>
            <div className={isOpen ? "sidebar-content open" : "sidebar-content"}>
                <i className="bi bi-kanban"></i>
                <a>Projects</a>
            </div>
            <div className={isOpen ? "sidebar-content open" : "sidebar-content"}>
                <i className="bi bi-people"></i>
                <a>Members</a>
            </div>
            <div className={isOpen ? "sidebar-content open" : "sidebar-content"} onClick={isOpen ? () => navigate(`/companyDetails/${item.id}`) : undefined}>
                <a>Settings</a>
            </div>
        </div>
    );
}



export default SidebarItem;