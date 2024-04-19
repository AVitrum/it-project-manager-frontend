import { Mail, LockClosed } from 'react-ionicons'
import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { setCredentials } from '../../../features/auth/authSlice'
import { useLoginMutation } from '../../../features/auth/authApiSlice'

const Login: React.FC<{ onRegisterClick: React.MouseEventHandler<HTMLAnchorElement> }> = ({ onRegisterClick }) => {
    const userRef = useRef();
    const errRef = useRef();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const navigate = useNavigate();

    const [login, { isLoading }] = useLoginMutation();
    const dispatch = useDispatch();


    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [email, password]);

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const tokens: AuthResponse = await login({ email: email, password: password }).unwrap()
            dispatch(setCredentials({ ...tokens, user: email }))
            setEmail('')
            setPassword('')
            navigate('/welcome')
        } catch (err) {
            if (!err?.originalStatus) {
                // isLoading: true until timeout occurs
                setErrMsg('No Server Response');
            } else if (err.originalStatus === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.originalStatus === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    };

    const handleUserInput = (e) => setEmail(e.target.value)
    const handlePwdInput = (e) => setPassword(e.target.value)

    return (
        <div className="form-box login">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-box">
                    <span className="icon">
                        <Mail
                            color={'#00000'}
                            height="20px"
                            width="20px"
                        />
                    </span>
                    <input
                        type="text"
                        id="email"
                        ref={userRef}
                        value={email}
                        onChange={handleUserInput}
                        autoComplete="off"
                        required

                    />
                    <label>Email</label>
                </div>
                <div className="input-box">
                    <span className="icon">
                        <LockClosed
                            color={'#00000'}
                            height="20px"
                            width="20px"
                        />
                    </span>
                    <input
                        type="password"
                        id="password"
                        onChange={handlePwdInput}
                        value={password}
                        required
                    />
                    <label>Password</label>
                </div>
                <div className="remember-forgot">
                    <label><input type="checkbox" />
                        Remember me</label>
                    <a href='#'>Forgot Password</a>
                </div>
                <button type='submit' className='btn'>Login</button>
                <div className="login-register">
                    <p>Don't have an account?
                        <a href='#' className='register-link' onClick={onRegisterClick}> Register</a>
                    </p>
                </div>
            </form>
        </div>
    );
}

export default Login;