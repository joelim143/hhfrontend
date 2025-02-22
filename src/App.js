import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ContactList from './components/ContactList';
import Dashboard from './components/Dashboard';
import ContactForms from './components/ContactForms';  // Import the ContactForms component
import EditContact from "./components/EditContact";
import PasswordVer from "./components/PasswordVer";  // Import PasswordVer component
import CreateContact from "./components/CreateContact";
import UpdateContact from "./components/UpdateContact";
import Activities from "./components/Activities";
import AdminDashboard from "./components/AdminDashboard";
import AdminPasswordVer from "./components/AdminPasswordVer";

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route ("/") redirects to Dashboard */}
        {/* <Route path="/" element={<Dashboard />} /> */}
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/contacts" element={<ContactList />} />
        <Route path="/register" element={<ContactForms />} /> {/* Route for Registration form */}
        <Route path="/create-contact" element={<CreateContact />} /> {/* Add this route for the registration form */}
        <Route path="/update-contact" element={<UpdateContact />} />
        <Route path="/edit-contact/:contact_id" element={<EditContact />} />
        <Route path="/password-verification" element={<PasswordVer />} />
        <Route path="/admin-password-verification" element={<AdminPasswordVer />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/dashboard" element={<Dashboard />} />  {/* This route should match the button click */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        {/* Catch-all route to debug */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
