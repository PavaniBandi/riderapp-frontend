import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import RiderDashboard from "./pages/RiderDashboard.jsx";
import DriverDashboard from "./pages/DriverDashboard.jsx";
import BookRide from "./pages/BookRide.jsx";
import RideHistory from "./pages/RideHistory.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { jwtDecode } from "jwt-decode";

function App() {
  const token = localStorage.getItem("token");
  let role = null;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      const roles = decoded.roles || [];
      if (roles.includes("ROLE_DRIVER")) role = "DRIVER";
      else if (roles.includes("ROLE_RIDER")) role = "RIDER";
    } catch (e) {
      console.error("Invalid token:", e);
    }
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              {role === "DRIVER" ? (
                <DriverDashboard />
              ) : role === "RIDER" ? (
                <RiderDashboard />
              ) : (
                <p className="p-4 text-red-600">Unauthorized Access</p>
              )}
            </ProtectedRoute>
          }
        />

        <Route
          path="/book"
          element={
            <ProtectedRoute>
              {role === "RIDER" ? (
                <BookRide />
              ) : (
                <p className="p-4 text-red-600">Only riders can book rides</p>
              )}
            </ProtectedRoute>
          }
        />

        <Route
          path="/rides"
          element={
            <ProtectedRoute>
              <RideHistory />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
