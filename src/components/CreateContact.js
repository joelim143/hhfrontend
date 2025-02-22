import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CreateContact = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state?.formData; // Get form data passed from ContactForms.js

  useEffect(() => {
    if (!formData) {
      navigate("/"); // If no data is passed, redirect to homepage
      return;
    }

    const createContact = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/hubspot_contact/contacts/create/", {
          method: "POST", // Use POST for creating new users
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.REACT_APP_HUBSPOT_TOKEN}`,
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
          alert("Profile created successfully!");
          navigate("/"); // Redirect to home page after successful creation
        } else {
          alert(`Error: ${data.message || "Something went wrong."}`);
          navigate("/"); // Redirect on error as well
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Network error.");
        navigate("/"); // Redirect on error
      }
    };

    createContact();
  }, [formData, navigate]);

  return (
    <div className="text-center">
      <h2>Creating your profile...</h2>
    </div>
  );
};

export default CreateContact;
