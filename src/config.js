// Configuration for the Home Service Application
export const APP_CONFIG = {
  // Base URL for the application
  BASE_URL: process.env.NODE_ENV === 'production' 
    ? 'http://bookingservice-alb-1975395896.us-east-1.elb.amazonaws.com'
    : 'http://localhost:3000',
  
  // Application name
  APP_NAME: 'Home Service Booking',
  
  // Version
  VERSION: '1.0.0',
  
  // Demo URL for screen recording
  DEMO_URL: 'http://bookingservice-alb-1975395896.us-east-1.elb.amazonaws.com'
};

// API endpoints
export const API_ENDPOINTS = {
  BASE: 'http://localhost:3001',
  AUTH: {
    LOGIN: '/api/login',
    REGISTER: '/api/register'
  },
  BOOKINGS: {
    CREATE: '/api/bookings',
    LIST: '/api/bookings',
    UPDATE: (id, action) => `/api/bookings/${id}/${action}`
  },
  PROTECTED: '/api/protected'
};
