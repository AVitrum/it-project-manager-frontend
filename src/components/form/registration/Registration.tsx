import { Mail, LockClosed, Person } from 'react-ionicons'

const Register: React.FC<{ onLoginClick: React.MouseEventHandler<HTMLAnchorElement> }> = ({ onLoginClick }) => {
    return (
        <div className="form-box register">
            <h2>Registration</h2>
            <form action="#">
                <div className="input-box">
                    <span className="icon">
                        <Person
                            color={'#00000'}
                            height="20px"
                            width="20px"
                        />
                    </span>
                    <input type="text" required />
                    <label>Username</label>
                </div>
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
                <button type='submit' className='btn'>Register</button>
                <div className="login-register">
                    <p>Already have an account?
                        <a href='#' className='login-link' onClick={onLoginClick}> Login</a>
                    </p>
                </div>
            </form>
        </div>
    );
}