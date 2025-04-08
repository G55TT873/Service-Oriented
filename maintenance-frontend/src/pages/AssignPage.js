import React, { useState, useEffect } from 'react';

export default function AssignPage() {
  const [assignments, setAssignments] = useState([]);
  const [formData, setFormData] = useState({ requestId: '', staffId: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/assignments/staff/1`); // Replace 1 with actual staff ID
        const data = await res.json();
        setAssignments(data);
      } catch (error) {
        setMessage('Error fetching assignments');
      }
    };

    fetchAssignments();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:4000/api/assignments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setMessage('Staff assigned successfully!');
        const data = await res.json();
        setAssignments([...assignments, data]);
      } else {
        setMessage('Failed to assign staff');
      }
    } catch (error) {
      setMessage('Server error');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Assignments</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          name="requestId"
          placeholder="Request ID"
          value={formData.requestId}
          onChange={handleChange}
          required
          style={{ marginBottom: '10px' }}
        />
        <input
          type="text"
          name="staffId"
          placeholder="Staff ID"
          value={formData.staffId}
          onChange={handleChange}
          required
          style={{ marginBottom: '10px' }}
        />
        <button type="submit">Assign Staff</button>
      </form>

      {message && <p>{message}</p>}

      <ul>
        {assignments.map((assignment) => (
          <li key={assignment._id}>
            <p>Request ID: {assignment.requestId}</p>
            <p>Staff ID: {assignment.staffId}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
