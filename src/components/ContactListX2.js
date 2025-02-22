import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const LOCAL_DB_API_URL = "http://127.0.0.1:8000/api/hubspot_contact/contacts/"; // Your local database endpoint
  // const HUBSPOT_API_URL = "http://127.0.0.1:8000/api/hubspot_contact/contacts/hubspot/";
  const HUBSPOT_TOKEN = "pat-na1-85a65228-f31b-4c27-a4df-0e0388c70906"; // Store securely in .env

  useEffect(() => {
    axios
      .get(LOCAL_DB_API_URL, {
      // .get(HUBSPOT_API_URL, {
        headers: {
          Authorization: `Bearer ${HUBSPOT_TOKEN}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Fetched contacts:", response.data);
        setContacts(response.data);
      })
      .catch((error) => console.error("Error fetching contacts:", error));
  }, []);

  // Define the updateApprovalStatus function before its usage
  const updateApprovalStatus = (contactId, status) => {
    axios
      .patch(
        `http://127.0.0.1:8000/api/hubspot_contact/contacts/${contactId}/approval_status/`,
        { approval_status: status },
        {
          headers: {
            Authorization: `Bearer ${HUBSPOT_TOKEN}`,
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => {
        console.log(`Contact ${status.toLowerCase()}d:`, response.data);
        // Update the contact's approval status in the state
        setContacts((prevContacts) =>
          prevContacts.map((contact) =>
            contact.id === contactId ? { ...contact, approval_status: status } : contact
          )
        );
        // Show success notification
        toast.success(`Contact ${status.toLowerCase()}d successfully!`);
      })
      .catch((error) => {
        console.error(`Error ${status.toLowerCase()}ing contact:`, error);
        // Optionally, handle the error (e.g., show a notification)
        toast.error(`Failed to ${status.toLowerCase()} contact.`);
      });
  };

  const handleDelete = (contactId) => {
    axios
      .delete(`http://127.0.0.1:8000/api/hubspot_contact/contacts/${contactId}/delete/`, {
        headers: {
          Authorization: `Bearer ${HUBSPOT_TOKEN}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Contact deleted:", response.data);
        // Remove the deleted contact from the state
        setContacts(contacts.filter((contact) => contact.id !== contactId));
        // Show success notification
        toast.success("Contact deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting contact:", error);
        // Optionally, handle the error (e.g., show a notification)
        toast.error("Failed to delete contact.");
      });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Contact List</h1>
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Skills</th>
            <th>Approval Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.length > 0 ? (
            contacts.map((contact) => (
              <tr key={contact.id}>
                <td>{contact.id || 'N/A'}</td>
                <td>{contact.first_name || contact.properties?.firstname || 'N/A'}</td>
                <td>{contact.last_name || contact.properties?.lastname || 'N/A'}</td>
                <td>{contact.email || contact.properties?.email || 'N/A'}</td>
                <td>{contact.phone || contact.properties?.phone || 'N/A'}</td>
                <td>{contact.skills || 'N/A'}</td>
                {/* Display Approval Status */}
                <td>{contact.approval_status || 'Pending'}</td>
                <td>
                  <Link
                    to={`/edit-contact/${contact.email || contact.properties?.email || 'default-email'}`}
                    className="btn btn-warning me-2"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger me-2"
                    onClick={() => handleDelete(contact.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-success me-2"
                    onClick={() => updateApprovalStatus(contact.id, 'Approved')}
                    disabled={contact.approval_status === 'Approved'}
                  >
                    Approve
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => updateApprovalStatus(contact.id, 'Rejected')}
                    disabled={contact.approval_status === 'Rejected'}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">
                No contacts available
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="text-center mt-4">
        <Link to="/" className="btn btn-primary">
          Home
        </Link>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ContactList;
