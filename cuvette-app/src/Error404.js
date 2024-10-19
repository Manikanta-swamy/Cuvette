import React from "react";
import { Link } from "react-router-dom";
import errorImage from "./assets/error404.svg"; // Replace with your image path

const Error404 = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        {/* Image or Icon */}
        <img src={errorImage} alt="404 Error" className="w-64 mx-auto mb-8" />
        {/* Error Message */}
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Oops! Page Not Found
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        {/* Link to go back to home */}
        <Link
          to="/"
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default Error404;
