import React from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleLoginButton from "../GoogleLoginButton/GoogleLoginButton";
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import Spinner from "../Spinner/Spinner";

const Register = () => {
  const [authUser, authLoading] = useAuthState(auth);
  const [createUserWithEmailAndPassword, user, loading] =
    useCreateUserWithEmailAndPassword(auth);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    createUserWithEmailAndPassword(email, password);
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
          Register
        </h2>
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Name"
            className="input input-bordered input-primary w-full rounded-lg"
          />
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
            value="Register"
            className="btn  btn-primary text-white hover:bg-transparent hover:text-primary font-semibold capitalize text-xl rounded-lg w-full"
          />
          <p className="text-lg font-medium">
            Already User?{" "}
            <Link to="/login" className="text-primary font-bold">
              Login
            </Link>
          </p>
        </form>
        <div className="divider my-10">OR</div>
        <GoogleLoginButton />
      </div>
    </div>
  );
};

export default Register;
