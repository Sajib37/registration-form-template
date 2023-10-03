import { Helmet } from "react-helmet-async";
import auth from "../../firebase.config";
import {
    createUserWithEmailAndPassword,
    sendEmailVerification,
    updateProfile,
} from "firebase/auth";
import { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { NavLink } from "react-router-dom";

const SignUp = () => {
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [succesText, setSuccesText] = useState("");
    const [showpass, setShowpass] = useState(false);

    const handleSignUp = (e) => {
        e.preventDefault();
        // reset usestate
        setEmailError("");
        setPasswordError("");
        setSuccesText("");
        const email = e.target.email.value;
        const password = e.target.password.value;
        const terms = e.target.checkbox.checked;
        const firstName = e.target.firstName.value;
        const SecondName = e.target.SecondName.value;
        const phone = e.target.phone.value;

        if (password.length < 8) {
            setPasswordError("Password should be at least 6 character");
            return;
        } else if (!/[A-Z]/.test(password)) {
            setPasswordError(
                " password should be contain at least one capital letters"
            );
            return;
        } else if (!/[a-z]/.test(password)) {
            setPasswordError(
                " password should be contain at least one lower case"
            );
            return;
        } else if (!/[0-9]/.test(password)) {
            setPasswordError(" password should be contain at least one digit");
            return;
        } else if (!/[#?!@$%^&*-]/.test(password)) {
            setPasswordError(
                " password should be contain at least one special character"
            );
            return;
        } else if (!terms) {
            setPasswordError(" You should agreeed to our terms and condition");
            return;
        }
        createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                sendEmailVerification(auth.currentUser).then((res) => {
                    console.log("email verified");
                });

                updateProfile(auth.currentUser, {
                    firstName: firstName,
                    SecondName: SecondName,
                    phoneNumber: phone
                })
                    .then(() => console.log('profile updated'))
                .catch(()=>console.log("profile update failed"))

                setSuccesText("Account created succesfully.");
            })
            .catch((error) => {
                setEmailError(error.message);
            });
    };
    return (
        <div className="px-1">
            <Helmet>
                <title>Registration form/Sign Up</title>
            </Helmet>
            <h1 className="text-3xl md:text-4xl font-bold text-center">
                {" "}
                Create a New Account
            </h1>
            <form
                onSubmit={handleSignUp}
                className="border-2 border-teal-800 p-4 flex flex-col gap-4 max-w-[500px] mx-auto"
            >
                <div className="flex gap-2">
                    <input
                        name="firstName"
                        type="text"
                        placeholder="Enter your first name"
                        className="input border-2 border-black  w-full "
                        required
                    />
                    <input
                        name="SecondName"
                        type="text"
                        placeholder="Enter your Second Name"
                        className="input border-2 border-black  w-full "
                        required
                    />
                </div>
                <input
                    name="phone"
                    type="number"
                    placeholder="Enter your Phone number"
                    className="input border-2 border-black  w-full "
                    required
                />
                <input
                    name="email"
                    type="email"
                    placeholder="Enter your Email"
                    className="input border-2 border-black  w-full "
                    required
                />
                <div className="relative">
                    <input
                        name="password"
                        type={showpass ? "text" : "password"}
                        placeholder="Enter your password"
                        className="input  border-2 w-full border-black"
                        required
                    />
                    <div
                        onClick={() => setShowpass(!showpass)}
                        className="absolute top-2 right-2 text-3xl text-lime-600"
                    >
                        {showpass ? (
                            <AiOutlineEyeInvisible></AiOutlineEyeInvisible>
                        ) : (
                            <AiOutlineEye></AiOutlineEye>
                        )}
                    </div>
                </div>
                <div className="flex gap-2 items-center">
                    <input
                        name="checkbox"
                        type="checkbox"
                        className="checkbox"
                    />
                    <span>
                        I agreed to the{" "}
                        <a href="#" className="font-bold">
                            terms and conditions
                        </a>
                    </span>
                </div>
                <p>
                    Already have a account, please{" "}
                    <NavLink to="/signin" className="text-lg font-semibold">
                        Login
                    </NavLink>
                </p>
                <button className="btn btn-success w-32 mx-auto">
                    Sign up
                </button>
                {emailError && <p className="text-red-700 ">{emailError}</p>}
                {passwordError && (
                    <p className="text-red-700 ">{passwordError}</p>
                )}
                {succesText && <p className="text-green-700 ">{succesText}</p>}
            </form>
        </div>
    );
};

export default SignUp;
