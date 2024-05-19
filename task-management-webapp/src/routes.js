import React from "react";
import { Routes, Route } from 'react-router-dom';
import LoginPage from "./modules/loginPage/login";
import RegisterPage from "./modules/registerationPage/register";
import Deshboard from "./modules/deshboard/deshboard";


const Router = () => {

    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/deshboard" element={<Deshboard />} />

        </Routes>
    )
}

export default Router