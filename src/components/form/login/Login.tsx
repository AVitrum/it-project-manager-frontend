import { useRef, useState, useEffect, ChangeEvent, FormEvent, MouseEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../../features/auth/authSlice';
import { useLoginMutation } from '../../../features/auth/loginApiSlice';
import { Mail, LockClosed } from 'react-ionicons';
import { createAuthInput } from '../../customAuthInput';
import { setActive, setOpenModal } from '../../../features/popup/popupSlice';
import { AuthResponse } from '../../../types/responses';
import { ApiError } from '../../../types/others';

const Login = () => {
    const userRef = useRef<HTMLInputElement>(null);
    const errRef = useRef<HTMLDivElement>(null);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errMsg, setErrMsg] = useState<string>('');
    const navigate = useNavigate();

    const [login, { isLoading }] = useLoginMutation();
    const dispatch = useDispatch();

    useEffect(() => {
        userRef.current?.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [email, password]);

    function handleRegisterClick() {
        dispatch(setActive(true));
    }

    function handleGoogleAuthClick(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        window.location.href = 'https://localhost:8080/GoogleOAuth/RedirectOnOAuthServer';
    }

    async function handleSubmit (e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            const tokens: AuthResponse = await login({ email: email, password: password }).unwrap();
            dispatch(setCredentials({ ...tokens, user: email }));

            dispatch(setOpenModal(false));

            setEmail('');
            setPassword('');

            navigate('/welcome');
        } catch (err) {
            if (err && typeof err === 'object' && 'status' in err) {
                const error = err as ApiError;
                if (error.status === 400) {
                    setErrMsg(error.data.title);
                } else if (error.status === 401) {
                    setErrMsg(error.data.title);
                } else {
                    setErrMsg(error.data.title);
                }
            } else {
                setErrMsg('No Server Response');
            }
            errRef.current?.focus();
        }
    }

    const handleUserInput = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
    const handlePasswordInput = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

    return (
        <div className="form-box login">
            {isLoading ? <h2>Loading...</h2> : (
                <>
                    <h2 style={{ marginTop: '30px' }}>Login</h2>
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
                        {errMsg === '' ? <></> : <p className="error-message">{errMsg}</p>}
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
