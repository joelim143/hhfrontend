import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeroBanner from "./HeroBanner";

const PasswordVerification = ({ onVerified }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleVerify = async () => {
    setError(null);

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/hubspot_contact/contacts/${email}/verify_password/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Assuming backend sends the necessary fields: `name`, `approval_status`
        console.log("Verification successful, navigating to activities...");
        navigate("/activities", { 
          state: { 
            name: data.name || "User",           // Default name if not provided
            status: data.approval_status || "Pending",  // Default status if not provided
            email: email  // Include email in the state
          } 
        });

        if (typeof onVerified === "function") {
          onVerified(); // Call onVerified only if it is a function
        }
      } else {
        // Use the correct error message field returned by the backend
        setError(data.error || "Invalid email or password.");
      }
    } catch (error) {
      console.error("Error verifying password:", error);
      setError("Network error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <HeroBanner logo="/Hopehandslogo.png" slogan="Empowering Communities with HopeHands" />
      <div className="flex-grow flex items-center justify-center">
        <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-xl">
          <h3 className="text-3xl font-semibold text-center text-gray-800 mb-6">Login to Your Account</h3>
          <div className="space-y-6">
            <div className="flex flex-col items-center">
              <label className="block font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="w-full max-w-xs p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col items-center">
              <label className="block font-medium text-gray-700">Password</label>
              <input
                type="password"
                className="w-full max-w-xs p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <button
              className="w-full bg-blue-600 text-black p-3 rounded-lg mt-4 hover:bg-blue-700 transition font-medium"
              onClick={handleVerify}
            >
              Login
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-6">
        <button className="bg-blue-700 text-black px-6 py-2 rounded-lg hover:bg-blue-800 transition" 
        onClick={() => navigate("/")}>Home</button>
      </div>
    </div>
  );
};

export default PasswordVerification;
