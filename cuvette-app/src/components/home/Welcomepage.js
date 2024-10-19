import React, { useContext } from "react";
import logo from "../../assets/BrandLogo.png";
import Login from "../auth/Login";
import Register from "../auth/Register";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast function
import "react-toastify/dist/ReactToastify.css"; // Import CSS for toast
import { AppContext } from "../../App";

const Welcomepage = () => {
  // Function to trigger toast notifications
  const triggerToast = (message, type = "success") => {
    if (type === "success") {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };
  const context = useContext(AppContext);
  return (
    <div className="w-full flex flex-col h-screen">
      <header className="flex py-8 px-12 justify-between">
        <img src={logo} width="100px" alt="brand - logo" />
        <button>Contact</button>
      </header>

      <div className="w-full h-full flex flex-col md:flex-row items-center justify-center">
        <p className="w-full px-12 md:px-36 mx-auto my-auto text-xs md:text-lg justify-self-center">
          Cuvette's job portal app helps users find jobs easily by listing
          opportunities and allowing quick applications. It offers filters to
          match users' skills and preferences, making the job search simple.
          Both job seekers and employers can track and manage applications
          smoothly.
        </p>
        <div className="w-full h-full">
            {/* Pass the triggerToast function as a prop */}
            {context.appState.auth === "register" ? (
              <Register triggerToast={triggerToast} />
            ) : (
              <Login  triggerToast={triggerToast}/>
            )}
        </div>
      </div>

      {/* ToastContainer to display notifications */}
      <ToastContainer />
    </div>
  );
};

export default Welcomepage;
