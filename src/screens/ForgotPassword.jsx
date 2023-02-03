import React, { useState, useContext } from "react";
import Joi from "joi";
import { Box, Button, TextField, Link } from "@mui/material";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import * as authServices from "../services/authService";

function ForgotPassword() {
  const navigation = useNavigate();

  const [error, setError] = useState("");
  const [email, setEmail] = useState("");

  const handleClick = async () => {
    let user = { email };
    const { error } = validate(user);

    if (error) return setError(error.message);
    setError("");

    const verify = async (obj) => {
      try {
        const response = await authServices.forgotPassword(obj);

        if (response.status === 200) {
          return navigation(`/passwordotp/${response.data.user_id}`, {
            replace: true,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    verify(user);
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
        <h1>Forgot Password</h1>
        <TextField
          error={error.includes("E-Mail") ? true : false}
          id="outlined-error-helper-text"
          label="E-Mail"
          helperText={error.includes("E-Mail") ? error : ""}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button sx={{ marginTop: 2 }} variant="contained" onClick={handleClick}>
          Sumbit
        </Button>
      </Box>
    </div>
  );
}

function validate(user) {
  const schema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .trim()
      .required()
      .messages({
        "object.trim":
          "E-Mail may not contain any spaces at the beginning or end",
      })
      .label("E-Mail"),
  });
  return schema.validate(user);
}

export default ForgotPassword;
