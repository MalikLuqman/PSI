import React from "react";
import { useFormik } from "formik";
import auth from "./auth";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { FallingLines } from "react-loader-spinner";
import { Toaster, toast } from "sonner";

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
    <div className="flex items-center justify-center bg-gray-100 py-2 px-4 sm:px-6 lg:px-8 h-screen overflow-hidden">
      <Toaster richColors />
      <div className="flex flex-col md:flex-row w-full sm:max-w-3xl md:max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Left Section */}
        <div className="flex flex-col justify-center w-full md:w-1/2 p-8">
          <div className="text-center">
            <img
              className="mx-auto w-22 h-22 md:w-48"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW57_AgjjFvryihCz2Rrpo0btBvOIbw12Ltg&s"
              alt="logo"
            />
            <h4 className="mb-4 text-xl font-semibold text-gray-800">
              Welcome to Book Portal
            </h4>
          </div>

          <form onSubmit={LoginForm.handleSubmit} className="space-y-2">
            <p className="text-gray-600 text-sm text-center">
              Please login to your account
            </p>

            {/* Username Input */}
            <input
              type="email"
              name="email"
              onChange={LoginForm.handleChange}
              value={LoginForm.values.email}
              placeholder="Email"
              className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              required
            />

            {/* Password Input */}
            <input
              type="password"
              name="password"
              onChange={LoginForm.handleChange}
              value={LoginForm.values.password}
              placeholder="Password"
              className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              required
            />
            {loading ? (
              <div className="flex justify-center items-center mt-4">
                {" "}
                <FallingLines
                  color="#FF7B00"
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
              className={`w-full rounded-md bg-orange-500 text-white font-medium py-2 px-4 transition ${
                loading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-orange-600"
              }`}
            >
              {loading ? "Logging in..." : "Log in"}
            </button>

            {/* Forgot Password */}
            <a
              href="#!"
              className="block text-sm text-center text-gray-500 hover:underline"
            >
              Forgot password?
            </a>
          </form>

          {/* Register Section */}
          <div className="flex items-center justify-between mt-6">
            <p className="text-gray-600 text-sm">Don't have an account?</p>
            <button
              type="button"
              className="text-orange-500 border border-orange-500 rounded-md px-4 py-1.5 hover:bg-orange-500 hover:text-white transition"
            >
              <Link to="/signup"> Register</Link>
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="hidden md:flex flex-col justify-center w-full md:w-1/2 bg-gradient-to-r from-orange-500 to-gray-500 text-white p-8">
          <h4 className="text-2xl font-bold mb-4">
            We are more than just a Book company
          </h4>
          <p className="text-sm">
            Discover a platform that connects book lovers, where buying,
            selling, and sharing books becomes effortless and enjoyable. Embrace
            a world of stories, knowledge, and possibilities.
          </p>
        </div>
      </div>
    </div>
  );
}
