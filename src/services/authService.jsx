import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import baseUrl from "./generalFunctions";

export const login = async (user) => {
  try {
    const response = await axios.post(baseUrl() + "/auth", user);
    console.log(response.data);

    localStorage.setItem("token", response.data.token);
    return response;
  } catch (error) {
    console.log("error", error);
    if (error.response.data) {
      toast.error(error.response.data.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }
    toast.error(error.message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }
};

export const forgotPassword = async (user) => {
  try {
    const response = await axios.post(baseUrl() + "/forgotpassword", user);
    return response;
  } catch (error) {
    console.log("error", error);
    if (error.response.data) {
      toast.error(error.response.data.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }
    toast.error(error.message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }
};

export const forgotPasswordOtp = async (password) => {
  try {
    const response = await axios.post(
      baseUrl() + "/verifypasswordotp",
      password
    );
    return response;
  } catch (error) {
    console.log("error", error);
    if (error.response.data) {
      toast.error(error.response.data.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }
    toast.error(error.message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }
};

export const updatePassword = async (otp) => {
  try {
    const response = await axios.post(baseUrl() + "/updatepassword", otp);
    return response;
  } catch (error) {
    console.log("error", error);
    if (error.response.data) {
      toast.error(error.response.data.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }
    toast.error(error.message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }
};
