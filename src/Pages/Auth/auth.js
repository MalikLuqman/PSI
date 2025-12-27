import axiosInstance from "../../api/axiosinstance";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";

const login = async (credentials, success, error) => {
  await axiosInstance
    .post("/api/auth/login", credentials)
    .then((response) => {
      console.log("login res : ", response);
      if (response?.data?.error_message) {
        error(error.response?.data?.error_message || "Login Failed");
      }
      localStorage.setItem("token", response?.data?.token);
      localStorage.setItem("user_id", response?.data?.user?.id);
      localStorage.setItem("name", response?.data?.user?.name);
      localStorage.setItem("email", response?.data?.user?.email);
      localStorage.setItem("role_id", response?.data?.user?.role_id);
    })
    .catch((error) => {
      console.log(error);
      toast.error(error.response?.data?.error_message || "Login Failed");
    });
};

const logout = async () => {
  localStorage.clear();
};

var auth = {
  login,
  logout,
};

export default auth;
