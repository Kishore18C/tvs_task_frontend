import React, { useState, useEffect } from "react";
import { Box, MenuItem, TextField, Button } from "@mui/material";
import Joi from "joi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./Styles.css";
import * as userServices from "../services/userService";
import { useNavigate, useParams } from "react-router-dom";

export default function FormScreen() {
  const { id } = useParams();

  const navigate = useNavigate();
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [nationality, setNationality] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [status, setStatus] = useState("");
  const [form, setForm] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const getUser = async (id) => {
        const user = await userServices.getUser(id);
        console.log(user.data.data);

        if (user.status === 200) {
          setLastName(user.data.data.last_name);
          setEmail(user.data.data.email);
          setPhone(user.data.data.phone_number);
          setFirstName(user.data.data.first_name);
          if (user.data.data.status) return setForm(true);
        }
        return;
      };
      getUser(id);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleSumbit = () => {
    const user = {
      date_of_birth: dob,
      gender,
      age,
      address,
      nationality,
      status,
      aadhar_number: aadhar,
    };
    console.log("user", user);

    const { error } = validateUser(user);

    if (error) return setError(error.message);

    setError("");

    try {
      const userDetails = async (id, obj) => {
        const response = await userServices.updateUser(id, obj);
        if (response.status === 200) {
          toast.success("Successfully submitted!", {
            position: "top-center",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          return navigate("/home");
        }
      };
      userDetails(id, user);
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
        // alignItems: "center",
        // height: "100%",
      }}
    >
      {!form ? (
        <>
          {first_name && (
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 0px 8px",
                padding: 5,
                borderRadius: 2,
                paddingTop: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                m: 2,
              }}
              noValidate
              autoComplete="off"
            >
              <h2>USER DETAILS</h2>
              <div className="input">
                <p className="inputkey">First Name</p>:
                <TextField
                  required
                  InputProps={{
                    readOnly: true,
                  }}
                  value={first_name}
                  id="standard-required"
                  variant="standard"
                  // onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="input">
                <p className="inputkey">Last Name</p>:
                <TextField
                  required
                  InputProps={{
                    readOnly: true,
                  }}
                  defaultValue={last_name}
                  id="standard-required"
                  variant="standard"
                  // onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="input">
                <p className="inputkey">Date of birth</p>:
                <TextField
                  required
                  type="date"
                  id="standard-required"
                  variant="standard"
                  error={error.includes("Birth") ? true : false}
                  helperText={error.includes("Birth") ? error : ""}
                  onChange={(e) => setDob(e.target.value)}
                />
              </div>
              <div className="input">
                <p className="inputkey">Gender</p>:
                <TextField
                  select
                  label="Select"
                  variant="standard"
                  error={error.includes("Gender") ? true : false}
                  helperText={error.includes("Gender") ? error : ""}
                  onChange={(e) => setGender(e.target.value)}
                >
                  {["Male", "Female", "Other"].map((option, index) => (
                    <MenuItem key={index} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <div className="input">
                <p className="inputkey">Age</p>:
                <TextField
                  required
                  id="standard-required"
                  type="number"
                  variant="standard"
                  error={error.includes("Age") ? true : false}
                  helperText={error.includes("Age") ? error : ""}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
              <div className="input">
                <p className="inputkey">E-Mail</p>:
                <TextField
                  required
                  id="standard-required"
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="standard"
                  defaultValue={email}

                  // onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input">
                <p className="inputkey">Phone Number</p>:
                <TextField
                  required
                  id="standard-required"
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="standard"
                  defaultValue={phone}

                  // onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="input">
                <p className="inputkey">Address</p>:
                <TextField
                  id="standard-multiline-flexible"
                  multiline
                  //   maxRows={4}
                  variant="standard"
                  error={error.includes("Address") ? true : false}
                  helperText={error.includes("Address") ? error : ""}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="input">
                <p className="inputkey">Nationality</p>:
                <TextField
                  required
                  id="standard-required"
                  variant="standard"
                  error={error.includes("Nationality") ? true : false}
                  helperText={error.includes("Nationality") ? error : ""}
                  onChange={(e) => setNationality(e.target.value)}
                />
              </div>
              <div className="input">
                <p className="inputkey">Aadhar Number</p>:
                <TextField
                  required
                  id="standard-required"
                  variant="standard"
                  error={error.includes("Aadhar") ? true : false}
                  helperText={error.includes("Aadhar") ? error : ""}
                  onChange={(e) => setAadhar(e.target.value)}
                />
              </div>
              <div className="input">
                <p className="inputkey">Status</p>:
                <TextField
                  select
                  label="Select"
                  variant="standard"
                  error={error.includes("Status") ? true : false}
                  helperText={error.includes("Status") ? error : ""}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  {["Active", "Inactive"].map((option, index) => (
                    <MenuItem key={index} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <Button
                variant="contained"
                sx={{ marginTop: 3 }}
                onClick={handleSumbit}
              >
                Submit
              </Button>
            </Box>
          )}
        </>
      ) : (
        // <p>Form already filled!</p>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      )}
    </div>
  );
}

function validateUser(user) {
  const schema = Joi.object({
    // first_name: Joi.string().trim().required().label("First Name"),
    // last_name: Joi.string().trim().required().label("Last Name"),
    date_of_birth: Joi.date().required().label("Date of Birth"),
    gender: Joi.string().trim().required().label("Gender"),
    age: Joi.string().trim().required().label("Age"),

    // email: Joi.string()
    //   .email({ tlds: { allow: false } })
    //   .required()
    //   .label("E-Mail"),
    // phone: Joi.string().required().label("Phone"),
    address: Joi.string().min(10).trim().required().label("Address"),
    nationality: Joi.string().trim().required().label("Nationality"),
    aadhar_number: Joi.string()
      .regex(/^[0-9]{0,15}$/)
      .min(12)
      .max(12)
      .required()
      .messages({
        "string.pattern.base": "Invalid Aadhar number",
        "string.min": "Invalid Aadhar number",
        "string.max": "Invalid Aadhar number",
      })
      .label("Aadhar number"),
    status: Joi.string().trim().required().label("Status"),
  });
  return schema.validate(user);
}
