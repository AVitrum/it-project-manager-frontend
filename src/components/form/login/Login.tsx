import { useRef, useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../../features/auth/authSlice';
import { useLoginMutation } from '../../../features/auth/loginApiSlice';
import { Mail, LockClosed } from 'react-ionicons';
import { AuthResponse } from '../../../types/login';
import { createAuthInput } from '../../customAuthInput';
import { setActive, setOpenModal } from '../../../features/popup/popupSlice';

const Login = () => {
    const userRef = useRef<HTMLInputElement>(null);
    const errRef = useRef<HTMLDivElement>(null);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errMsg, setErrMsg] = useState<string>('');
    const navigate = useNavigate();

    const [login, { isLoading }] = useLoginMutation();
    const dispatch = useDispatch();

    const handleRegisterClick = () => {
        dispatch(setActive(true));
    };

    const handleGoogleAuthClick = (e: MouseEvent) => {
        e.preventDefault();
        window.location.href = 'https://localhost:8080/GoogleOAuth/RedirectOnOAuthServer';
    };

    useEffect(() => {
        userRef.current?.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [email, password]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const tokens: AuthResponse = await login({ email: email, password: password }).unwrap();
            dispatch(setCredentials({ ...tokens, user: email }));

            dispatch(setOpenModal(false));

            setEmail('');
            setPassword('');

            navigate('/welcome');
        } catch (err) {
            if (!err?.originalStatus) {
                setErrMsg('No Server Response');
            } else if (err.originalStatus === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.originalStatus === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current?.focus();
        }
    };

    const handleUserInput = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
    const handlePasswordInput = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

    return (
        <div className="form-box login">
            {isLoading ? <h2>Loading...</h2> : (
                <>
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit}>
                        {createAuthInput({
                            type: "text",
                            id: "email",
                            ref: userRef,
                            value: email,
                            onChange: handleUserInput,
                            autoComplete: "off",
                            required: true,
                            label: "Email",
                            Icon: Mail,
                            iconColor: "#00000",
                            iconHeight: "20px",
                            iconWidth: "20px"
                        })}
                        {createAuthInput({
                            type: "password",
                            id: "password",
                            ref: null,
                            value: password,
                            onChange: handlePasswordInput,
                            autoComplete: "current-password",
                            required: true,
                            label: "Password",
                            Icon: LockClosed,
                            iconColor: "#00000",
                            iconHeight: "20px",
                            iconWidth: "20px"
                        })}
                        <div className="remember-forgot">
                            <label><input type="checkbox" />
                                Remember me</label>
                            <a href='#'>Forgot Password</a>
                        </div>
                        <button type='submit' className='btn'>Login</button>
                        <div className="login-register">
                            <p>Don't have an account?
                                <a href='#' className='register-link' onClick={handleRegisterClick}> Register</a>
                            </p>
                        </div>
                        <div className="login-icons">
                            <button className='google-auth' onClick={handleGoogleAuthClick}>
                                <img src="/Google icon.svg" alt="" />
                            </button>
                        </div>
                    </form>
                </>
            )}
        </div>
    );
}

export default Login;
