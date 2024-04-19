import { useGetProfileQuery } from "../features/user/profileApiSlice.ts";
import { Link } from "react-router-dom";

const Profile = () => {
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
                <Link to="/welcome">Back to Welcome</Link>
            </section>
        )
    } else if (isError) {
        content = <p>{JSON.stringify(error)}</p>;
    }

    return content
};
export default Profile;