import { useRef, useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { PersonOutline, MailOutline, LockClosedOutline } from 'react-ionicons';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useRegisterMutation } from '../../../features/auth/registerApiSlice';
import { setActive } from '../../../features/popup/popupSlice';
import { ApiError } from '../../../types/others';
import { AuthInput } from '../../ui/AuthInput';
import { closeNotify, notifyError, notifyInfoLoading, notifySuccess } from '../../ui/Notify';
import { Id } from 'react-toastify';

export default function Register() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const errRef = useRef<HTMLInputElement>(null);

    const [email, setEmail] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [toastId, setToastId] = useState<Id | null>(null);
    const [register] = useRegisterMutation();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        usernameRef.current?.focus();
    }, []);

    useEffect(() => {
    }, [email, password]);

    useEffect(() => {
        if (isLoading) {
            setToastId(notifyInfoLoading('Loading...'));
        } else {
            if (toastId !== null) closeNotify(toastId);
        }
    }, [isLoading]);

    function handleLoginClick() {
        dispatch(setActive(false));
    }

    function handleGoogleAuthClick(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        window.location.href = 'https://localhost:8080/GoogleOAuth/RedirectOnOAuthServer';
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            setIsLoading(true);

            await register({
                email: email,
                password: password,
                username: username,
            }).unwrap();
            setIsLoading(false);

            setEmail('');
            setPassword('');
            setUsername('');
            setPassword('');

            notifySuccess("Registered!");
            dispatch(setActive(false));
        } catch (err) {
            setIsLoading(false);
            if (err && typeof err === 'object' && 'status' in err) {
                const error = err as ApiError;
                if (error.status === 400) {
                    if (error.data.errors?.Password?.[0]) {
                        notifyError(error.data.errors.Password[0]);
                    }
                    else {
                        notifyError(error.data.title);
                    }
                } else if (error.status === 401) {
                    notifyError(error.data.title);
                } else if (error.status === 200) {
                    setEmail('');
                    setPassword('');
                    setUsername('');
                    setPassword('');


                    notifySuccess("Registered!");
                    navigate('/');
                } else {
                    notifyError('Failed');
                }
            }
            errRef.current?.focus();
        }
    }

    const handleUsernameInput = (e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value);
    const handleEmailInput = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
    const handlePasswordInput = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

    return (
        <div className="form-box register">
            <h2>Registration</h2>
            <form onSubmit={handleSubmit}>
                {AuthInput({
                    type: "text",
                    id: "username",
                    ref: usernameRef,
                    value: username,
                    onChange: handleUsernameInput,
                    autoComplete: "off",
                    required: true,
                    label: "Username",
                    Icon: PersonOutline,
                    iconColor: "#00000",
                    iconHeight: "20px",
                    iconWidth: "20px"
                })}
                {AuthInput({
                    type: "text",
                    id: "email",
                    ref: emailRef,
                    value: email,
                    onChange: handleEmailInput,
                    autoComplete: "on",
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
                    ref: passwordRef,
                    value: password,
                    onChange: handlePasswordInput,
                    autoComplete: "on",
                    required: true,
                    label: "Password",
                    Icon: LockClosedOutline,
                    iconColor: "#00000",
                    iconHeight: "20px",
                    iconWidth: "20px"
                })}
                <button type='submit' className='btn'>Register</button>
                <div className="login-register">
                    <p>Already have an account?
                        <a href='#' className='login-link' onClick={handleLoginClick}> Login</a>
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
