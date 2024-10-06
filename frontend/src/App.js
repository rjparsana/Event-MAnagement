import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login';  // Assuming you have a Login component
import Register from './pages/Register';  // Assuming you have a Register component
import EventList from './components/EventList';  // Assuming this is your events list
import EventForm from './components/EventForm';  // Add event form

// Protecting the Events Page
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');  // Check if the user is logged in
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Route to Login Page */}
        <Route path="/login" element={<Login />} />
        {/* Route to Register Page */}
        <Route path="/register" element={<Register />} />
        {/* Protected Route for Events Page */}
        <Route
          path="/events"
          element={
            <PrivateRoute>
              <EventList />
            </PrivateRoute>
          }
        />
        {/* Route for Add Event Page */}
        <Route
          path="/create-event"
          element={
            <PrivateRoute>
              <EventForm />
            </PrivateRoute>
          }
        />
        {/* Redirect to Login Page if no other route matches */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
