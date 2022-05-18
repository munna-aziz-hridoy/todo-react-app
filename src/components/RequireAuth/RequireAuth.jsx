import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";

import auth from "../../firebase.init";
import Spinner from "../Spinner/Spinner";

const RequireAuth = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  if (!user) {
    return <Navigate to="/login" />;
  }
  if (loading) {
    return <Spinner />;
  }

  return children;
};

export default RequireAuth;
