// src/pages/AssignmentPage.js
import React, { useState } from 'react';
import './AssignmentPage.css';

const API_BASE = 'http://localhost:5000/assignments';

function AssignmentPage() {
  const [assignments, setAssignments] = useState([]);
  const [staffId, setStaffId] = useState('');
  const [requestId, setRequestId] = useState('');
  const [status, setStatus] = useState('');
  const [selectedId, setSelectedId] = useState('');

  const fetchAssignments = async () => {
    if (!staffId) return;
    try {
      const res = await fetch(`${API_BASE}/staff/${staffId}`);
      const data = await res.json();
      setAssignments(data);
    } catch (err) {
      console.error('Error fetching assignments:', err);
    }
  };

  const handleCreate = async () => {
    try {
      const res = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ staffId, requestId }),
      });
      await res.json();
      alert('Assignment created!');
      setRequestId('');
      fetchAssignments();
    } catch (err) {
      console.error('Error creating assignment:', err);
    }
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(`${API_BASE}/${selectedId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      await res.json();
      alert('Assignment updated!');
      setSelectedId('');
      setStatus('');
      fetchAssignments();
    } catch (err) {
      console.error('Error updating assignment:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
      setAssignments(assignments.filter((a) => a._id !== id));
    } catch (err) {
      console.error('Error deleting assignment:', err);
    }
  };

  return (
    <div className="assignment-container">
      <h2>Assignment Management</h2>

      <div className="form-group">
        <input
          placeholder="Enter Staff ID"
          value={staffId}
          onChange={(e) => setStaffId(e.target.value)}
        />
        <button onClick={fetchAssignments}>Fetch Assignments</button>
      </div>

      <div className="form-group">
        <h3>Create New Assignment</h3>
        <input
          placeholder="Request ID"
          value={requestId}
          onChange={(e) => setRequestId(e.target.value)}
        />
        <button onClick={handleCreate}>Assign</button>
      </div>

      <div className="form-group">
        <h3>Update Assignment Status</h3>
        <input
          placeholder="Assignment ID"
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">--Select Status--</option>
          <option value="Assigned">Assigned</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <button onClick={handleUpdate}>Update</button>
      </div>

      <h3>Assignments</h3>
      <table className="assignment-table">
        <thead>
          <tr>
            <th>Request ID</th>
            <th>Status</th>
            <th>Assigned At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {assignments.length > 0 ? (
            assignments.map((a) => (
              <tr key={a._id}>
                <td>{a.requestId}</td>
                <td>{a.status}</td>
                <td>{new Date(a.assignedAt).toLocaleString()}</td>
                <td>
                  <button onClick={() => handleDelete(a._id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No assignments found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AssignmentPage;
