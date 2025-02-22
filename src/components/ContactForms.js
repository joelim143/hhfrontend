import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeroBanner from "./HeroBanner";

const ContactForms = ({ logo, slogan }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    skills: "",
    availability: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false); // Toggle for password visibility

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission (Register New User)
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form is being submitted'); // Add this to check

    try {
      const response = await fetch("http://127.0.0.1:8000/api/hubspot_contact/contacts/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.REACT_APP_HUBSPOT_TOKEN}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong.");
      }

      alert("Contact created successfully!");
      navigate("/"); // Redirect to the home page

    } catch (error) {
      console.error("Error:", error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="container mt-5">
      {/* Hero Banner */}
      <HeroBanner logo="/Hopehandslogo.png" slogan="Empowering Communities with HopeHands" />

      {/* Registration Form */}
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center text-primary mb-4">Registration Form</h2>
          <form className="p-4 border rounded shadow bg-light" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">First Name:</label>
              <input type="text" name="first_name" className="form-control" value={formData.first_name} onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <label className="form-label">Last Name:</label>
              <input type="text" name="last_name" className="form-control" value={formData.last_name} onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <label className="form-label">Email Address:</label>
              <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <label className="form-label">Phone Number:</label>
              <input type="tel" name="phone" className="form-control" value={formData.phone} onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <label className="form-label">Skills:</label>
              <textarea name="skills" className="form-control" value={formData.skills} onChange={handleChange} required></textarea>
            </div>

            <div className="mb-3">
              <label className="form-label">Availability:</label>
              <input type="text" name="availability" className="form-control" value={formData.availability} onChange={handleChange} required />
            </div>

            {/* Password field with Show/Hide Toggle */}
            <div className="mb-3">
              <label className="form-label">Password:</label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-success w-100">Submit</button>
          </form>

          {/* Back to Home Button */}
          <div className="text-center mt-3">
            <button className="btn btn-dark" onClick={() => navigate("/")}>Back to Home</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForms;
