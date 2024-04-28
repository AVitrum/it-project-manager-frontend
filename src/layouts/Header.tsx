import { useDispatch, useSelector } from 'react-redux';
import { setOpenModal } from '../features/popup/popupSlice';
import Popup from '../components/ui/Popup';
import Login from '../components/form/login/Login';
import Registration from '../components/form/registration/Registration';
import { selectCurrentToken } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export default function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleOpenClick() {
        dispatch(setOpenModal(true));
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
                        <button className="btnLogin-popup" onClick={onProfileButtonClick}>
                            Profile
                        </button>
                    ) : (
                        <button className="btnLogin-popup" onClick={handleOpenClick}>
                            Login
                        </button>
                    )}
                </nav>
            </header>

        </>
    );
}
