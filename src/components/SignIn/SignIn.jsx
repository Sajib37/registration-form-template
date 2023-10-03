import {
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { Helmet } from "react-helmet-async";
import auth from "../../firebase.config";
import { NavLink } from "react-router-dom";
import { useRef, useState } from "react";

const SignIn = () => {
    const [success, setSuccess] = useState("");
    const emailRef = useRef();
    const handleForgotPass = (e) => {
        const email = emailRef.current.value;
        if (!email) {
            alert('enter your email first')
            return;
        }
        sendPasswordResetEmail(auth, email)
            .then(result => {
            alert('check your email...')
            })
            .catch(error => {
            alert("enter e a valid email..")
        })
    }

    const handleSignIn = (e) => {
        setSuccess("");
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                setSuccess("Login succesFull...");
            })
            .catch((error) => {
                setSuccess("Log in failed.");
            });
    };
    return (
        <div>
            <Helmet>
                <title>Registration form/Sign In</title>
            </Helmet>
            <form
                onSubmit={handleSignIn}
                className="border-2 border-teal-800 p-4 flex flex-col gap-4 max-w-[500px] mx-auto"
            >
                <input
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    className="input border-2 border-black  w-full "
                    ref={emailRef}
                    required
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Enter password"
                    className="input border-2 border-black  w-full "
                    required
                />
                <p onClick={handleForgotPass}>Forgot password</p>
                <p>
                    No Account, sign up first{" "}
                    <NavLink to="/signup" className="text-lg font-semibold">
                        Sign up
                    </NavLink>
                </p>
                <button className="btn btn-success w-32 mx-auto">
                    Sign in
                </button>
                {success && <p>{success}</p>}
            </form>
        </div>
    );
};

export default SignIn;
