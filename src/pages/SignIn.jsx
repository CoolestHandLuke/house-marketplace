import { useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import OAuth from '../components/OAuth';
import visibilityIcon from '../assets/svg/visibilityIcon.svg';

const SignIn = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const { email, password } = formData;
    const navigate = useNavigate();

    const onChange = (e) => {
        setFormData((prevState) => {
            return {
                ...prevState,
                [e.target.id]: e.target.value,
            };
        });
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const auth = getAuth();

            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            if (userCredential.user) {
                navigate('/');
            }
        } catch (error) {
            toast.error('Bad User Credentials');
        }
    };
    return (
        <>
            <div className="pageContainer">
                <header>
                    <p className="pageHeader">Welcome Back!</p>
                </header>
                <main>
                    <form onSubmit={onSubmit}>
                        <input
                            type="email"
                            className="emailInput"
                            placeholder="Email"
                            id="email"
                            value={email}
                            onChange={onChange}
                        />
                        <div className="passwordInputDiv">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className="passwordInput"
                                placeholder="Password"
                                id="password"
                                value={password}
                                onChange={onChange}
                            />
                            <img
                                src={visibilityIcon}
                                alt="show password"
                                className="showPassword"
                                onClick={() => {
                                    setShowPassword((prevState) => !prevState);
                                }}
                            />
                        </div>
                        <Link
                            to="/forgot-password"
                            className="forgotPasswordLink"
                        >
                            Forgot Password
                        </Link>
                        <div className="signInBar">
                            <p className="signInText">Sign In</p>
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
                    <OAuth />

                    <Link to="/sign-up" className="registerLink">
                        Sign Up Instead
                    </Link>
                </main>
            </div>
        </>
    );
};
export default SignIn;
