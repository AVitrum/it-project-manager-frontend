import { Mail, LockClosed } from 'react-ionicons'

const Login: React.FC<{ onRegisterClick: React.MouseEventHandler<HTMLAnchorElement> }> = ({ onRegisterClick }) => {
    return (
        <div className="form-box login">
            <h2>Login</h2>
            <form action="#">
                <div className="input-box">
                    <span className="icon">
                        <Mail
                            color={'#00000'}
                            height="20px"
                            width="20px"
                        />
                    </span>
                    <input type="text" required />
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
                    <input type="password" required />
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