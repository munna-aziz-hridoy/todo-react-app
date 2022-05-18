import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import auth from "../../../firebase.init";
import { signOut } from "firebase/auth";

const Header = () => {
  const [user] = useAuthState(auth);
  return (
    <header className="shadow-lg">
      <div className="navbar bg-base-100 justify-between">
        <div className="navbar-center">
          <Link to="/" className="btn btn-ghost normal-case text-xl">
            Todo app
          </Link>
        </div>
        <div className="navbar-end">
          {user && (
            <button
              onClick={() => signOut(auth)}
              className="flex justify-center items-center text-mds rounded-lg shadow-md p-3 text-red-700 border-2 border-red-700"
            >
              Sign out
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
