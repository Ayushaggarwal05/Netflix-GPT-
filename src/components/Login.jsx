import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import { useSignIn, useSignUp, useClerk } from "@clerk/clerk-react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState();
  const [codeSent, setCodeSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  const email = useRef(null);
  const password = useRef(null);

  const { signIn } = useSignIn();
  const { signUp } = useSignUp();
  const { setActive } = useClerk();

  const handleSignUp = async () => {
    try {
      const message = checkValidData(
        email.current.value,
        password.current.value
      );
      setErrorMessage(message);
      if (message) return;

      await signUp.create({
        emailAddress: email.current.value,
        password: password.current.value,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setCodeSent(true);
    } catch (err) {
      setErrorMessage(err.errors?.[0]?.message || "Something went wrong.");
    }
  };

  const handleVerifyEmail = async () => {
    try {
      const result = await signUp.attemptEmailAddressVerification({
        code: verificationCode,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });

        dispatch(
          addUser({
            id: result.userId,
            email: email.current.value,
          })
        );

        alert("Sign-up successful!");
        setIsSignInForm(true);
        setCodeSent(false);
        setVerificationCode("");
      } else {
        console.log("Verification incomplete", result);
      }
    } catch (err) {
      setErrorMessage(err.errors?.[0]?.message || "Verification failed.");
    }
  };

  const handleSignIn = async () => {
    try {
      const result = await signIn.create({
        identifier: email.current.value,
        password: password.current.value,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });

        dispatch(
          addUser({
            id: result.userId,
            email: email.current.value,
          })
        );

        alert("Signed in successfully!");
      } else {
        console.log("Additional steps required", result);
      }
    } catch (err) {
      setErrorMessage(err.errors?.[0]?.message || "Sign-in failed.");
    }
  };

  const handleButtonClick = async () => {
    if (isSignInForm) {
      await handleSignIn();
    } else if (codeSent) {
      await handleVerifyEmail();
    } else {
      await handleSignUp();
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
    setCodeSent(false);
    setVerificationCode("");
    setErrorMessage("");
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/202ac35e-1fca-44f0-98d9-ea7e8211a07c/web/IN-en-20250512-TRIFECTA-perspective_688b8c03-78cb-46a6-ac1c-1035536f871a_large.jpg"
          alt="Background"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-xl opacity-85">
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : codeSent ? "Verify Email" : "Sign Up"}
        </h1>

        {!isSignInForm && !codeSent && (
          <input
            type="text"
            placeholder="Full Name"
            className="my-4 p-4 w-full bg-gray-700"
          />
        )}

        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="my-4 p-4 w-full bg-gray-700"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="my-4 p-4 w-full bg-gray-700"
        />

        {!isSignInForm && codeSent && (
          <input
            type="text"
            placeholder="Enter verification code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            className="my-4 p-4 w-full bg-gray-700"
          />
        )}

        <p className="text-red-500 font-bold py-2">{errorMessage}</p>
        <button
          className="p-4 my-3 bg-red-700 w-full rounded-lg cursor-pointer"
          onClick={handleButtonClick}>
          {isSignInForm ? "Sign In" : codeSent ? "Verify Email" : "Sign Up"}
        </button>

        <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to Netflix? Sign Up Now"
            : "Already Registered? Sign In"}
        </p>
      </form>
    </div>
  );
};

export default Login;
