import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function WelcomeScreen(props) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
  }, []);

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
          // bgcolor: "wheat",
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 0px 8px",
          padding: 5,
          borderRadius: 2,
          paddingTop: 1,
        }}
      >
        <h1>Welcome</h1>

        <Button
          variant="contained"
          onClick={() => navigate("/login")}
          sx={{ m: 2, width: 130 }}
        >
          Login
        </Button>
        <Button
          sx={{ m: 2, width: 130 }}
          variant="contained"
          onClick={() => navigate("/register")}
        >
          Register
        </Button>
      </Box>
    </div>
  );
}

export default WelcomeScreen;
