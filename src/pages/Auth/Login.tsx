import { useDispatch } from "react-redux";
import { setActive } from "../../features/popup/popupSlice";
import Login from "../../components/form/login/Login";

export default function LoginPage() {

    const dispatch = useDispatch();

    dispatch(setActive(true));

    return (
        <div className="auth-container">
            <Login />
        </div>
    );
}