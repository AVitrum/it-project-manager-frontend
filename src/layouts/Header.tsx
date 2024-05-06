import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import DropDownMenu from '../components/ui/DropDownMenu';


export default function Header() {
    const navigate = useNavigate();

    function handleOpenClick() {
        navigate("/auth");
    }

    function onProfileButtonClick() {
        navigate("/profile");
    }

    const token = useSelector(selectCurrentToken);

    return (
        <>
            <header>
                <h2 className="logo">PRMS Beta</h2>
                <nav className="navigation">
                    <a href="/">Home</a>
                    <a href="/">About</a>
                    <a href="/">Services</a>
                    <a href="/">Contact</a>
                    {token ? (
                        <DropDownMenu/>
                    ) : (
                        <button className="btnLogin-popup" onClick={handleOpenClick}>
                            Auth
                        </button>
                    )}
                </nav>
            </header>
        </>
    );
}
