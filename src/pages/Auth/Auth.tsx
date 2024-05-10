import { useDispatch } from "react-redux";
import { setActive } from "../../features/popup/popupSlice";
import Popup from "../../components/ui/Popup";
import Login from "../../components/form/login/Login";
import Register from "../../components/form/registration/Registration";

export default function AuthPage() {

    const dispatch = useDispatch();

    dispatch(setActive(true));

    return (
        <div className="auth-container">
        <Popup>
            <Login />
            <Register />
        </Popup>
        </div>
    );
}