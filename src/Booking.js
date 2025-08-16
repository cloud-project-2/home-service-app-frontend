import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Booking() {
    const [name, setName] = useState("");
    const [service, setService] = useState("");
    const [datetime, setDatetime] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) navigate("/login");
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        try {
            const res = await fetch(
                "https://1xxcc82bs9.execute-api.us-east-1.amazonaws.com/v1/api/book",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ name, service, datetime }),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                setMessage(data.error || "Booking failed");
            } else {
                setMessage(data.message);
                setName("");
                setService("");
                setDatetime("");
            }
        } catch (error) {
            setMessage("Something went wrong. Please try again later.");
            console.error(error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[80vh] bg-gray-50">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
                <h1 className="text-2xl font-bold text-indigo-600 mb-6 text-center">
                    Book a Service
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your Name"
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />

                    <input
                        type="text"
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        placeholder="Service (e.g., Plumber)"
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />

                    <input
                        type="datetime-local"
                        value={datetime}
                        onChange={(e) => setDatetime(e.target.value)}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 rounded-lg shadow hover:bg-indigo-700 transition"
                    >
                        Book Now
                    </button>
                </form>

                {message && (
                    <p className="mt-4 text-center text-sm font-medium text-green-600">
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
}
