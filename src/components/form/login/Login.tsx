import { useRef, useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../../features/auth/authSlice';
import { useLoginMutation } from '../../../features/auth/loginApiSlice';
import { MailOutline, LockClosedOutline } from 'react-ionicons';
import { setActive } from '../../../features/popup/popupSlice';
import { AuthResponse } from '../../../types/responses';
import { ApiError } from '../../../types/others';
import 'react-toastify/dist/ReactToastify.css';
import { AuthInput } from '../../ui/AuthInput';
import { closeNotify, notifyError, notifyInfo, notifyInfoLoading, notifySuccess } from '../../ui/Notify';
import { Id } from 'react-toastify';
import { useSendVerificationMutation } from '../../../features/auth/sendVerifiractionApiSlice';

const Login = () => {
    const userRef = useRef<HTMLInputElement>(null);
    const errRef = useRef<HTMLDivElement>(null);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [toastId, setToastId] = useState<Id | null>(null);
    const [login] = useLoginMutation();
    const [sendVerificationToken] = useSendVerificationMutation();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        userRef.current?.focus();
    }, []);

    useEffect(() => {
    }, [email, password]);


    useEffect(() => {
        if (isLoading) {
            setToastId(notifyInfoLoading('Logging in...'));
        } else {
            if (toastId !== null) closeNotify(toastId);
        }
    }, [isLoading]);

    function handleRegisterClick() {
        dispatch(setActive(true));
    }

    function handleResetClick() {
        navigate("/resetPassword");
    }

    function handleGoogleAuthClick(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        window.location.href = 'https://localhost:8080/GoogleOAuth/RedirectOnOAuthServer';
    }

    async function navigateToVerificationPage() {
        setIsLoading(true);
        try {
            notifyInfo("We have sent you a confirmation code by mail.");
            await sendVerificationToken({ email: email }).unwrap();
            setIsLoading(false);
            dispatch(setActive(false));
            setTimeout(() => {
                navigate("/verification");
            }, 1000);
        } catch (err) {
            setIsLoading(false);
            if (err && typeof err === 'object' && 'status' in err) {
                const error = err as ApiError;
                if (error.originalStatus === 400) {
                    notifyError("Something went wrong")
                }
            }
        }
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            setIsLoading(true);

            const response: AuthResponse = await login({ email: email, password: password }).unwrap();
            dispatch(setCredentials({ ...response }));

            setEmail('');
            setPassword('');
            setIsLoading(false);

            notifySuccess("Welcome!");
            navigate('/');
        } catch (err) {
            setIsLoading(false);

            if (err && typeof err === 'object' && 'status' in err) {
                const error = err as ApiError;
                const msg = "Not verified! Please verify your account";

                if (error.status === 400 && error.data.title != msg) {
                    console.log(error.status);
                    notifyError(error.data.title);
                } else if (error.status === 400 && error.data.title == msg) {
                    await navigateToVerificationPage();
                }
                else if (error.status === 401) {
                    notifyError(error.data.title);
                } else {
                    notifyError(error.data.title);
                }
            } else {
                notifyError('No Server Response');
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
                    Icon: MailOutline,
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
                    Icon: LockClosedOutline,
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
                    <p>Forgot your password?
                        <a href='#' className='register-link' onClick={handleResetClick}> Reset</a>
                    </p>
                    <br></br>
                    <p>Don't have an account?
                        <a href='#' className='register-link' onClick={handleRegisterClick}> Register</a>
                    </p>
                </div>
                <div className="login-icons">
                    <button className='google-auth' onClick={handleGoogleAuthClick}>
                        <img src="/icons8-google.svg" alt="" />
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Login;
