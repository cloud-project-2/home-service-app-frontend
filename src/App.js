import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Booking from './Booking';

function App() {
  const [name, setName] = useState('');
  const [service, setService] = useState('');
  const [datetime, setDatetime] = useState('');
  const [message, setMessage] = useState('');
  const [healthStatus, setHealthStatus] = useState('Checking backend health...');

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const res = await fetch('http://localhost:3005/health');
        if (res.ok) {
          setHealthStatus('Backend is healthy ✅');
        } else {
          setHealthStatus(`Backend health check failed with status ${res.status}`);
        }
      } catch (error) {
        setHealthStatus('Backend is unreachable ❌');
      }
    };

    checkHealth();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:3005/api/book', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, service, datetime }),
    });
    const data = await res.json();
    setMessage(data.message);
  };

  return (
      <div>
        <Router>
          <nav>
            <Link to="/register">Register</Link> |{' '}
            <Link to="/login">Login</Link> |{' '}
            <Link to="/book">Book</Link>
          </nav>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/book" element={<Booking />} />
          </Routes>
        </Router>
        <h1>Home Service Booking</h1>
        <p><strong>Backend Health:</strong> {healthStatus}</p>
        <form onSubmit={handleSubmit}>
          <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
          /><br />
          <input
              type="text"
              placeholder="Service (e.g., Plumber)"
              value={service}
              onChange={e => setService(e.target.value)}
              required
          /><br />
          <input
              type="datetime-local"
              value={datetime}
              onChange={e => setDatetime(e.target.value)}
              required
          /><br />
          <button type="submit">Book Now</button>
        </form>
        <p>{message}</p>
      </div>
  );
}

export default App;
