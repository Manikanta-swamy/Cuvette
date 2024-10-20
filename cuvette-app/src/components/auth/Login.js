import React, { useState, useEffect } from "react";
import { FiPhone } from "react-icons/fi";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa"; // Import the checkmark icon
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ triggerToast }) => {
  const apiUrl = "https://cuvette-20ky.onrender.com";
  const navigate = useNavigate();

  const [emailLoading, setEmailLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);

  const [emailOTP, setEmailOTP] = useState("");
  const [phone, setPhone] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [otpGenerated, setOtpGenerated] = useState(false);

  const companyId = localStorage.getItem("comp_id");

  console.log(emailOTP);

  // Email verification function
  const handleEmailVerification = async (otp) => {
    setEmailLoading(true);
    try {
      const response = await axios.post(`${apiUrl}/verify-email/${companyId}`, {
        otp: emailOTP,
      });
      if (response.data.isEmailVerified) {
        setEmailVerified(true);
        triggerToast("Email verified successfully!", "success");
      } else {
        triggerToast("Failed to verify email.", "error");
      }
    } catch (error) {
      console.error("Error verifying email:", error);
      triggerToast(`Error verifying email: ${error.message}`, "error");
    } finally {
      setEmailLoading(false);
    }
  };

  // OTP generation and verification function
  const handleOtpGenerationAndVerification = async () => {
    if (!otpGenerated) {
      // Generate OTP
      setOtpLoading(true);
      try {
        const response = await axios.post(`${apiUrl}/phone-otp`, { companyId });
        triggerToast(`${response.data.message}`, "success");
        setOtpGenerated(true); // Mark OTP as generated
      } catch (error) {
        console.error("Error generating OTP:", error);
        triggerToast("Error generating OTP.", "error");
      } finally {
        setOtpLoading(false);
      }
    } else {
      // Verify Phone
      setOtpLoading(true);
      try {
        const response = await axios.post(`${apiUrl}/verify-phone`, {
          companyId,
          otp: phone,
        });
        if (response.data.isPhoneVerified) {
          setPhoneVerified(true);
          triggerToast("Phone verified successfully!", "success");
        } else {
          triggerToast("Failed to verify phone.", "error");
        }
      } catch (error) {
        console.error("Error verifying phone:", error);
        triggerToast("Error verifying phone.", "error");
      } finally {
        setOtpLoading(false);
      }
    }
  };

  // Effect for navigating upon successful verification
  useEffect(() => {
    // const token = localStorage.getItem("token");

    if (emailVerified && phoneVerified) {
      triggerToast("Success! Both email and phone are verified.", "success");
      navigate("/dashboard");
    }
  }, [emailVerified, phoneVerified, navigate, triggerToast]);

  return (
    <div className="flex flex-col justify-start p-6 lg:px-8 scale-75 md:scale-100 w-full h-full items-center md:justify-center">
      <div className="flex flex-col items-center justify-center gap-4 border-[1px] border-purple-400 rounded-md p-6">
        <div className="text-center">
          <h3 className="font-medium text-2xl">Sign In</h3>
          <p className="text-xs">Please enter OTP to continue.</p>
        </div>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col w-full gap-4">
            {/* Email Verification Section */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-full border flex p-1 ps-4 bg-gray-100 focus:bg-white items-center rounded-md border-gray-300">
                <MdOutlineMailOutline />
                <input
                  type="text"
                  name="email"
                  placeholder="Email OTP"
                  value={emailOTP}
                  onChange={(e) => setEmailOTP(e.target.value)}
                  className="w-full p-1 focus:outline-none bg-inherit rounded-md"
                  disabled={emailVerified || emailLoading}
                />
                {/* Show checkmark icon if email is verified */}
                {emailVerified && (
                  <FaCheckCircle className="text-green-600 ml-2" />
                )}
              </div>
              {!emailVerified && (
                <button
                  className={`bg-blue-600 w-full rounded-md px-4 py-1 text-white`}
                  onClick={handleEmailVerification}
                  disabled={emailLoading || emailVerified}
                >
                  {emailLoading ? "Verifying..." : "Verify Email"}
                </button>
              )}
            </div>

            {/* Phone Verification Section */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-full border flex p-1 ps-4 bg-gray-100 focus:bg-white items-center rounded-md border-gray-300">
                <FiPhone />
                <input
                  type="text"
                  name="phone"
                  placeholder="Mobile Enter OTP"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-1 focus:outline-none bg-inherit rounded-md"
                  disabled={phoneVerified || otpLoading}
                />
                {/* Show checkmark icon if phone is verified */}
                {phoneVerified && (
                  <FaCheckCircle className="text-green-600 ml-2" />
                )}
              </div>

              {!phoneVerified && (
                <button
                  className={`bg-blue-600 w-full rounded-md px-4 py-1 text-white`}
                  onClick={handleOtpGenerationAndVerification}
                  disabled={otpLoading || phoneVerified}
                >
                  {otpLoading
                    ? "Processing..."
                    : otpGenerated
                    ? "Verify Phone"
                    : "Generate OTP"}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
