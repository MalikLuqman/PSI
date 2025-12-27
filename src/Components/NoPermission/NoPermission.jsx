import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ErrorOutlinedIcon } from "../../utils/icons";

const NoPermission = () => {
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate("/home");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-6">
      <div className="bg-gray-800 rounded-lg shadow-lg p-8 max-w-lg text-center">
        <ErrorOutlinedIcon
          className=" text-orange-500 mx-auto mb-6"
          style={{ fontSize: "6rem" }}
        />
        <h1 className="text-4xl font-bold text-white mb-4">Oops!</h1>
        <h2 className="text-2xl font-semibold text-orange-500 mb-4">
          404 - Page Not Found
        </h2>
        <p className="text-gray-300 mb-6">
          The page you are looking for doesn’t exist.
          <br /> Please contact the administrator if you believe this is a
          mistake.
        </p>
        <button
          onClick={handleBackHome}
          className="bg-orange-500 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-orange-600 transition duration-200"
        >
          Go Back to Home
        </button>
      </div>
    </div>
  );
};

export default NoPermission;
