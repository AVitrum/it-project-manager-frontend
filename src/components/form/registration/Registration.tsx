import { useRef, useState, ChangeEvent, FormEvent, MouseEventHandler, useEffect } from 'react';
import { Person, Mail, LockClosed } from 'react-ionicons';
import { createAuthInput } from '../../customAuthInput';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useRegisterMutation } from '../../../features/auth/registerApiSlice';
import { setActive, setOpenModal } from '../../../features/popup/popupSlice';
import { ApiError } from '../../../types/others';

const Register = () => {
    const usernameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const errRef = useRef<HTMLInputElement>(null);

    const [email, setEmail] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errMsg, setErrMsg] = useState<string>('');
    const navigate = useNavigate();

    const [register, { isLoading }] = useRegisterMutation();
    const dispatch = useDispatch();

    useEffect(() => {
        usernameRef.current?.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [email, password]);

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
            await register({
                email: email,
                password: password,
                username: username,
            }).unwrap();
        } catch (err) {
            if (err && typeof err === 'object' && 'status' in err) {
                const error = err as ApiError;
                if (error.status === 400) {
                    setErrMsg(error.data.title);
                } else if (error.status === 401) {
                    setErrMsg(error.data.title);
                } else if (error.status === 200) {
                    setEmail('');
                    setPassword('');
                    setUsername('');
                    setPassword('');

                    dispatch(setOpenModal(false));

                    navigate('/');
                } else {
                    setErrMsg('Login Failed');
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
            {isLoading ? <h2>Loading...</h2> : (
                <>
                    <h2>Registration</h2>
                    <form onSubmit={handleSubmit}>
                        {createAuthInput({
                            type: "text",
                            id: "username",
                            ref: usernameRef,
                            value: username,
                            onChange: handleUsernameInput,
                            autoComplete: "off",
                            required: true,
                            label: "Username",
                            Icon: Person,
                            iconColor: "#00000",
                            iconHeight: "20px",
                            iconWidth: "20px"
                        })}
                        {createAuthInput({
                            type: "text",
                            id: "email",
                            ref: emailRef,
                            value: email,
                            onChange: handleEmailInput,
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
                            ref: passwordRef,
                            value: password,
                            onChange: handlePasswordInput,
                            autoComplete: "off",
                            required: true,
                            label: "Password",
                            Icon: LockClosed,
                            iconColor: "#00000",
                            iconHeight: "20px",
                            iconWidth: "20px"
                        })}
                        <button type='submit' className='btn'>Register</button>
                        {errMsg === '' ? <></> : <p className="error-message">{errMsg}</p>}
                        <div className="login-register">
                            <p>Already have an account?
                                <a href='#' className='login-link' onClick={handleLoginClick}> Login</a>
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

export default Register;
