// src/pages/AssignmentPage.js
import React, { useState, useEffect } from 'react';

const API_BASE = 'http://localhost:5000/assignments';

function AssignmentPage() {
  const [assignments, setAssignments] = useState([]);
  const [staffId, setStaffId] = useState('');
  const [requestId, setRequestId] = useState('');
  const [status, setStatus] = useState('');
  const [selectedId, setSelectedId] = useState('');

  const fetchAssignments = async () => {
    if (!staffId) return;
    const res = await fetch(`${API_BASE}/staff/${staffId}`);
    const data = await res.json();
    setAssignments(data);
  };

  const handleCreate = async () => {
    const res = await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ staffId, requestId }),
    });
    const data = await res.json();
    console.log('Created:', data);
    fetchAssignments();
  };

  const handleUpdate = async () => {
    const res = await fetch(`${API_BASE}/${selectedId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    const data = await res.json();
    console.log('Updated:', data);
    fetchAssignments();
  };

  const handleDelete = async (id) => {
    await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
    fetchAssignments();
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Assignment Management</h2>

      <div>
        <input
          placeholder="Staff ID"
          value={staffId}
          onChange={(e) => setStaffId(e.target.value)}
        />
        <button onClick={fetchAssignments}>Get Assignments</button>
      </div>

      <hr />

      <div>
        <h3>Create New Assignment</h3>
        <input
          placeholder="Request ID"
          value={requestId}
          onChange={(e) => setRequestId(e.target.value)}
        />
        <button onClick={handleCreate}>Assign</button>
      </div>

      <hr />

      <div>
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

      <hr />

      <h3>Assignments:</h3>
      {assignments.length === 0 ? (
        <p>No assignments found.</p>
      ) : (
        <ul>
          {assignments.map((a) => (
            <li key={a._id}>
              Request ID: {a.requestId}, Status: {a.status}, Assigned At:{' '}
              {new Date(a.assignedAt).toLocaleString()}
              <button onClick={() => handleDelete(a._id)} style={{ marginLeft: '10px' }}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AssignmentPage;
