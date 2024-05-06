import {useState} from "react";
import {CompanyResponse} from "../../types/responses.ts";

function SidebarItem(item: CompanyResponse) {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <div className={isOpen ? "sidebar-item open" : "sidebar-item"} >
            <div className="sidebar-title">
                <span>
                    {item.picture? <img src={item.picture} alt="" /> : <img src="user.png" alt=""/>}
                    <a>{item.name}</a>
                </span>
                <i className="bi-chevron-down toggle-btn" onClick={() => setIsOpen(!isOpen)}></i>
            </div>
            <div className="sidebar-content">
                <i className="bi bi-kanban"></i>
                <a>Projects</a>
            </div>
            <div className="sidebar-content">
                <i className="bi bi-people"></i>
                <a>Members</a>
            </div>
            <div className="sidebar-content">
                <i className="bi bi-gear"></i>
                <a>Settings</a>
            </div>
        </div>
    );
}



export default SidebarItem;