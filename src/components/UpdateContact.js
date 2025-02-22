import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from './axios'; // Import the custom Axios instance
import { useEffect } from "react";


const UpdateContact = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const contactData = location.state?.contactData; // Get contact data
  console.log("Reveived contactData:", contactData); // Debugging line

  useEffect(() => {
    console.log("Received contactData:", contactData); // Debugging line
    
    if (!contactData || !contactData.properties.email) {
      console.error("No contact provided.");
      alert("No contact provided. Redirecting to contacts page.");
      navigate("/contacts"); // Redirect to contacts list if data is missing
      return;
    }

    // Send update request to backend
    axiosInstance.patch(`http://127.0.0.1:8000/api/hubspot_contact/contacts/${contactData.id}/update/`, contactData)
      .then(() => {
        alert("Contact updated successfully!");
        navigate("/contacts");
      })
      .catch(error => console.error("Error updating contact:", error));
  }, [contactData, navigate]);

  return (
    <div className="container mt-5">
      <h2>Updating Contact...</h2>
    </div>
  );
};

export default UpdateContact;
