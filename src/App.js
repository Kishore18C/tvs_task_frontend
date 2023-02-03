import "./App.css";
import { useEffect, useState } from "react";

import WelcomeScreen from "./screens/WelcomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import { Route, Routes } from "react-router-dom";
import EmailVerify from "./screens/Email_otp";
import ForgotPassword from "./screens/ForgotPassword";
import PasswordOtp from "./screens/Password_otp";
import ChangePassword from "./screens/ChangePassword";
import FormScreen from "./screens/FormScreen";
import Profile from "./screens/Profile";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/verifyotp/:id" element={<EmailVerify />} />
        <Route path="/passwordotp/:id" element={<PasswordOtp />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/changepassword" element={<ChangePassword />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/profileform/:id" element={<FormScreen />} />
        <Route path="/profile/:id" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
