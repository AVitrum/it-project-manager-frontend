import Sidebar from "../components/ui/Sidebar";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../features/auth/authSlice";
import { useGetProfileQuery } from "../features/user/profileApiSlice";
import { ProfileResponse } from "../types/responses";
import "../assets/company.css";

export default function Dashboard() {
    const dispatch = useDispatch();

    const {
        data: data,
        isSuccess
    } = useGetProfileQuery(undefined);

    if (isSuccess) {
        const profile: ProfileResponse = data;
        dispatch(setUserInfo({ username: profile.username, image: profile.imageUrl, email: profile.email }));
    }

    return (
        <div>
            <Sidebar />
        </div>
        
    );
}