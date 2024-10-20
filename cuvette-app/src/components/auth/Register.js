import { useState, useContext } from "react";
import { GoPerson } from "react-icons/go";
import { MdOutlineMailOutline } from "react-icons/md";
import { MdGroups } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { PiBuildingApartmentFill } from "react-icons/pi";
import axios from "axios";
import { AppContext } from "../../App";
import { Navigate } from "react-router-dom";

const Register = ({ triggerToast }) => {
  const context = useContext(AppContext);
  const apiURL = process.env.REACT_APP_BACKEND_API;
  console.log(process.env.REACT_APP_BACKEND_API);

  const [formData, setFormData] = useState({
    name: "",
    contactNumber: "",
    companyName: "",
    email: "",
    companySize: "",
  });
  const [loading, setLoading] = useState(false); // State to manage loading

  const token = localStorage.getItem("token");

  // If token exists, redirect to the dashboard
  if (token) {
    return <Navigate to="/dashboard" />;
  }
  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when the form is submitted

    try {
      // Make the POST request to /register API
      const response = await axios.post(`${apiURL}/register`, {
        name: formData.companyName,
        companySize: formData.companySize,
        email: formData.email,
        password: "defaultPassword123", // Assuming password isn't handled by the form yet
        contactNumber: "+91" + formData.contactNumber,
      });
      localStorage.setItem("comp_id", response.data.companyId);
      console.log(response.data.token);

      // console.log(response.data.token);

      if (response.status === 201) {
        // Show success toast
        triggerToast("Registration successful!", "success");
        // Optionally navigate to another page
      }
    } catch (error) {
      // Show error toast
      triggerToast(`Error during registration: ${error.message}`, "error");
    } finally {
      setLoading(false); // Reset loading after the process is done
      context.dispatch({ type: "login" });
    }
  };

  const fields = [
    { name: "name", placeholder: "Name", type: "text", icon: <GoPerson /> },
    {
      name: "contactNumber",
      placeholder: "Phone no",
      type: "text",
      icon: <FiPhone />,
    },
    {
      name: "companyName",
      placeholder: "Company Name",
      type: "text",
      icon: <PiBuildingApartmentFill />,
    },
    {
      name: "email",
      placeholder: "Company Email",
      type: "email",
      icon: <MdOutlineMailOutline />,
    },
    {
      name: "companySize",
      placeholder: "Employee Size",
      type: "number",
      icon: <MdGroups />,
    },
  ];

  return (
    <div className="flex flex-col justify-start p-6 lg:px-16 scale-75 md:scale-100 w-full h-full items-center md:justify-center">
      <div className="flex flex-col items-center justify-center gap-4 border-[1px] border-purple-400 rounded-md p-6">
        <div className="text-center">
          <h3 className="font-medium text-2xl">Sign Up</h3>
          <p className="text-xs">Please register to continue.</p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          {fields.map((field, index) => (
            <div
              key={index}
              className="w-full border flex p-1 ps-4 bg-gray-100 focus:bg-white items-center rounded-md border-gray-300"
            >
              {field.icon}
              <input
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                value={formData[field.name]}
                onChange={handleChange}
                className="w-full p-2 focus:outline-none bg-inherit rounded-md"
                disabled={loading} // Disable input during loading
              />
            </div>
          ))}
          <p className="text-xs px-8 text-center">
            By clicking on proceed, you accept our{" "}
            <span className="text-blue-600">Terms</span> &{" "}
            <span className="text-blue-600">Conditions</span>
          </p>
          <button
            type="submit"
            className="bg-blue-600 w-full rounded-md px-4 py-2 text-white"
            disabled={loading} // Disable button during loading
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l-3 3 3 3v4a8 8 0 01-8-8z"
                  ></path>
                </svg>
                Processing...
              </div>
            ) : (
              "Proceed"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
