import { Button } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import * as userServices from "../services/userService";

function HomeScreen(props) {
  //   const apiUser = useContext(UserContext);

  const navigate = useNavigate();

  const [id, setId] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decode = jwt_decode(token);
    setId(decode.id);
  }, []);

  const logout = () => {
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
  };

  const deleteUser = async () => {
    try {
      const response = await userServices.deleteUser(id);
      if (response.status === 200) {
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
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          // height: "100vh",
          bgcolor: "wheat",
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 0px 8px",
          padding: 5,
          borderRadius: 2,
          paddingTop: 1,
        }}
      >
        <h1>Home</h1>
        {/* {apiUser.user && (
        <div>
          <p>name : {apiUser.user.name}</p>
          <p>email : {apiUser.user.email}</p>
        </div>
      )} */}
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
        <Button variant="contained" sx={{ m: 2, width: 150 }} onClick={logout}>
          Logout
        </Button>
        <Button
          variant="contained"
          sx={{ m: 2, width: 150 }}
          onClick={deleteUser}
        >
          DELETE USER
        </Button>
      </Box>
    </div>
  );
}

export default HomeScreen;
