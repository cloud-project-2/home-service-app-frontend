import React, { useState } from 'react';

function App() {
  const [name, setName] = useState('');
  const [service, setService] = useState('');
  const [datetime, setDatetime] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:3001/api/book', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, service, datetime })
    });
    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <div>
      <h1>Home Service Booking</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Your Name" value={name} onChange={e => setName(e.target.value)} required /><br />
        <input type="text" placeholder="Service (e.g., Plumber)" value={service} onChange={e => setService(e.target.value)} required /><br />
        <input type="datetime-local" value={datetime} onChange={e => setDatetime(e.target.value)} required /><br />
        <button type="submit">Book Now</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default App;