import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentToken, setUserInfo } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import DropDownMenu from '../components/ui/DropDownMenu';
import { useGetProfileQuery } from '../features/user/profileApiSlice';
import { ProfileResponse } from '../types/responses';


export default function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();


    function handleOpenClick() {
        navigate("/auth");
    }

    const token = useSelector(selectCurrentToken);

    if (token) {
        const {
            data: data,
            isSuccess
        } = useGetProfileQuery(undefined);
    
        if (isSuccess) {
            const profile: ProfileResponse = data;
            dispatch(setUserInfo({ username: profile.username, image: profile.imageUrl, email: profile.email }));
        }
    }

    return (
        <>
            <header>
                <h2 className="logo">PRMS Beta</h2>
                <nav className="navigation">
                    {window.location.pathname === "/dashboard" ?
                        <>
                            <a href="/createCompany">
                                Create Company
                            </a>
                        </> :
                        <>
                            <a href="/">Home</a>
                            <a href="/">About</a>
                        </>
                    }
                    {token ? (
                        <>
                            <a href="/dashboard">Dashboard</a>
                            <DropDownMenu />
                        </>
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
