import { useState } from "react";

export default function BookRide() {
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [ride, setRide] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const res = await fetch(
      "https://riderapp-backend-production.up.railway.app/ride/book",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ pickup, drop }),
      }
    );

    if (res.ok) {
      const data = await res.json();
      setRide(data);
    } else {
      alert("Booking failed");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Book a Ride</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          className="p-2 border rounded"
          placeholder="Pickup Location"
          value={pickup}
          onChange={(e) => setPickup(e.target.value)}
        />
        <input
          className="p-2 border rounded"
          placeholder="Drop Location"
          value={drop}
          onChange={(e) => setDrop(e.target.value)}
        />
        <button className="bg-blue-600 text-white py-2 rounded" type="submit">
          Book Ride
        </button>
      </form>

      {ride && (
        <div className="mt-4 border p-3 rounded shadow">
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
            <strong>Status:</strong> {ride.status}
          </p>
        </div>
      )}
    </div>
  );
}
