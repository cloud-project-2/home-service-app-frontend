import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Booking() {
    const [name, setName] = useState('');
    const [service, setService] = useState('');
    const [datetime, setDatetime] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) navigate('/login');
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const res = await fetch('http://BookingService-ALB-1975395896.us-east-1.elb.amazonaws.com/api/book', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ name, service, datetime }),
            });

            const data = await res.json();

            if (!res.ok) {
                setMessage(data.error || 'Booking failed');
            } else {
                setMessage(data.message);
                setName('');
                setService('');
                setDatetime('');
            }
        } catch (error) {
            setMessage('Something went wrong. Please try again later.');
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Book a Service</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required /><br />
                <input type="text" value={service} onChange={(e) => setService(e.target.value)} placeholder="Service" required /><br />
                <input type="datetime-local" value={datetime} onChange={(e) => setDatetime(e.target.value)} required /><br />
                <button type="submit">Book Now</button>
            </form>
            <p>{message}</p>
        </div>
    );
}
