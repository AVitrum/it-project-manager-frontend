import { useDispatch } from "react-redux";
import { setActive } from "../../features/popup/popupSlice";
import Register from "../../components/form/registration/Registration";

export default function AuthPage() {

    const dispatch = useDispatch();

    dispatch(setActive(true));

    return (
        <div className="auth-container">
            <Register />
        </div>
    );
}