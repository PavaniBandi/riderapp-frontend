import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(
      "https://riderapp-backend-production.up.railway.app/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }
    );

    if (!res.ok) {
      const err = await res.text();
      alert(err);
      return;
    }

    const responseText = await res.text(); // e.g. "DRIVER:eyJ..."
    const [role, token] = responseText.split(":");

    localStorage.setItem("token", token);

    // ✅ Decode role from token to verify
    const decoded = jwtDecode(token);
    const roles = decoded.roles || [];

    // ✅ Redirect based on role
    if (roles.includes("ROLE_DRIVER")) {
      navigate("/dashboard");
      window.location.reload();
    } else if (roles.includes("ROLE_RIDER")) {
      navigate("/dashboard");
      window.location.reload();
    } else {
      alert("Unknown role");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          className="p-2 border rounded"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="p-2 border rounded"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button className="bg-green-500 text-white px-4 py-2 rounded">
          Login
        </button>
      </form>

      {/* ✅ Signup Link */}
      <p className="mt-4 text-sm text-center">
        Don't have an account?{" "}
        <Link to="/signup" className="text-blue-600 hover:underline">
          Sign up here
        </Link>
      </p>
    </div>
  );
}
