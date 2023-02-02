import React, { useState, useContext } from "react";
import Joi from "joi";
import { Box, Button, TextField, Link } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import * as authServices from "../services/authService";

function ChangePassword(props) {
  const navigation = useNavigate();
  const location = useLocation();

  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  console.log(location.state.email);

  const handleClick = async () => {
    const user = { password };
    const { error } = validatePassword(user);

    if (error) return setError(error.message);
    setError("");
    if (password !== confirmPassword)
      return setConfirmPasswordError("Password dose not match.");
    setConfirmPassword("");

    user.email = location.state.email;

    const updatepassword = async (obj) => {
      try {
        const response = await authServices.updatePassword(obj);
        if (response.status === 200)
          toast.success("Password changed successfully!", {
            position: "top-center",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        return navigation("/login", { replace: true });
      } catch (error) {
        console.log(error);
      }
    };
    updatepassword(user);
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          // height: "100vh",
          "& .MuiTextField-root": { m: 1, width: "25ch" },
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 0px 8px",
          padding: 5,
          borderRadius: 2,
          paddingTop: 1,
        }}
        autoComplete="off"
      >
        <h1>Change Password</h1>

        <TextField
          type="password"
          error={error.includes("Password") ? true : false}
          id="outlined-error-helper-text"
          label="Password"
          helperText={error.includes("Password") ? error : ""}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          type="password"
          // error={error.includes("Password") ? true : false}
          id="outlined-error-helper-text"
          label="Confirm Password"
          // helperText={error.includes("Password") ? error : ""}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <p style={{ color: "red" }}>{confirmPasswordError}</p>
        <Button
          variant="contained"
          onClick={handleClick}
          style={{ marginTop: 25 }}
        >
          Confirm
        </Button>
      </Box>
    </div>
  );
}

function validatePassword(user) {
  const schema = Joi.object({
    password: Joi.string()
      .min(7)
      .regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*_])+/)
      .required()
      .messages({
        "string.pattern.base":
          "Password should have 1 uppercase, lowercase, number and a special character.",
      })
      .label("Password"),
  });
  return schema.validate(user);
}

export default ChangePassword;
