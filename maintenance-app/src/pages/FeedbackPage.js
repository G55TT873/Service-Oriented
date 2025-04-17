import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FeedbackPage = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [formData, setFormData] = useState({
    requestId: '',
    userId: '',
    staffId: '',
    rating: 5,
    comment: '',
  });

  const [viewBy, setViewBy] = useState('request'); // 'request' or 'staff'
  const [viewId, setViewId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/feedback', formData);
      alert('Feedback submitted!');
      setFormData({ requestId: '', userId: '', staffId: '', rating: 5, comment: '' });
    } catch (err) {
      alert('Error submitting feedback');
    }
  };

  const handleView = async () => {
    if (!viewId) return;
    try {
      const url =
        viewBy === 'request'
          ? `http://localhost:4000/feedback/request/${viewId}`
          : `http://localhost:4000/feedback/staff/${viewId}`;
      const res = await axios.get(url);
      setFeedbacks(res.data);
    } catch (err) {
      alert('Error fetching feedback');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Submit Feedback</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Request ID"
          value={formData.requestId}
          onChange={(e) => setFormData({ ...formData, requestId: e.target.value })}
        /><br />
        <input
          type="text"
          placeholder="User ID"
          value={formData.userId}
          onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
        /><br />
        <input
          type="text"
          placeholder="Staff ID"
          value={formData.staffId}
          onChange={(e) => setFormData({ ...formData, staffId: e.target.value })}
        /><br />
        <input
          type="number"
          placeholder="Rating (1-5)"
          value={formData.rating}
          onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
        /><br />
        <textarea
          placeholder="Comment"
          value={formData.comment}
          onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
        /><br />
        <button type="submit">Submit Feedback</button>
      </form>

      <h2>View Feedback</h2>
      <div>
        <select value={viewBy} onChange={(e) => setViewBy(e.target.value)}>
          <option value="request">By Request ID</option>
          <option value="staff">By Staff ID</option>
        </select>
        <input
          type="text"
          placeholder={viewBy === 'request' ? 'Request ID' : 'Staff ID'}
          value={viewId}
          onChange={(e) => setViewId(e.target.value)}
        />
        <button onClick={handleView}>View</button>
      </div>

      <ul>
        {feedbacks.map((f) => (
          <li key={f._id}>
            <strong>Rating:</strong> {f.rating} - {f.comment} <br />
            <small>{new Date(f.createdAt).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeedbackPage;
