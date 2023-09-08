import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');

    const onChange = (e) => {
        setEmail(e.target.value);
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const auth = getAuth();
            await sendPasswordResetEmail(auth, email);
            toast.success('Email was sent');
        } catch (error) {
            toast.error('Could not send reset email.');
        }
    };

    return (
        <div className="pageContainer">
            <header>
                <p className="pageHeader">Forgot Password</p>
            </header>

            <main>
                <form onSubmit={onSubmit}>
                    <input
                        type="email"
                        placeholder="email"
                        className="emailInput"
                        id="email"
                        value={email}
                        onChange={onChange}
                    />
                    <Link className="forgotPasswordLink" to="/sign-in">
                        Sign In
                    </Link>

                    <div className="signInBar">
                        <div className="signInText">Send Reset Link</div>
                        <button className="signInButton">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="34px"
                                viewBox="0 0 24 24"
                                width="34px"
                                fill="#ffffff"
                            >
                                <path d="M0 0h24v24H0V0z" fill="none" />
                                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
                            </svg>
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
};
export default ForgotPassword;
