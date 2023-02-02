import React, { useContext, useState } from "react";
import Joi from "joi";
import {
  Box,
  Button,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  IconButton,
  FormHelperText,
  InputAdornment,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import * as userServices from "../services/userService";
import { useNavigate } from "react-router-dom";

function RegisterScreen() {
  const navigation = useNavigate();

  const [error, setError] = useState("");
  const [first_name, setFirstName] = useState("Kishore");
  const [last_name, setLastName] = useState("C");
  const [email, setEmail] = useState("kishorec.ck@gmail.com");
  const [phone, setPhone] = useState("9842193573");
  const [password, setPassword] = useState("Kid@123");
  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    const user = {
      first_name,
      last_name,
      email,
      phone_number: phone,
      password,
    };
    const { error } = validateUser(user);

    if (error) return setError(error.message);
    setError("");
    const getUser = async (obj) => {
      try {
        const user = await userServices.verifyUser(obj);
        console.log(user.data);

        if (user.status === 200)
          return navigation(`/verifyotp/${user.data.user_id}`, {
            replace: true,
          });
      } catch (error) {
        console.log(error);
      }
    };
    getUser(user);
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
        <h1>Register</h1>
        <TextField
          error={error.includes("First Name") ? true : false}
          id="outlined-error-helper-text"
          label="First Name"
          helperText={error.includes("First Name") ? error : ""}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          error={error.includes("Last Name") ? true : false}
          id="outlined-error-helper-text"
          label="Last Name"
          helperText={error.includes("Last Name") ? error : ""}
          onChange={(e) => setLastName(e.target.value)}
        />
        <TextField
          error={error.includes("E-Mail") ? true : false}
          id="outlined-error-helper-text"
          label="E-Mail"
          helperText={error.includes("E-Mail") ? error : ""}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          error={error.includes("Phone") ? true : false}
          id="outlined-error-helper-text"
          label="Phone"
          helperText={error.includes("Phone") ? error : ""}
          onChange={(e) => setPhone(e.target.value)}
        />

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
        <Button variant="contained" sx={{ marginTop: 2 }} onClick={handleClick}>
          Register
        </Button>
      </Box>
    </div>
  );
}

function validateUser(user) {
  const schema = Joi.object({
    first_name: Joi.string()
      .min(3)

      .trim()
      .required()
      .label("First Name"),
    last_name: Joi.string().min(1).trim().required().label("Last Name"),

    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .label("E-Mail"),
    phone_number: Joi.string()
      .regex(/^[0-9]{0,15}$/)
      .min(10)
      .max(10)
      .required()
      .messages({
        "string.pattern.base": `Phone number must be number`,
        "string.min": "Phone number should contain atleast 10 numbers",
        "string.max": "Phone number should not be more than 10 numbers",
      })
      .label("Phone"),
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

export default RegisterScreen;
