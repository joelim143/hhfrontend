import React from "react";
import { useNavigate } from "react-router-dom";
import HeroBanner from "./HeroBanner";

const AdminDashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <HeroBanner logo="/Hopehandslogo.png" slogan="Empowering Communities with HopeHands" />
            <div className="flex-grow flex items-start justify-center pt-4">
                <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-xl mx-auto">
                    <h3 className="text-4xl font-bold text-center text-black mb-2">Administrator Actions</h3>
                    <div className="button-container">
                        <div className="w-full flex justify-center my-2">
                            <button
                                onClick={() => navigate("/contacts")}
                                className="button bg-blue-500"
                            >
                                View Members Contact List
                            </button>
                        </div>
                        <div className="w-full flex justify-center my-2">
                            <button
                                onClick={() => navigate("/pending-approvals")}
                                className="button bg-yellow-500"
                            >
                                Edit Pending Approval List
                            </button>
                        </div>
                        <div className="w-full flex justify-center my-2">
                            <button
                                onClick={() => navigate("/activities")}
                                className="button bg-green-500"
                            >
                                View Activity List
                            </button>
                        </div>
                        <div className="w-full flex justify-center my-2">
                            <button
                                onClick={() => navigate("/")}
                                className="button bg-maroon-500 text-gold-500 border-gold-500"
                            >
                                Go to Home
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;