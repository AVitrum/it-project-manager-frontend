import { useGetProfileQuery } from "../features/user/profileApiSlice.ts";
import { Link, useNavigate } from "react-router-dom";
import {ProfileResp} from "../types/profile.ts";
import { useDispatch } from "react-redux";
import { logOut } from "../features/auth/authSlice.ts";

const Profile: React.FC<ProfileResp> = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onLogOut = () => {
        dispatch(logOut());
        navigate("/");
    };

    const {
        data: profile,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetProfileQuery();
    let content;
    if (isLoading) {
        content = <p>"Loading..."</p>;
    } else if (isSuccess) {
        content = (
            <section className="profile">
                <h1>Profile</h1>
                <p>{profile.id}</p>
                <p>{profile.username}</p>
                <p>{profile.email}</p>
                <p>{profile.creationDate}</p>
                <p>{profile.phoneNumber}</p>
                <Link to="/welcome">Back to Welcome</Link>
                <button onClick={onLogOut}>LogOut</button>
            </section>
        )
    } else if (isError) {
        content = <p>{JSON.stringify(error)}</p>;
    }

    return content
};
export default Profile;