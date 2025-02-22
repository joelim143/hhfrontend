import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HeroBanner from "./HeroBanner"; // Import the HeroBanner component

const Activities = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract email along with name and status from location state
  const { name, status, email: userEmail } = location.state || { name: "User", status: "Pending", email: "" };

  const activities = [
    { id: 1, title: "Community Cleanup", date: "2025-03-15" },
    { id: 2, title: "Food Drive", date: "2025-04-10" },
    { id: 3, title: "Elderly Care Visit", date: "2025-05-05" },
  ];

  // Fetch the contact_id based on email
  const fetchContactId = async () => {
    console.log("from Activities.js L20 - Email being sent:", userEmail);  // Debugging log

    if (!userEmail) {
      alert("No email available to edit profile");
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/hubspot_contact/contacts/email/${userEmail}/`);
      console.log("from Activities.js L29 - Email Fetched:", userEmail);  // Debugging log
      // console.log("from Activities.js L29 - API raw response:", response); // Debugging log

      if (!response.ok) {
        const errorData = await response.json();  // Capture the error response body
        console.error("Error response from API:", errorData);
        throw new Error(`Failed to fetch contact details. Status: ${response.status}`);
      }
    
      const data = await response.json();
      console.log("response in json:", data);
      const id = data.contact_id || data.id;  // Ensure the API returns `contact_id` or fallback to `id`

      if (id) {
        navigate(`/edit-contact/${id}`); // Navigate to the edit profile page with contact_id
      } else {
        alert("Contact ID not found for the provided email.");
      }
    } catch (error) {
      console.error("Error fetching contact ID:", error.message);
      alert("Failed to fetch contact details. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Hero Banner Section */}
      <HeroBanner 
        logo="/Hopehandslogo.png" 
        slogan="Empowering Communities with HopeHands" 
      />

      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-3xl font-bold text-gray-800">Welcome, {name}!</h2>
        <p className="text-gray-600 mt-2">Member Approval Status: {status}</p>
        
        {/* Edit Profile Button - Only navigates if email is available */}
        <button
          className="bg-green-500 text-black px-4 py-2 rounded-lg mt-4 hover:bg-green-600 transition"
          onClick={fetchContactId}  // Call the function to fetch and navigate
        >
          Edit Profile
        </button>
      </div>

      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg mt-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Upcoming Activities</h3>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="p-4 border rounded-lg shadow-sm bg-gray-50">
              <h4 className="text-lg font-medium">{activity.title}</h4>
              <p className="text-sm text-gray-600">Date: {activity.date}</p>
              <button className="bg-blue-600 text-black px-3 py-2 rounded mt-2 hover:bg-blue-700 transition">
                Enroll (dummy)
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Home button */}
      <div className="text-center mt-6">
        <button
          className="bg-gray-700 text-black px-6 py-2 rounded-lg hover:bg-gray-800 transition"
          onClick={() => navigate("/dashboard")}
        >
          Back Home
        </button>
      </div>
    </div>
  );
};

export default Activities;
