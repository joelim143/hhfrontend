import React from "react";
import { useNavigate } from "react-router-dom";
import HeroBanner from "./HeroBanner";

const AdminDashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <HeroBanner logo="/Hopehandslogo.png" slogan="Empowering Communities with HopeHands" />
            <div className="flex-grow flex items-center justify-center">
                <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-xl">
                    <h3 className="text-4xl font-bold text-center text-black mb-8">Administration Page</h3>
                    <div className="button-container"> {/* Updated class name */}
                        <div className="w-full flex justify-center my-2">
                            <button
                                onClick={() => navigate("/contacts")}
                                className="w-full max-w-xs px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 text-center"
                            >
                                Members Contact List
                            </button>
                        </div>
                        <div className="w-full flex justify-center my-2">
                            <button
                                onClick={() => navigate("/pending-approvals")}
                                className="w-full max-w-xs px-6 py-3 bg-yellow-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-yellow-700 transition duration-300 text-center"
                            >
                                Pending Approval List
                            </button>
                        </div>
                        <div className="w-full flex justify-center my-2">
                            <button
                                onClick={() => navigate("/activities")}
                                className="w-full max-w-xs px-6 py-3 bg-green-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-300 text-center"
                            >
                                Activity List
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;