import { MouseEventHandler, useEffect, useRef, useState } from 'react';
import '../../assets/dropdown.css';
import { Open, Person, Settings } from 'react-ionicons';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOut, selectCurrentImage, selectCurrentUser } from '../../features/auth/authSlice';

type DropdownFunc = {
    text: string;
    Icon: React.ComponentType<any>;
    Function: MouseEventHandler<HTMLAnchorElement>;
};

export default function DropDownMenu() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);

    const img = useSelector(selectCurrentImage);

    let menuRef = useRef();

    useEffect(() => {
        let handler = (e) => {
            if (!menuRef.current.contains(e.target)) {
                setOpen(false);
                console.log(menuRef.current);
            }
        };

        document.addEventListener("mousedown", handler);


        return () => {
            document.removeEventListener("mousedown", handler);
        }

    });

    function handleProfileClick() {
        navigate("/profile")
    }

    function handleLogOut() {
        dispatch(logOut());
        navigate("/");
    }

    return (
        <div>
            <div className='menu-container' ref={menuRef}>
                <div className='menu-trigger' onClick={() => { setOpen(!open) }}>
                    { img ? <img src={img}></img> : <img src='../../../public/user.png'></img>}
                </div>

                <div className={`dropdown-menu ${open ? 'active' : 'inactive'}`} >
                    <h3>{useSelector(selectCurrentUser)}<br /></h3>
                    <ul>
                        <DropdownItem text={"My Profile"} Icon={Person} Function={handleProfileClick} />
                        <DropdownItem text={"Settings"} Icon={Settings} Function={handleProfileClick}/>
                        <DropdownItem text={"Logout"} Icon={Open} Function={handleLogOut}/>
                    </ul>
                </div>
            </div>
        </div>
    );

    function DropdownItem({ text, Icon, Function } : DropdownFunc) {
        return (
            <li className='dropdownItem'>
                {Icon && (
                    <span className="icon">
                        <Icon color="#00000" height="25px" width="25px" />
                    </span>
                )}
                <a onClick={Function}> {text} </a>
            </li>
        );
    }

}