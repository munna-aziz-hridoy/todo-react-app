import React from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import auth from "../../firebase.init";

const GoogleLoginButton = () => {
  const [signInWithGoogle, user] = useSignInWithGoogle(auth);
  const navigate = useNavigate();

  if (user) {
    navigate("/");
  }

  return (
    <button
      onClick={() => signInWithGoogle()}
      className="btn  btn-outline text-primary hover:bg-primary hover:text-white font-semibold capitalize text-xl rounded-lg w-full"
    >
      sign in Google
    </button>
  );
};

export default GoogleLoginButton;
