import React, { useEffect, useState } from "react";
import axios from "axios";

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
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">User Service</h1>

      {/* Register New User */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Register New User</h2>
        <input name="name" placeholder="Name" onChange={handleChange} className="border p-2 mr-2" />
        <input name="email" placeholder="Email" onChange={handleChange} className="border p-2 mr-2" />
        <input name="password" placeholder="Password" type="password" onChange={handleChange} className="border p-2 mr-2" />
        <button onClick={handleRegister} className="bg-blue-500 text-white px-4 py-2 rounded">Register</button>
      </div>

      {/* Update Role */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Update User Role</h2>
        <input placeholder="User ID" onChange={e => setEditingRole({ ...editingRole, id: e.target.value })} className="border p-2 mr-2" />
        <select onChange={e => setEditingRole({ ...editingRole, role: e.target.value })} className="border p-2 mr-2">
          <option value="Tenant">Tenant</option>
          <option value="Staff">Staff</option>
          <option value="Admin">Admin</option>
        </select>
        <button onClick={handleRoleChange} className="bg-yellow-500 text-white px-4 py-2 rounded">Update Role</button>
      </div>

      {/* Get User By ID */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Fetch User by ID</h2>
        <input placeholder="User ID" onChange={e => setUserIdToFetch(e.target.value)} className="border p-2 mr-2" />
        <button onClick={handleFetchUser} className="bg-green-600 text-white px-4 py-2 rounded">Fetch User</button>
        {fetchedUser && (
          <div className="mt-4 border p-4 rounded">
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
