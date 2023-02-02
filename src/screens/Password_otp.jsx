import React, { useState, useContext } from "react";
import Joi from "joi";
import { Box, Button, TextField, Link } from "@mui/material";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import * as authServices from "../services/authService";
import * as userServices from "../services/userService";

function PasswordOtp() {
  const { id } = useParams();

  const navigation = useNavigate();

  const [error, setError] = useState("");
  const [emailOtp, setEmailOtp] = useState("");

  const handleClick = async () => {
    let user = { email_otp: emailOtp };
    const { error } = validateOtp(user);

    if (error) return setError(error.message);
    setError("");

    user.id = id;

    const verifyOtp = async (obj) => {
      try {
        console.log(obj);

        const response = await authServices.forgotPasswordOtp(obj);
        console.log(response.data.email);

        if (response.status === 200) {
          return navigation("/changepassword", {
            replace: true,
            state: {
              email: response.data.email,
            },
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    verifyOtp(user);
  };

  const resendOtp = async () => {
    try {
      await userServices.resendOtp({ id });
    } catch (error) {
      console.log(error);
    }
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
        <h1>Email OTP</h1>
        <TextField
          error={error.includes("Otp") ? true : false}
          id="outlined-error-helper-text"
          label="Email_Otp"
          helperText={error.includes("Otp") ? error : ""}
          onChange={(e) => setEmailOtp(e.target.value)}
        />

        <Button sx={{ marginTop: 2 }} variant="contained" onClick={handleClick}>
          Verify
        </Button>
        <Link
          onClick={resendOtp}
          sx={{ color: "grey", m: 2, cursor: "pointer" }}
          underline="none"
        >
          {"Resend Otp?"}
        </Link>
      </Box>
    </div>
  );
}

function validateOtp(user) {
  const schema = Joi.object({
    email_otp: Joi.string()
      .regex(/^[0-9]{0,8}$/)
      .min(6)
      .max(6)
      .required()
      .messages({
        "string.pattern.base": `Invalid Otp`,
        "string.min": "Otp should contain atleast 6 numbers",
        "string.max": "Otp should not be more than 6 numbers",
      })
      .label("Otp"),
  });
  return schema.validate(user);
}

export default PasswordOtp;
