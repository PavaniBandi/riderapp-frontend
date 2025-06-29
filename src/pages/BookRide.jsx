import React, { useState } from "react";

const BookRide = () => {
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [message, setMessage] = useState("");
  const API = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch(`${API}/ride/book`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          pickup: pickup,
          drop: drop, // ✅ updated field names
        }),
      });

      if (res.ok) {
        setMessage("✅ Ride booked successfully!");
        setPickup("");
        setDrop("");
      } else {
        const err = await res.text();
        setMessage(err || "Failed to book ride");
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md border-l-4 border-yellow-400">
        <h2 className="text-2xl font-bold mb-6 text-yellow-500">Book a Ride</h2>

        {message && (
          <p
            className={`mb-4 text-sm font-medium ${
              message.startsWith("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Pickup Location"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-400"
          />
          <input
            type="text"
            placeholder="Drop Location"
            value={drop}
            onChange={(e) => setDrop(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-400"
          />
          <button
            type="submit"
            className="w-full bg-yellow-400 text-black font-semibold py-2 rounded-lg hover:bg-yellow-300"
          >
            Book Ride
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookRide;
