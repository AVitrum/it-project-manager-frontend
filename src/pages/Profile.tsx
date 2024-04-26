import { useGetProfileQuery } from "../features/user/profileApiSlice.ts";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../features/auth/authSlice.ts";
import { ProfileResponse } from "../types/responses.ts";

export default function Profile () {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function onLogOut() {
        dispatch(logOut());
        navigate("/");
    };

    const {
        data: data,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetProfileQuery(undefined);
    
    let content;
    if (isLoading) {
        content = <p>"Loading..."</p>;
    } else if (isSuccess) {
        const profile: ProfileResponse = data;
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
}