import { Outlet } from "react-router-dom";
import Header from "../layouts/Header";
import { ToastContainer } from "react-toastify";

export default function Layout() {
    return (
        <div className="">
            <Header />
            <main>
                <Outlet />
            </main>
            <ToastContainer />
        </div>
    );
}