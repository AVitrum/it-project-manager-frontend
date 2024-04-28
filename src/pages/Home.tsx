import { ToastContainer } from "react-toastify";
import Login from "../components/form/login/Login";
import Register from "../components/form/registration/Registration";
import Popup from "../components/ui/Popup";

export default function Home() {
    return (
        <div>
            <Popup>
                <Login />
                <Register />
            </Popup>

            <ToastContainer/>
        </div>
    );
}