import React, { useState, useEffect } from 'react';

export default function RequestPage() {
  const [requests, setRequests] = useState([]);
  const [formData, setFormData] = useState({ title: '', description: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch existing requests by user
    const fetchRequests = async () => {
      try {
        const res = await fetch(`http://localhost:5001/api/requests/user/1`); // Replace 1 with actual user ID
        const data = await res.json();
        setRequests(data);
      } catch (error) {
        setMessage('Error fetching requests');
      }
    };

    fetchRequests();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5001/api/requests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setMessage('Request created successfully!');
        const data = await res.json();
        setRequests([...requests, data]);
      } else {
        setMessage('Failed to create request');
      }
    } catch (error) {
      setMessage('Server error');
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5001/api/requests/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setRequests(requests.filter((request) => request._id !== id));
        setMessage('Request deleted');
      } else {
        setMessage('Failed to delete request');
      }
    } catch (error) {
      setMessage('Server error');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Requests</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
          style={{ marginBottom: '10px' }}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
          style={{ marginBottom: '10px' }}
        />
        <button type="submit">Create Request</button>
      </form>

      {message && <p>{message}</p>}

      <ul>
        {requests.map((request) => (
          <li key={request._id}>
            <h3>{request.title}</h3>
            <p>{request.description}</p>
            <button onClick={() => handleDelete(request._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
