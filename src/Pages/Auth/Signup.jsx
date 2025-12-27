import React from "react";
import { useFormik } from "formik";
import auth from "./auth";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { FallingLines } from "react-loader-spinner";
import { Toaster, toast } from "sonner";
import axiosInstance from "../../api/axiosinstance";

export default function Signup() {
  const navigate = useNavigate();
  const [loadingState, setLoadingState] = useState(false);

  const StartLoading = () => {
    setLoadingState(true);
  };
  const EndLoading = () => {
    setLoadingState(false);
  };

  const SignupForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      c_password: "",
      role_id: 2,
    },
    onSubmit: async (values) => {
      // console.log("token: ", localStorage.token);
      // setLoading(true);
      // await auth.login(values);
      // if (localStorage.token && localStorage.token !== "undefined") {
      //   navigate("/dashboard");
      // }
      // setLoading(false);

      setLoadingState(true);
      await axiosInstance
        .post("/api/auth/register", values)
        .then((res) => {
          ToastSuccess("Account created Successfully");
        })
        .catch((err) => {
          if (err) ToastError("Error while creating account: ", err.message);
        })
        .finally(() => {
          setTimeout(() => {
            EndLoading();
          }, 1000);
        });
      SignupForm.resetForm();
    },
  });
  const ToastSuccess = (str) => {
    toast.success(str);
  };
  const ToastError = (str) => {
    toast.error(str);
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 py-2 px-4 sm:px-6 lg:px-8 min-h-screen">
      <Toaster richColors />
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
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

          <form onSubmit={SignupForm.handleSubmit} className="space-y-2">
            <p className="text-gray-600 text-sm text-center">Please Signup</p>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Full Name"
              onChange={SignupForm.handleChange}
              value={SignupForm.values.name}
              className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <input
              type="Email"
              id="email"
              name="email"
              placeholder="Email"
              onChange={SignupForm.handleChange}
              value={SignupForm.values.email}
              className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              required
            />
            <input
              type="Password"
              id="password"
              name="password"
              placeholder="Password"
              onChange={SignupForm.handleChange}
              value={SignupForm.values.password}
              className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              required
            />
            <input
              type="Password"
              id="c_password"
              name="c_password"
              placeholder="Confirm Password"
              onChange={SignupForm.handleChange}
              value={SignupForm.values.c_password}
              className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              required
            />

            {loadingState ? (
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
              disabled={loadingState}
              className={`w-full rounded-md bg-orange-500 text-white font-medium py-2 px-4 transition ${
                loadingState
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-orange-600"
              }`}
            >
              {loadingState ? "Signing up..." : "Signup"}
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
            <p className="text-gray-600 text-sm">Already have an account?</p>
            <button
              type="button"
              className="text-orange-500 border border-orange-500 rounded-md px-4 py-1.5 hover:bg-orange-500 hover:text-white transition"
            >
              <Link to="/login">Login</Link>
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="hidden md:flex flex-col justify-center w-full md:w-1/2 bg-gradient-to-r from-orange-500 to-gray-500 text-white p-8">
          <h4 className="text-2xl font-bold mb-4">
            We are more than just a Book company
          </h4>
          <p className="text-sm">
            Sign up today to unlock exclusive features! Manage your book
            listings, track your purchases, and enjoy a personalized experience
            tailored to your preferences. Your journey into the world of books
            starts here.
          </p>
        </div>
      </div>
    </div>
  );
}
