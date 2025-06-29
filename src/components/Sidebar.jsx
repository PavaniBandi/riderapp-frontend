import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react"; // or use Heroicons if you prefer
// import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  if (!token || !user) return null;

  const isRider = user.role === "RIDER";
  const isDriver = user.role === "DRIVER";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <div className="fixed top-0 left-0 z-50 sm:hidden">
        <button
          onClick={() => setOpen(!open)}
          className="m-4 bg-yellow-400 p-2 rounded-lg shadow"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <aside
        className={`${
          open ? "block" : "hidden"
        } sm:block fixed top-0 left-0 h-full w-64 bg-yellow-400 text-black shadow-lg z-40 p-6 rounded-tr-3xl`}
      >
        <div className="flex flex-col gap-5 text-lg font-semibold mt-10">
          {isRider && (
            <>
              <Link to="/rider-dashboard" onClick={() => setOpen(false)}>
                Dashboard
              </Link>
              <Link to="/book" onClick={() => setOpen(false)}>
                Book Ride
              </Link>
              <Link to="/myrides" onClick={() => setOpen(false)}>
                My Rides
              </Link>
            </>
          )}
          {isDriver && (
            <>
              <Link to="/driver-dashboard" onClick={() => setOpen(false)}>
                Dashboard
              </Link>
              <Link to="/myrides" onClick={() => setOpen(false)}>
                Ride History
              </Link>
            </>
          )}
          <button onClick={handleLogout} className="text-left">
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
