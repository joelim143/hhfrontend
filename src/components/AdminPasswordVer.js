import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeroBanner from "./HeroBanner";

const AdminPasswordVerification = ({ onVerified }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Hardcoded admin credentials
        const adminUsername = "admin";
        const adminPassword = "admin";

        // Check if the entered credentials match
        if (username === adminUsername && password === adminPassword) {
            navigate("/admin-dashboard"); // Redirect to the admin dashboard
        } else {
            setErrorMessage("Invalid username or password");
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <HeroBanner logo="/Hopehandslogo.png" slogan="Empowering Communities with HopeHands" /> {/* Add HeroBanner */}
            <div className="flex-grow flex items-center justify-center">
                <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-xl">
                    <h3 className="text-3xl font-semibold text-center text-gray-800 mb-6">Admin Login</h3>

                    {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}

                    <form onSubmit={handleSubmit} className="space-y-6"> {/* Changed from space-y-4 to space-y-6 */}
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                            <input
                                type="text"
                                id="username"
                                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                id="password"
                                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 bg-blue-500 text-black rounded-lg shadow-md hover:bg-blue-700 mt-4" // Added mt-4 for spacing
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminPasswordVerification;
