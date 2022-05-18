import React from "react";
import {
  useAuthState,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import GoogleLoginButton from "../GoogleLoginButton/GoogleLoginButton";
import Spinner from "../Spinner/Spinner";

const Login = () => {
  const [authUser, authLoading] = useAuthState(auth);
  const [signInWithEmailAndPassword, user, loading] =
    useSignInWithEmailAndPassword(auth);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    signInWithEmailAndPassword(email, password);
  };

  if (loading || authLoading) {
    return <Spinner />;
  }

  if (user || authUser) {
    navigate("/");
  }

  return (
    <div className="flex justify-center items-center h-[90vh]">
      <div className="w-[400px] shadow-lg rounded-xl p-5">
        <h2 className="text-2xl font-bold text-primary text-center my-8">
          Login
        </h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            name="email"
            required
            type="email"
            placeholder="Email"
            className="input input-bordered input-primary w-full rounded-lg"
          />
          <input
            name="password"
            required
            type="password"
            placeholder="Password"
            className="input input-bordered input-primary w-full rounded-lg"
          />
          <input
            type="submit"
            value="Login"
            className="btn  btn-primary text-white hover:bg-transparent hover:text-primary font-semibold capitalize text-xl rounded-lg w-full"
          />
          <p className="text-lg font-medium">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary font-bold">
              Register
            </Link>
          </p>
        </form>
        <div className="divider my-10">OR</div>
        <GoogleLoginButton />
      </div>
    </div>
  );
};

export default Login;
