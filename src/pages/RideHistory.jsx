import React, { useEffect, useState } from "react";

const RideHistory = () => {
  const [rideHistory, setRideHistory] = useState([]);
  const [error, setError] = useState("");

  const API_BASE = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchRideHistory = async () => {
      try {
        const res = await fetch(`${API_BASE}/ride/history`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch ride history.");
        }

        const data = await res.json();
        setRideHistory(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load ride history.");
      }
    };

    fetchRideHistory();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold mb-6 text-yellow-500">Ride History</h2>

      {error && <p className="text-red-600">{error}</p>}

      {rideHistory.length === 0 && !error ? (
        <p className="text-gray-600">You have no past rides.</p>
      ) : (
        <div className="space-y-6">
          {rideHistory.map((ride) => (
            <div
              key={ride.id}
              className="bg-white shadow-md rounded-xl p-5 border-l-4 border-yellow-400"
            >
              <p className="mb-1">
                <strong>Pickup:</strong> {ride.pickupLocation}
              </p>
              <p className="mb-1">
                <strong>Drop:</strong> {ride.dropLocation}
              </p>
              <p className="mb-1">
                <strong>Fare:</strong> ₹
                {ride.fare?.toFixed(2) || ride.estimatedFare?.toFixed(2)}
              </p>
              <p className="mb-1">
                <strong>Status:</strong>{" "}
                <span className="uppercase font-medium text-gray-700">
                  {ride.status}
                </span>
              </p>
              <p className="mb-1 text-sm text-gray-500">
                <strong>Date:</strong>{" "}
                {ride.createdAt
                  ? new Date(ride.createdAt).toLocaleString()
                  : "Not Available"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RideHistory;
