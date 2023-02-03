// import { Button } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink } from "react-router-dom";

import * as userServices from "../services/userService";
import "./Styles.css";

function HomeScreen(props) {
  const navigate = useNavigate();

  const [id, setId] = useState("");
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

  useEffect(() => {
    const token = localStorage.getItem("token");

    const decode = jwt_decode(token);
    setId(decode.id);

    try {
      const getUser = async (id) => {
        const user = await userServices.getUser(id);

        if (user.status === 200) {
          setLastName(user.data.data.last_name);
          setEmail(user.data.data.email);
          setPhone(user.data.data.phone_number);
          setFirstName(user.data.data.first_name);
          setDob(user.data.data.date_of_birth);
          setAge(user.data.data.age);
          setAddress(user.data.data.address);
          setGender(user.data.data.gender);
          setAadhar(user.data.data.aadhar_number);
          setNationality(user.data.data.nationality);
          setStatus(user.data.data.status);
        }
        return;
      };
      getUser(decode.id);
      //
    } catch (error) {
      console.log(error);
    }
  }, []);

  const logout = () => {
    if (window.confirm("Are you sure, Do you want log out?")) {
      localStorage.removeItem("token");
      toast.info("Logged out!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      navigate("/", { replace: true });
      return;
    }
    return;
  };

  const deleteUser = async () => {
    try {
      if (window.confirm("Are you sure, Do you want delete your account?")) {
        const response = await userServices.deleteUser(id);
        if (response.status === 200) {
          localStorage.removeItem("token");

          toast.success("Account deleted successfully!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          return navigate("/", { replace: true });
        }
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <nav className="navbar">
        <button className="link" onClick={() => navigate(`/profile/${id}`, { replace: true })}>
          Profile
        </button>

        <button className="link" onClick={logout}>
          Logout
        </button>

        <button className="link" onClick={deleteUser}>
          Delete User
        </button>
      </nav>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          // marginTop: "100px",
        }}
      >
        {email && (
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
              // alignItems: "center",
              m: 2,
              width: "30%",
            }}
          >
            <div className="input">
              <p className="inputkey">First Name</p>:<p>{first_name}</p>
            </div>
            <div className="input">
              <p className="inputkey">Last Name</p>:<p>{last_name}</p>
            </div>
            <div className="input">
              <p className="inputkey">E-mail</p>:<p>{email}</p>
            </div>
            <div className="input">
              <p className="inputkey">Phone Number</p>:<p>{phone}</p>
            </div>
            {status && (
              <>
                <div className="input">
                  <p className="inputkey">Aadhar Number</p>:<p>{aadhar}</p>
                </div>
                <div className="input">
                  <p className="inputkey">Date of Birth</p>:<p>{dob}</p>
                </div>
                <div className="input">
                  <p className="inputkey">Age</p>:<p>{age}</p>
                </div>
                <div className="input">
                  <p className="inputkey">Gender</p>:<p>{gender}</p>
                </div>
                <div className="input">
                  <p className="inputkey">Address</p>:<p>{address}</p>
                </div>
                <div className="input">
                  <p className="inputkey">Nationality</p>:<p>{nationality}</p>
                </div>
                <div className="input">
                  <p className="inputkey">Status</p>:<p>{status}</p>
                </div>
              </>
            )}
          </Box>
        )}
        {/* <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "wheat",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 0px 8px",
            padding: 5,
            borderRadius: 2,
            paddingTop: 1,
          }}
        >
          <h1>Home</h1>
       
          <Button
            variant="contained"
            sx={{ m: 2, width: 150 }}
            onClick={() => navigate(`/profile/${id}`)}
          >
            Profile
          </Button>
          <Button
            variant="contained"
            sx={{ m: 2, width: 150 }}
            onClick={() => navigate(`/profileform/${id}`)}
          >
            Profile Form
          </Button>
          <Button
            variant="contained"
            sx={{ m: 2, width: 150 }}
            onClick={logout}
          >
            Logout
          </Button>
          <Button
            variant="contained"
            sx={{ m: 2, width: 150 }}
            onClick={deleteUser}
          >
            DELETE USER
          </Button>
        </Box> */}
      </div>
    </>
  );
}

export default HomeScreen;
