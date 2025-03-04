import React from "react";
import { useNavigate } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";

const AuthProviderWrapper = ({ children }) => {
  const navigate = useNavigate(); // Get navigate function

  return <AuthProvider navigate={navigate}>{children}</AuthProvider>;
};

export default AuthProviderWrapper;
