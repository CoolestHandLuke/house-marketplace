import { useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import {
    getAuth,
    createUserWithEmailAndPassword,
    updateProfile,
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase.config';
import visibilityIcon from '../assets/svg/visibilityIcon.svg';

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const { name, email, password } = formData;
    const navigate = useNavigate();

    const onChange = (e) => {
        setFormData((prevState) => {
            return {
                ...prevState,
                [e.target.id]: e.target.value,
            };
        });
    };

    // This function handles  the form submission for trying to create a new user login.
    const onSubmit = async (e) => {
        e.preventDefault();

        // Wrap everything in a try-catch because we don't know if it's going to work
        try {
            // Firebase function that gets a UID authorization from firebase (I think)
            const auth = getAuth();

            // Another firebase method, does what it says
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            const user = userCredential.user;

            updateProfile(auth.currentUser, {
                displayName: name,
            });

            // We make a copy of the state because we don't want to be directly accessing state values.
            const formDataCopy = { ...formData };
            // Delete the password to prevent it from being pushed up to the db.
            delete formDataCopy.password;
            formDataCopy.timestamp = serverTimestamp();
            // Push to db, the users collection, key is the user.uid, data pushed is the formDataCopy object
            await setDoc(doc(db, 'users', user.uid), formDataCopy);

            navigate('/');
        } catch {
            toast.error('Something went wrong with registration.');
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
                            type="text"
                            className="nameInput"
                            placeholder="Name"
                            id="name"
                            value={name}
                            onChange={onChange}
                        />
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
                        <div className="signUpBar">
                            <p className="signUpText">Sign Up</p>
                            <button className="signUpButton">
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
                    {/* Google OAuth component */}

                    <Link to="/sign-in" className="registerLink">
                        Sign In Instead
                    </Link>
                </main>
            </div>
        </>
    );
};
export default SignUp;
