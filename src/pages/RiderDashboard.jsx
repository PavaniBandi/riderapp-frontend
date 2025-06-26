import { useNavigate, Link } from "react-router-dom";

export default function RiderDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Welcome, Rider</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>

      <div className="mt-6 flex gap-4">
        <Link
          to="/book"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Book a Ride
        </Link>
        <Link
          to="/rides"
          className="inline-block bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          My Rides
        </Link>
      </div>
    </div>
  );
}
