import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Booking from "./Booking";
import BookingRequest from "./BookingRequest";

// HomePage Component
function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
    setIsAuthenticated(!!(token && currentUser));
  }, []);

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-slate-50">
      <div className="text-center max-w-4xl mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-blue-900 via-blue-700 to-blue-400 bg-clip-text text-transparent mb-6">
            Welcome to Home Service
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 mb-8 leading-relaxed">
            Professional home services at your fingertips. Book reliable, trusted professionals for all your home needs.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-slate-200/50 hover:bg-white/90 transition-all duration-300 hover:scale-105" style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.6) 100%)',
            backdropFilter: 'blur(16px) saturate(120%)',
            WebkitBackdropFilter: 'blur(16px) saturate(120%)'
          }}>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 mx-auto backdrop-blur-sm border border-blue-200">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">Easy Booking</h3>
            <p className="text-slate-600">Simple and quick booking process for all your home service needs.</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-slate-200/50 hover:bg-white/90 transition-all duration-300 hover:scale-105" style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.6) 100%)',
            backdropFilter: 'blur(16px) saturate(120%)',
            WebkitBackdropFilter: 'blur(16px) saturate(120%)'
          }}>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 mx-auto backdrop-blur-sm border border-green-200">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">Trusted Professionals</h3>
            <p className="text-slate-600">Vetted and experienced professionals for quality service delivery.</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-slate-200/50 hover:bg-white/90 transition-all duration-300 hover:scale-105" style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.6) 100%)',
            backdropFilter: 'blur(16px) saturate(120%)',
            WebkitBackdropFilter: 'blur(16px) saturate(120%)'
          }}>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 mx-auto backdrop-blur-sm border border-purple-200">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">Fast Service</h3>
            <p className="text-slate-600">Quick response times and efficient service completion.</p>
          </div>
              </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {!isAuthenticated ? (
            <>
                <Link
                  to="/register"
                className="px-8 py-3 rounded-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 text-lg backdrop-blur-sm border border-white/30 hover:shadow-xl hover:scale-105"
                >
                Get Started
                </Link>
                <Link
                  to="/login"
                className="px-8 py-3 rounded-2xl font-semibold border-2 border-blue-600 text-blue-600 hover:bg-blue-50 transition-all duration-300 text-lg backdrop-blur-sm hover:shadow-lg hover:scale-105"
              >
                Sign In
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/book"
                className="px-8 py-3 rounded-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 text-lg backdrop-blur-sm border border-white/30 hover:shadow-xl hover:scale-105"
              >
                Book a Service
                </Link>
                <Link
                  to="/requests"
                className="px-8 py-3 rounded-2xl font-semibold border-2 border-blue-600 text-blue-600 hover:bg-blue-50 transition-all duration-300 text-lg backdrop-blur-sm hover:shadow-lg hover:scale-105"
              >
                View My Requests
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      
      if (token) {
        try {
          // Verify token with backend
          const response = await fetch('http://localhost:3001/api/protected', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          if (response.ok) {
            const data = await response.json();
            setIsAuthenticated(true);
            setUser(data.user);
          } else {
            // Token is invalid, clear it
            localStorage.removeItem("token");
            localStorage.removeItem("currentUser");
            setIsAuthenticated(false);
            setUser(null);
          }
        } catch (err) {
          // Network error, keep current state
          const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
          if (currentUser) {
            setIsAuthenticated(true);
            setUser(currentUser);
          }
        }
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    };

    // Check auth on mount
    checkAuth();

    // Listen for auth changes
    const handleAuthChange = () => {
      checkAuth();
    };

    window.addEventListener('storage', handleAuthChange);
    window.addEventListener('authChange', handleAuthChange);

    return () => {
      window.removeEventListener('storage', handleAuthChange);
      window.removeEventListener('authChange', handleAuthChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    setIsAuthenticated(false);
    setUser(null);
    setIsMobileMenuOpen(false);
    
    // Dispatch custom event to update auth state
    window.dispatchEvent(new Event('authChange'));
    
    // Navigate to home page
    window.location.href = '/';
  };
  return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50">
        <Router>
                    {/* Enhanced Navbar with Light Glassmorphism */}
          <nav className="bg-white/70 backdrop-blur-xl border-b border-slate-200/50 shadow-lg sticky top-0 z-50" style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.6) 100%)',
            backdropFilter: 'blur(16px) saturate(120%)',
            WebkitBackdropFilter: 'blur(16px) saturate(120%)',
            boxShadow: '0 4px 24px 0 rgba(0, 0, 0, 0.08)'
          }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                {/* Enhanced Logo */}
                <div className="flex items-center">
                  <Link to="/" className="flex items-center gap-3 group">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" className="text-white drop-shadow-sm">
                          <path d="M12 3L2 9l10 6 10-6-10-6zm0 6.75L4.21 9 12 13.5 19.79 9 12 9.75zm0 2.25l-7.79-4.5V17a2 2 0 002 2h11.58a2 2 0 002-2V7.5L12 12z" fill="currentColor"/>
                        </svg>
                      </div>
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
                    </div>
                    <div className="hidden sm:block">
                      <h1 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                        Home Service
                      </h1>
                      <p className="text-xs text-slate-500 -mt-1">Professional & Reliable</p>
                    </div>
                  </Link>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center gap-1">
                  {/* Primary Actions */}
                  <div className="flex items-center gap-2 mr-6">
                    <Link
                      to="/book"
                      className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl shadow-md hover:from-blue-700 hover:to-blue-800 transition-all duration-200 hover:shadow-lg hover:scale-105 flex items-center gap-2 backdrop-blur-sm border border-white/30"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Book Now
                </Link>
                    <Link
                      to="/requests"
                      className="px-4 py-2.5 text-slate-700 font-medium rounded-xl hover:bg-slate-100/80 transition-all duration-200 flex items-center gap-2 backdrop-blur-sm border border-slate-200/50 hover:border-slate-300"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      {isAuthenticated ? "My Requests" : "Requests"}
                    </Link>
                  </div>

                  {/* Authentication Section */}
                  {isAuthenticated && (
                    <div className="flex items-center gap-3">
                                              <div className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 backdrop-blur-sm">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium text-green-800">
                          {user?.email ? user.email.split('@')[0] : 'User'}
                        </span>
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                                              <button
                          onClick={handleLogout}
                          className="px-3 py-2.5 text-red-600 font-medium rounded-xl hover:bg-red-50 transition-all duration-200 flex items-center gap-2 backdrop-blur-sm border border-slate-200/50 hover:border-red-200"
                        >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                      </button>
                    </div>
                  )}
                </div>

                {/* Mobile menu button */}
                <div className="lg:hidden">
                  <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {isMobileMenuOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      )}
                    </svg>
                  </button>
                </div>
              </div>

              {/* Enhanced Mobile Navigation with Light Glassmorphism */}
              {isMobileMenuOpen && (
                <div className="lg:hidden border-t border-slate-200/50 bg-white/80 backdrop-blur-xl" style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.6) 100%)',
                  backdropFilter: 'blur(16px) saturate(120%)',
                  WebkitBackdropFilter: 'blur(16px) saturate(120%)'
                }}>
                  <div className="px-4 py-6 space-y-4">
                    {/* Primary Actions */}
                    <div className="space-y-3">
                <Link
                  to="/book"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl shadow-md backdrop-blur-sm border border-white/30"
                >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                  Book Now
                </Link>
                                              <Link
                          to="/requests"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 text-slate-700 font-medium rounded-xl hover:bg-slate-100/80 transition-all duration-200 backdrop-blur-sm border border-slate-200/50"
                        >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        {isAuthenticated ? "My Requests" : "Requests"}
                      </Link>
                    </div>

                    {/* Authentication Section */}
                    {isAuthenticated && (
                      <div className="space-y-3 pt-4 border-t border-slate-200">
                        <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 backdrop-blur-sm">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-sm font-medium text-green-800">
                            {user?.email ? user.email.split('@')[0] : 'User'}
                          </span>
                          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <button
                          onClick={() => {
                            handleLogout();
                            setIsMobileMenuOpen(false);
                          }}
                          className="flex items-center gap-3 px-4 py-3 text-red-600 font-medium rounded-xl hover:bg-red-50 transition-all duration-200 w-full text-left backdrop-blur-sm border border-slate-200/50"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          Logout
                        </button>
                      </div>
                    )}
              </div>
                </div>
              )}
            </div>
          </nav>

          {/* Routes */}
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/book" element={<Booking />} />
              <Route path="/requests" element={<BookingRequest />} />
            </Routes>
          </div>
        </Router>
      </div>
  );
}

export default App;
