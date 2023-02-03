import React, { useState, useContext } from "react";
import Joi from "joi";
import {
  Box,
  Button,
  TextField,
  Link,
  FormControl,
  InputLabel,
  OutlinedInput,
  IconButton,
  FormHelperText,
  InputAdornment,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import * as authServices from "../services/authService";

function LoginScreen(props) {
  const navigation = useNavigate();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClick = async () => {
    const user = { email, password };
    const { error } = validateUser(user);

    if (error) return setError(error.message);
    setError("");

    const login = async (obj) => {
      try {
        const response = await authServices.login(obj);
        if (response.status === 200) {
          toast.success("Successfully logged in!", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          return navigation("/home", { replace: true });
        }
      } catch (error) {
        console.log(error);
      }
    };
    login(user);
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
        <h1>Login</h1>
        <TextField
          error={error.includes("E-Mail") ? true : false}
          helperText={error.includes("E-Mail") ? error : ""}
          id="outlined-error-helper-text"
          label="E-Mail"
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* 
      <TextField
        type="password"
        error={error.includes("Password") ? true : false}
        id="outlined-error-helper-text"
        label="Password"
        helperText={error.includes("Password") ? error : ""}
        onChange={(e) => setPassword(e.target.value)}
      /> */}
        <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            error={error.includes("Password") ? true : false}
            onChange={(e) => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword((show) => !show)}
                  onMouseDown={(event) => {
                    event.preventDefault();
                  }}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
          <FormHelperText
            error={error.includes("Password") ? true : false}
            children={error.includes("Password") ? error : ""}
          />
        </FormControl>
        <div style={{ display: "flex", marginTop: 15 }}>
          <Button
            variant="contained"
            onClick={handleClick}
            style={{ marginRight: "10px" }}
          >
            Login
          </Button>
          <Button variant="contained" onClick={() => navigation("/register")}>
            Register
          </Button>
        </div>
        <Link
          onClick={() => navigation("/forgotpassword")}
          sx={{ color: "grey", m: 2, cursor: "pointer" }}
          underline="none"
        >
          {"Forgot password?"}
        </Link>
      </Box>
    </div>
  );
}

function validateUser(user) {
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
    password: Joi.string().min(7).required().label("Password"),
  });
  return schema.validate(user);
}

export default LoginScreen;
