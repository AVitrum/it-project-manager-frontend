import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../features/auth/authSlice";
import { useEffect } from "react";

export default function OAuth() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const accessToken: string | null = urlParams.get('AccessToken');
        const refreshToken: string | null = urlParams.get('RefreshToken');
        
        dispatch(setCredentials({ accessToken: accessToken, refreshToken: refreshToken }));
        
        setTimeout(() => {
            navigate("/profile");
        }, 100);
    }, [dispatch, navigate]);

    return (
        <></>
    );
}
