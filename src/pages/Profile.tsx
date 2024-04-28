import { useGetProfileQuery } from "../features/user/profileApiSlice.ts";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../features/auth/authSlice.ts";
import { ProfileResponse } from "../types/responses.ts";
import "../assets/profile.css"

export default function Profile() {
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

        const date = new Date(profile.creationDate);

        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };

        const formattedDate = date.toLocaleDateString('uk-UA', options);

        content = (
            <section className="profile">
                <h1>Profile</h1>
                <img src={profile.imageUrl} alt="Profile Image" />
                <p>Username: {profile.username}</p>
                <p>Email: {profile.email}</p>
                <p>CreatedAt: {formattedDate}</p>
                {profile.phoneNumber ? <p>Phone: {profile.phoneNumber}</p> : <></>}
                <Link to="/welcome">Back to Welcome</Link>
                <button className="edit-button">Edit</button>
                <button className="logout-button" onClick={onLogOut}>LogOut</button>
            </section>
        )
    } else if (isError) {
        content = <p>{JSON.stringify(error)}</p>;
    }

    return content
}
