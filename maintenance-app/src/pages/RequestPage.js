import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RequestPage = () => {
  const [form, setForm] = useState({
    userId: '',
    title: '',
    description: '',
    imageUrl: '',
    status: 'Pending',
  });

  const [userIdSearch, setUserIdSearch] = useState('');
  const [requests, setRequests] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post('http://localhost:5001/api/requests', form);
      alert('Request created!');
      setForm({ userId: '', title: '', description: '', imageUrl: '', status: 'Pending' });
      setUserIdSearch(form.userId);
    } catch (err) {
      console.error(err);
      alert('Failed to create request');
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`http://localhost:5001/api/requests/user/${userIdSearch}`);
      setRequests(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteRequest = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/requests/${id}`);
      setRequests(requests.filter(r => r._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (userIdSearch) fetchRequests();
  }, [userIdSearch]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Create New Request</h2>
      <input placeholder="User ID" name="userId" value={form.userId} onChange={handleChange} />
      <input placeholder="Title" name="title" value={form.title} onChange={handleChange} />
      <input placeholder="Description" name="description" value={form.description} onChange={handleChange} />
      <input placeholder="Image URL" name="imageUrl" value={form.imageUrl} onChange={handleChange} />
      <select name="status" value={form.status} onChange={handleChange}>
        <option>Pending</option>
        <option>In Progress</option>
        <option>Resolved</option>
      </select>
      <button onClick={handleSubmit}>Create Request</button>

      <hr />

      <h2>Get Requests by User</h2>
      <input placeholder="Enter User ID" value={userIdSearch} onChange={(e) => setUserIdSearch(e.target.value)} />
      <button onClick={fetchRequests}>Fetch</button>

      <table border="1" cellPadding="10" style={{ marginTop: '20px', width: '100%' }}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Description</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map(req => (
            <tr key={req._id}>
              <td>{req.title}</td>
              <td>{req.status}</td>
              <td>{req.description}</td>
              <td>
                {req.imageUrl ? (
                  <img src={req.imageUrl} alt="img" width="50" />
                ) : 'N/A'}
              </td>
              <td>
                <button onClick={() => deleteRequest(req._id)}>Delete</button>
                {/* Edit will be added in admin dashboard later */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestPage;
