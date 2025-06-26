import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DriverDashboard() {
  const [rides, setRides] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchAvailableRides = async () => {
    try {
      const res = await fetch(
        "https://riderapp-backend-production.up.railway.app/ride/driver/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

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
      const res = await fetch(
        `https://riderapp-backend-production.up.railway.app/ride/accept/${rideId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

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
      let url = `https://riderapp-backend-production.up.railway.app/ride/ride/${rideId}/status?status=${status}`;

      // Ask payment mode if status is COMPLETED
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
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Welcome, Driver</h2>

      <button
        onClick={() => navigate("/rides")}
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        My Rides
      </button>

      {error && <p className="text-red-600">{error}</p>}

      {rides.length === 0 && !error ? (
        <p>No available ride requests right now.</p>
      ) : (
        <div className="space-y-4">
          {rides.map((ride) => (
            <div
              key={ride.id}
              className="border p-4 rounded shadow flex justify-between items-center"
            >
              <div>
                <p>
                  <strong>Pickup:</strong> {ride.pickupLocation}
                </p>
                <p>
                  <strong>Drop:</strong> {ride.dropLocation}
                </p>
                <p>
                  <strong>Fare:</strong> ₹{ride.estimatedFare.toFixed(2)}
                </p>
                <p>
                  <strong>ETA:</strong> {ride.estimatedTime} mins
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className="uppercase">{ride.status}</span>
                </p>
              </div>

              <div className="flex flex-col gap-2">
                {ride.status === "REQUESTED" && (
                  <button
                    onClick={() => handleAccept(ride.id)}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Accept
                  </button>
                )}

                {ride.status === "ACCEPTED" && (
                  <button
                    onClick={() => handleStatusUpdate(ride.id, "PICKED")}
                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                  >
                    Picked
                  </button>
                )}

                {ride.status === "PICKED" && (
                  <button
                    onClick={() => handleStatusUpdate(ride.id, "COMPLETED")}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Complete & Pay
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
