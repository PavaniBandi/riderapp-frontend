import React from "react";

const RiderDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-yellow-500">
        Welcome, {user?.username} 👋
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-xl p-6 border-l-4 border-yellow-400">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Your Role
          </h2>
          <p className="text-gray-600">{user?.role}</p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6 border-l-4 border-yellow-400">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Quick Actions
          </h2>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>Book a Ride</li>
            <li>View My Rides</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RiderDashboard;
