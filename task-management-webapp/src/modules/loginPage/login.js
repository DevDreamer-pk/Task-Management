import React, { useState } from "react";
import Content from "./content";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { userService } from "../../services";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  // const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignIn = async (formData) => {
    try {
      // setLoading(true);
      const response = await userService.signIn(formData);
      if (response) {
        const token = response.token;
        localStorage.setItem("authToken", token);
        const decodedToken = jwtDecode(token);
        const { userId, email, name } = decodedToken;
        toast.success("User signed in successfully");
        navigate("/deshboard", { state: { userId, email, name } });
      }
      // setLoading(false);
      return response;
    } catch (error) {
      // setLoading(false);
      console.error("Error signing in:", error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <Content onSubmit={handleSignIn} />
    </>
  );
};

export default LoginPage;
