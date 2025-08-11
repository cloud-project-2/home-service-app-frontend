import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const res = await fetch('http://localhost:3001/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        // After receiving token from backend

        const data = await res.json();
        if (data.token) {
            localStorage.setItem('token', data.token);
            navigate('/book');
        } else {
            alert('Login failed!');
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <h2>Login</h2>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required /><br />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required /><br />
            <button type="submit">Login</button>
        </form>
    );
}
