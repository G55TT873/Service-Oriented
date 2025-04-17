// src/pages/UserPage.js
import React, { useState } from "react";
import axios from "axios";
import './UserPage.css';

export default function UserPage() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "" });
  const [editingRole, setEditingRole] = useState({ id: "", role: "Tenant" });
  const [userIdToFetch, setUserIdToFetch] = useState("");
  const [fetchedUser, setFetchedUser] = useState(null);

  const baseUrl = "http://localhost:8000/users";

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      const res = await axios.post(`${baseUrl}/register`, newUser);
      alert("User registered!");
      setUsers([...users, res.data]);
    } catch (err) {
      alert("Error: " + err.response?.data?.error);
    }
  };

  const handleRoleChange = async () => {
    try {
      const res = await axios.put(`${baseUrl}/role/${editingRole.id}`, { role: editingRole.role });
      alert("Role updated!");
      setUsers(users.map(user => user._id === res.data._id ? res.data : user));
    } catch (err) {
      alert("Error updating role");
    }
  };

  const handleFetchUser = async () => {
    try {
      const res = await axios.get(`${baseUrl}/${userIdToFetch}`);
      setFetchedUser(res.data);
    } catch (err) {
      alert("User not found");
    }
  };

  return (
    <div className="user-page-container">
      <h1 className="heading">User Service</h1>

      {/* Register New User */}
      <div className="form-section">
        <h2 className="form-heading">Register New User</h2>
        <input name="name" placeholder="Name" onChange={handleChange} className="input-field" />
        <input name="email" placeholder="Email" onChange={handleChange} className="input-field" />
        <input name="password" placeholder="Password" type="password" onChange={handleChange} className="input-field" />
        <button onClick={handleRegister} className="btn-register">Register</button>
      </div>

      {/* Update Role */}
      <div className="form-section">
        <h2 className="form-heading">Update User Role</h2>
        <input placeholder="User ID" onChange={e => setEditingRole({ ...editingRole, id: e.target.value })} className="input-field" />
        <select onChange={e => setEditingRole({ ...editingRole, role: e.target.value })} className="input-field">
          <option value="Tenant">Tenant</option>
          <option value="Staff">Staff</option>
          <option value="Admin">Admin</option>
        </select>
        <button onClick={handleRoleChange} className="btn-update-role">Update Role</button>
      </div>

      {/* Get User By ID */}
      <div className="form-section">
        <h2 className="form-heading">Fetch User by ID</h2>
        <input placeholder="User ID" onChange={e => setUserIdToFetch(e.target.value)} className="input-field" />
        <button onClick={handleFetchUser} className="btn-fetch-user">Fetch User</button>
        {fetchedUser && (
          <div className="user-details">
            <p><strong>ID:</strong> {fetchedUser._id}</p>
            <p><strong>Name:</strong> {fetchedUser.name}</p>
            <p><strong>Email:</strong> {fetchedUser.email}</p>
            <p><strong>Role:</strong> {fetchedUser.role}</p>
          </div>
        )}
      </div>
    </div>
  );
}
