import { useRef, useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../../features/auth/authSlice';
import { useLoginMutation } from '../../../features/auth/loginApiSlice';
import { Mail, LockClosed } from 'react-ionicons';
import { setActive, setOpenModal } from '../../../features/popup/popupSlice';
import { AuthResponse } from '../../../types/responses';
import { ApiError } from '../../../types/others';
import 'react-toastify/dist/ReactToastify.css';
import { AuthInput } from '../../ui/AuthInput';
import { CloseNotify, NotifyError, NotifyInfo, NotifySuccess } from '../../ui/Notify';
import { Id } from 'react-toastify';

const Login = () => {
    const userRef = useRef<HTMLInputElement>(null);
    const errRef = useRef<HTMLDivElement>(null);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [toastId, setToastId] = useState<Id | null>(null);
    const navigate = useNavigate();

    const [login] = useLoginMutation();
    const dispatch = useDispatch();

    useEffect(() => {
        userRef.current?.focus();
    }, []);

    useEffect(() => {
    }, [email, password]);


    useEffect(() => {
        if (isLoading) {
            setToastId(NotifyInfo('Logging in...'));
        } else {
            if (toastId !== null) CloseNotify(toastId);
        }
    }, [isLoading]);

    function handleRegisterClick() {
        dispatch(setActive(true));
    }

    function handleGoogleAuthClick(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        window.location.href = 'https://localhost:8080/GoogleOAuth/RedirectOnOAuthServer';
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            setIsLoading(true);

            const tokens: AuthResponse = await login({ email: email, password: password }).unwrap();
            dispatch(setCredentials({ ...tokens, user: email }));

            dispatch(setOpenModal(false));

            setEmail('');
            setPassword('');
            setIsLoading(false);

            NotifySuccess("Welcome!");
            navigate('/welcome');
        } catch (err) {
            setIsLoading(false);

            if (err && typeof err === 'object' && 'status' in err) {
                const error = err as ApiError;
                if (error.status === 400) {
                    console.log(error.status);
                    NotifyError(error.data.title);
                } else if (error.status === 401) {
                    NotifyError(error.data.title);
                } else {
                    NotifyError(error.data.title);
                }
            } else {
                NotifyError('No Server Response');
            }
            errRef.current?.focus();
        }
    }

    const handleUserInput = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
    const handlePasswordInput = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

    return (
        <div className="form-box login">
            <h2 style={{ marginTop: '30px' }}>Login</h2>
            <form onSubmit={handleSubmit}>
                {AuthInput({
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
                {AuthInput({
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
        </div>
    );
}

export default Login;
