import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Booking from "./Booking";

function App() {
  return (
      <div className="min-h-screen bg-gray-50">
        <Router>
          {/* Navbar */}
          <nav className="bg-white shadow-md">
            <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
              <h1 className="text-2xl font-bold text-indigo-600">Home Service</h1>
              <div className="space-x-6">
                <Link
                    to="/register"
                    className="text-gray-700 hover:text-indigo-600 transition font-medium"
                >
                  Register
                </Link>
                <Link
                    to="/login"
                    className="text-gray-700 hover:text-indigo-600 transition font-medium"
                >
                  Login
                </Link>
                <Link
                    to="/book"
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 transition"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </nav>

          {/* Routes */}
          <div className="max-w-6xl mx-auto px-6 py-8">
            <Routes>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/book" element={<Booking />} />
            </Routes>
          </div>
        </Router>
      </div>
  );
}

export default App;
