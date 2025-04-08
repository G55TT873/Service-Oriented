import React, { useState } from 'react';

export default function LoginPage() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'user', // default role
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isRegistering ? 'register' : 'login';

    try {
      const res = await fetch(`http://localhost:5001/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage(isRegistering ? 'Registered successfully!' : 'Logged in!');
        console.log('User data:', data); // you can store token or ID if needed
      } else {
        setMessage(data.error || 'Something went wrong');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Server error');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>{isRegistering ? 'Register' : 'Login'}</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: '300px' }}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
          style={{ display: 'block', marginBottom: '10px', width: '100%' }}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
          style={{ display: 'block', marginBottom: '10px', width: '100%' }}
        />
        {isRegistering && (
          <select name="role" onChange={handleChange} style={{ marginBottom: '10px', width: '100%' }}>
            <option value="user">User</option>
            <option value="staff">Staff</option>
          </select>
        )}
        <button type="submit" style={{ width: '100%' }}>
          {isRegistering ? 'Register' : 'Login'}
        </button>
      </form>
      <p>{message}</p>
      <p>
        {isRegistering ? 'Already have an account?' : 'Need an account?'}{' '}
        <button onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering ? 'Login' : 'Register'}
        </button>
      </p>
    </div>
  );
}
