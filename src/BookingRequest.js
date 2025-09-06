import React, { useEffect, useState } from "react";

export default function BookingRequest() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const API_BASE = "https://1xxcc82bs9.execute-api.us-east-1.amazonaws.com/v1/api";

  const fetchBookings = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      
      if (!token) {
        setError("You are not logged in. Please login to view booking requests.");
        setLoading(false);
        return;
      }
      
      const response = await fetch('http://localhost:3001/api/bookings', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setBookings(data);
      } else {
        setError(data.msg || "Failed to load bookings");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
    
    // Check if user just completed a booking
    const justBooked = sessionStorage.getItem('justBooked');
    if (justBooked === 'true') {
      setShowSuccessMessage(true);
      sessionStorage.removeItem('justBooked');
      setTimeout(() => setShowSuccessMessage(false), 5000);
    }
  }, []);

  // Listen for booking updates
  useEffect(() => {
    const handleStorageChange = () => {
      fetchBookings();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const updateStatus = async (id, action) => {
    try {
      const token = localStorage.getItem("token");
      
      if (!token) {
        setError("You are not logged in. Please login to update booking status.");
        return;
      }
      
      const response = await fetch(`http://localhost:3001/api/bookings/${id}/${action}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Refresh bookings after successful update
        fetchBookings();
      } else {
        setError(data.msg || `Failed to ${action} booking`);
      }
    } catch (err) {
      setError(`Network error. Please try again.`);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-extrabold mb-6 bg-gradient-to-r from-blue-900 via-blue-700 to-blue-400 bg-clip-text text-transparent">Booking Requests</h1>

      {showSuccessMessage && (
        <div className="mb-4 p-4 rounded-xl border border-green-200 bg-green-50 text-green-700 shadow-lg">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="font-semibold">Booking submitted successfully! Your request has been added to the list below.</span>
          </div>
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 rounded border border-red-200 bg-red-50 text-red-700">{error}</div>
      )}

      <div className="overflow-x-auto bg-white/70 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-100">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-blue-900 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-blue-900 uppercase tracking-wider">Service</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-blue-900 uppercase tracking-wider">Date and Time</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-blue-900 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-blue-900 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-slate-500">Loading...</td>
              </tr>
            ) : bookings.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-slate-500">No bookings yet.</td>
              </tr>
            ) : (
              bookings.map((b) => (
                <tr key={b.id} className="hover:bg-slate-50/50">
                  <td className="px-6 py-4 whitespace-nowrap text-slate-800 font-medium">{b.userName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-700">{b.service}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-700">{b.datetime}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold shadow ${
                      b.status === "accepted"
                        ? "bg-green-100 text-green-700"
                        : b.status === "rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-amber-100 text-amber-700"
                    }`}>
                      {b.status || "pending"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-2">
                      <button
                        onClick={() => updateStatus(b.id, "accept")}
                        disabled={b.status === "accepted"}
                        className="px-3 py-1 rounded-lg bg-green-700 text-white text-sm font-semibold shadow hover:bg-green-800 disabled:opacity-50"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => updateStatus(b.id, "reject")}
                        disabled={b.status === "rejected"}
                        className="px-3 py-1 rounded-lg bg-red-700 text-white text-sm font-semibold shadow hover:bg-red-800 disabled:opacity-50"
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4">
        <button onClick={fetchBookings} className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold shadow hover:bg-blue-700">Refresh</button>
      </div>
    </div>
  );
}
