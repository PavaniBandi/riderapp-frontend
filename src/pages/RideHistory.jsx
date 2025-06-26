import { useEffect, useState } from "react";

export default function RideHistory() {
  const [rides, setRides] = useState([]);

  useEffect(() => {
    const fetchRides = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch(
        "https://riderapp-backend-production.up.railway.app/ride/history",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok) {
        const data = await res.json();
        setRides(data);
      } else {
        alert("Failed to fetch ride history");
      }
    };

    fetchRides();
    const interval = setInterval(fetchRides, 5000); // Real-time polling

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">My Ride History</h2>

      {rides.length === 0 ? (
        <p>No rides found.</p>
      ) : (
        <div className="space-y-4">
          {rides.map((ride) => (
            <div key={ride.id} className="p-4 border rounded shadow">
              <p>
                <strong>Pickup:</strong> {ride.pickupLocation}
              </p>
              <p>
                <strong>Drop:</strong> {ride.dropLocation}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span className="uppercase">{ride.status}</span>
              </p>
              <p>
                <strong>Fare:</strong> ₹{ride.estimatedFare.toFixed(2)}
              </p>
              <p>
                <strong>ETA:</strong> {ride.estimatedTime} mins
              </p>
              <p>
                <strong>Booked At:</strong>{" "}
                {ride.createdAt.replace("T", " ").slice(0, 19)}
              </p>

              {ride.driverUsername ? (
                <p>
                  <strong>Driver:</strong> {ride.driverUsername}
                </p>
              ) : (
                <p className="text-sm text-gray-500 italic">
                  Not yet accepted by any driver.
                </p>
              )}

              {ride.riderUsername && (
                <p>
                  <strong>Rider:</strong> {ride.riderUsername}
                </p>
              )}

              {ride.paymentMode && (
                <p>
                  <strong>Payment:</strong> {ride.paymentMode}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
