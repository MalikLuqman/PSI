import React from "react";
import { useFormik } from "formik";
import auth from "./auth";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { FallingLines } from "react-loader-spinner";
import { Toaster, toast } from "sonner";
import PSI_Logo from "../../../public/logos/PSI_Logo.png";
import LoginParticles from "../../Components/LoginParticles";
import LoginGlobe from "../../Components/LoginGlobe";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const ToastSuccess = (str) => {
    toast.success(str);
  };
  const ToastError = (str) => {
    toast.error(str);
  };

  const LoginForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await auth.login(values, ToastSuccess, ToastError);
        if (localStorage.token && localStorage.token !== "undefined") {
          navigate("/dashboard");
        }
      } catch (error) {
        console.log("Login Failed: ", error);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    
    <div className="relative flex items-center justify-center bg-gray-950  py-2 px-4 sm:px-6 lg:px-8 h-screen overflow-hidden">
      <LoginParticles />
      <Toaster richColors />
      <div className="relative z-10 flex flex-col md:flex-row w-full sm:max-w-3xl md:max-w-4xl bg-black border border-lime-600 shadow-lg rounded-lg overflow-hidden">
        {/* Left Section */}
        <div className="flex flex-col justify-center w-full md:w-1/2 p-8">
          <div className="text-center">
             <img
                            src={PSI_Logo}
                            alt="PSI Logo"
                            className="mx-auto w-22 h-22 md:w-48"
                          />
            {/* <h4 className="mb-4 text-xl font-semibold text-gray-800">
              Pakistan Subsriber Info
            </h4> */}
          </div>

          <form onSubmit={LoginForm.handleSubmit} className="space-y-2">
            <p className="text-gray-400 font-semibold text-center">
              Please login to your account
            </p>

            {/* Username Input */}
            <input
              type="email"
              name="email"
              onChange={LoginForm.handleChange}
              value={LoginForm.values.email}
              placeholder="Email"
              className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-lime-600  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-600 sm:text-sm sm:leading-6"
              required
            />

            {/* Password Input */}
            <input
              type="password"
              name="password"
              onChange={LoginForm.handleChange}
              value={LoginForm.values.password}
              placeholder="Password"
              className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-lime-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-600 sm:text-sm sm:leading-6"
              required
            />
            {loading ? (
              <div className="flex justify-center items-center mt-4">
                {" "}
                <FallingLines
                  color="#4D7C0F"
                  width="50"
                  visible={true}
                  ariaLabel="falling-circles-loading"
                />
              </div>
            ) : (
              ""
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full rounded-md bg-lime-700 text-white font-medium py-2 px-4 transition ${
                loading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-lime-800"
              }`}
            >
              {loading ? "Logging in..." : "Log in"}
            </button>

            {/* Forgot Password */}
            {/* <a
              href="#!"
              className="block text-sm text-center text-gray-500 hover:underline"
            >
              Forgot password?
            </a> */}
          </form>

          {/* Register Section */}
          {/* <div className="flex items-center justify-between mt-6">
            <p className="text-gray-600 text-sm">Don't have an account?</p>
            <button
              type="button"
              className="text-orange-500 border border-orange-500 rounded-md px-4 py-1.5 hover:bg-orange-500 hover:text-white transition"
            >
              <Link to="/signup"> Register</Link>
            </button>
          </div> */}
        </div>

        {/* Right Section */}
         
        <div className="hidden  md:flex flex-col w-full md:w-1/2 bg-gradient-to-r from-lime-700 to-black text-white p-16 items-center justify-center">
          <div className="w-full h-full">
    <LoginGlobe />
  </div>
        </div>
      </div>
    </div>
  );
}
