import React from "react";
import Content from "./content";
import { useNavigate } from "react-router-dom";
import { userService } from "../../services";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterPage = () => {
  const navigate = useNavigate();

  const handleRegister = async (formData) => {
    try {
      const response = await userService.signUp(formData);
      if (response) {
        toast.success("User registered successfully");
        navigate("/");
      }
      return response;
    } catch (error) {
      console.error("Error registering:", error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <Content onSubmit={handleRegister} />
    </>
  );
};

export default RegisterPage;
