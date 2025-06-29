import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import RiderDashboard from "./pages/RiderDashboard";
import DriverDashboard from "./pages/DriverDashboard";
import BookRide from "./pages/BookRide";
import RideHistory from "./pages/RideHistory";
import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";

function MainRoutes() {
  const location = useLocation();
  const showSidebar = !["/login", "/signup", "/"].includes(location.pathname);

  return (
    <div className="flex">
      {showSidebar && <Sidebar />}
      <div className={`flex-1 p-4 ${showSidebar ? "mt-12 sm:ml-64" : ""}`}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/rider-dashboard"
            element={
              <ProtectedRoute role="RIDER">
                <RiderDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/driver-dashboard"
            element={
              <ProtectedRoute role="DRIVER">
                <DriverDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/book"
            element={
              <ProtectedRoute role="RIDER">
                <BookRide />
              </ProtectedRoute>
            }
          />
          <Route
            path="/myrides"
            element={
              <ProtectedRoute>
                <RideHistory />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <MainRoutes />
    </Router>
  );
}

export default App;
