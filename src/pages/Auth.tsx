import { useDispatch } from "react-redux";
import Login from "../components/form/login/Login";
import Register from "../components/form/registration/Registration";
import Popup from "../components/ui/Popup";
import { setActive } from "../features/popup/popupSlice";

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