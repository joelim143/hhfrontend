import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const LOCAL_DB_API_URL = "http://127.0.0.1:8000/api/hubspot_contact/hubspot_contacts/";
  const HUBSPOT_TOKEN = process.env.REACT_APP_HUBSPOT_TOKEN;

  // Fetch Contacts
  useEffect(() => {
    if (!HUBSPOT_TOKEN) {
      console.error("HubSpot token not found in .env.");
      return;
    }

    axios.get(LOCAL_DB_API_URL, {
      headers: { Authorization: `Bearer ${HUBSPOT_TOKEN}` }
    })
    .then(response => setContacts(response.data))
    .catch(error => console.error("Error fetching contacts:", error));
  }, [HUBSPOT_TOKEN]);

  // Update Approval Status
  const updateApprovalStatus = (contactId, status) => {
    axios.patch(`${LOCAL_DB_API_URL}${contactId}/approval_status/`, 
      { approval_status: status },
      { headers: { Authorization: `Bearer ${HUBSPOT_TOKEN}` } }
    )
    .then(() => {
      setContacts(contacts.map(contact =>
        contact.contact_id === contactId ? { ...contact, approval_status: status } : contact
      ));
      toast.success(`Contact ${status} successfully!`);
    })
    .catch(error => {
      console.error(`Failed to ${status} contact:`, error);
      toast.error(`Failed to ${status} contact.`);
    });
  };

  // Delete Contact
  const handleDelete = (contactId) => {
    console.log("ContactList.js L47 handleDelete here:", contactId);
    axios.delete(`${LOCAL_DB_API_URL}${contactId}/delete/`, {
      headers: { Authorization: `Bearer ${HUBSPOT_TOKEN}` }
    })
    .then(() => {
      setContacts(contacts.filter(contact => contact.contact_id !== contactId));
      toast.success("Contact deleted successfully!");
    })
    .catch(error => {
      console.error("ContactList.js L56 handleDelete Error deleting contact:", error);
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
            contacts.map(contact => (
              <tr key={contact.contact_id}>
                <td>{contact.contact_id || 'N/A'}</td>
                <td>{contact.first_name || contact.properties?.firstname || 'N/A'}</td>
                <td>{contact.last_name || contact.properties?.lastname || 'N/A'}</td>
                <td>{contact.email || contact.properties?.email || 'N/A'}</td>
                <td>{contact.phone || contact.properties?.phone || 'N/A'}</td>
                <td>{contact.skills || 'N/A'}</td>
                <td>{contact.approval_status || 'Pending'}</td>
                <td>
                  <Link to={`/edit-contact/${contact.contact_id }`} className="btn btn-warning me-2">
                    Edit
                  </Link>
                  <button className="btn btn-danger me-2" onClick={() => handleDelete(contact.contact_id)}>
                    Delete
                  </button>
                  <button
                    className="btn btn-success me-2"
                    onClick={() => updateApprovalStatus(contact.contact_id, 'Approved')}
                    disabled={contact.approval_status === 'Approved'}
                  >
                    Approve
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => updateApprovalStatus(contact.contact_id, 'Rejected')}
                    disabled={contact.approval_status === 'Rejected'}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">No contacts available</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="text-center mt-4">
        <Link to="/" className="btn btn-primary">Home</Link>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ContactList;
