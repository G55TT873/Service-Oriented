import React, { useState, useEffect } from 'react';

export default function FeedbackPage() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [formData, setFormData] = useState({ requestId: '', staffId: '', comment: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/feedback/request/1`); // Replace 1 with actual request ID
        const data = await res.json();
        setFeedbacks(data);
      } catch (error) {
        setMessage('Error fetching feedback');
      }
    };

    fetchFeedbacks();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:4000/api/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setMessage('Feedback submitted successfully!');
        const data = await res.json();
        setFeedbacks([...feedbacks, data]);
      } else {
        setMessage('Failed to submit feedback');
      }
    } catch (error) {
      setMessage('Server error');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Feedback</h2>
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
        <textarea
          name="comment"
          placeholder="Your feedback"
          value={formData.comment}
          onChange={handleChange}
          required
          style={{ marginBottom: '10px' }}
        />
        <button type="submit">Submit Feedback</button>
      </form>

      {message && <p>{message}</p>}

      <ul>
        {feedbacks.map((feedback) => (
          <li key={feedback._id}>
            <p>Request ID: {feedback.requestId}</p>
            <p>Staff ID: {feedback.staffId}</p>
            <p>{feedback.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
