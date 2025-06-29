import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DriverDashboard() {
  const [rides, setRides] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const API_BASE = import.meta.env.VITE_API_URL;

  const fetchAvailableRides = async () => {
    try {
      const res = await fetch(`${API_BASE}/ride/driver/dashboard`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 403) {
        setError("You are not authorized to view this page.");
        return;
      }

      const data = await res.json();
      setRides(data);
    } catch (err) {
      setError("Failed to fetch rides.");
      console.error(err);
    }
  };

  const handleAccept = async (rideId) => {
    try {
      const res = await fetch(`${API_BASE}/ride/accept/${rideId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        alert("Ride accepted!");
        fetchAvailableRides();
      } else {
        alert("Failed to accept ride.");
      }
    } catch (err) {
      alert("Error accepting ride.");
      console.error(err);
    }
  };

  const handleStatusUpdate = async (rideId, status) => {
    try {
      let url = `${API_BASE}/ride/ride/${rideId}/status?status=${status}`;

      if (status === "COMPLETED") {
        const paymentMode = window.prompt("Enter payment mode (Cash/Online):");
        if (!paymentMode) return alert("Payment mode is required");
        url += `&payment=${paymentMode}`;
      }

      const res = await fetch(url, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        alert(`Ride marked as ${status}`);
        fetchAvailableRides();
      } else {
        alert("Failed to update status.");
      }
    } catch (err) {
      alert("Error updating ride status.");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAvailableRides();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold mb-6 text-yellow-500">
        Welcome, Driver
      </h2>

      <button
        onClick={() => navigate("/myrides")}
        className="mb-6 bg-yellow-400 text-black font-semibold px-5 py-2 rounded-lg hover:bg-yellow-300"
      >
        My Rides
      </button>

      {error && <p className="text-red-600">{error}</p>}

      {rides.length === 0 && !error ? (
        <p className="text-gray-600">No available ride requests right now.</p>
      ) : (
        <div className="space-y-6">
          {rides.map((ride) => (
            <div
              key={ride.id}
              className="border-l-4 border-yellow-400 bg-white shadow-md rounded-xl p-5 flex justify-between items-start"
            >
              <div>
                <p className="mb-1">
                  <strong>Pickup:</strong> {ride.pickupLocation}
                </p>
                <p className="mb-1">
                  <strong>Drop:</strong> {ride.dropLocation}
                </p>
                <p className="mb-1">
                  <strong>Fare:</strong> ₹{ride.estimatedFare.toFixed(2)}
                </p>
                <p className="mb-1">
                  <strong>ETA:</strong> {ride.estimatedTime} mins
                </p>
                <p className="mb-1">
                  <strong>Status:</strong>{" "}
                  <span className="uppercase font-medium text-gray-700">
                    {ride.status}
                  </span>
                </p>
              </div>

              <div className="flex flex-col gap-2">
                {ride.status === "REQUESTED" && (
                  <button
                    onClick={() => handleAccept(ride.id)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                  >
                    Accept
                  </button>
                )}

                {ride.status === "ACCEPTED" && (
                  <button
                    onClick={() => handleStatusUpdate(ride.id, "PICKED")}
                    className="bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-400"
                  >
                    Mark as Picked
                  </button>
                )}

                {ride.status === "PICKED" && (
                  <button
                    onClick={() => handleStatusUpdate(ride.id, "COMPLETED")}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Complete & Collect
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
