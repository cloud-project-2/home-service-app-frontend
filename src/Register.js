import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        const res = await fetch('http://localhost:3001/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
        });
        const data = await res.json();
        if (data.token) {
            localStorage.setItem('token', data.token);
            navigate('/book');
        } else {
            alert('Registration failed!');
        }
    };

    return (
        <form onSubmit={handleRegister}>
            <h2>Register</h2>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required /><br />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required /><br />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required /><br />
            <button type="submit">Register</button>
        </form>
    );
}
