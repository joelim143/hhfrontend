import { useState, useEffect } from "react";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditContact = () => {
  const { contact_id } = useParams(); // Get contact_id from URL  
  const [contact, setContact] = useState(null);
  const [updatedFields, setUpdatedFields] = useState({});
  const navigate = useNavigate();
  const HUBSPOT_TOKEN = process.env.REACT_APP_HUBSPOT_TOKEN; // Use .env variable

  useEffect(() => {
    if (!contact_id) {
      console.error(" No contact_id provided in URL.");
      return;
    }

    console.log(` Fetching contact for Contact ID: ${contact_id}`);

    axios.get(`http://127.0.0.1:8000/api/hubspot_contact/contacts/${contact_id}/`, {
      headers: {
        Authorization: `Bearer ${HUBSPOT_TOKEN}`,
        Accept: "application/json",
      },
    })
    .then(response => {
      setContact(response.data);
      console.log(" Contact fetched successfully:", response.data);
    })
    .catch(error => {
      console.error(" Error fetching contact:", error.response?.data || error.message);
    });
  }, [contact_id, HUBSPOT_TOKEN]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Track modified fields
    setUpdatedFields((prev) => ({
      ...prev,
      [name]: value || undefined,  // Avoid overwriting with empty strings
    }));

    // Update displayed contact data
    setContact((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const contactData = { ...contact, ...updatedFields };

    console.log(" Submitting updated contact data:", contactData);

    axios.patch(`http://127.0.0.1:8000/api/hubspot_contact/contacts/${contact_id}/update/`, contactData, {
    })
    .then(() => {
      alert(" Contact updated successfully!");
      navigate("/contacts");  // Redirect after update
    })
    .catch(error => {
      console.error(" Error updating contact:", error.response?.data || error.message);
    });
  };

  if (!contact) {
    return <div className="container mt-5"> Loading contact data... Please wait!</div>;
  }

  return (
    <div className="container mt-5">
      <h2>Edit Contact</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">First Name</label>
          <input
            type="text"
            name="first_name"
            value={contact.first_name || ""}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Last Name</label>
          <input
            type="text"
            name="last_name"
            value={contact.last_name || ""}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            value={contact.email}
            className="form-control bg-light"
            disabled
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input
            type="text"
            name="phone"
            value={contact.phone || ""}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Skills</label>
          <input
            type="text"
            name="skills"
            value={contact.skills || ""}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <button type="submit" className="btn btn-primary">Update Contact</button>

        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => navigate("/contacts")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditContact;
