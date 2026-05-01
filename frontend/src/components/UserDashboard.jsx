import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function UserDashboard() {
  const navigate = useNavigate();

  // ✅ SAFE USER LOADING
  let user = null;

  try {
    const stored = localStorage.getItem("auth");
    user = stored ? JSON.parse(stored)?.user : null;
  } catch (error) {
    user = null;
  }

  // 🔐 PROTECT ROUTE
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">
            Welcome, {user?.username || "User"} 👋
          </h1>
          <p className="text-gray-400">
            Here is your dashboard overview
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition"
        >
          Logout
        </button>
      </div>

      {/* PROFILE CARD */}
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 mb-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">My Profile</h2>

        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-gray-400">Username</p>
            <p className="font-semibold">{user?.username}</p>
          </div>

          <div>
            <p className="text-gray-400">Email</p>
            <p className="font-semibold">{user?.email}</p>
          </div>

          <div>
            <p className="text-gray-400">Role</p>
            <p className="font-semibold">{user?.role}</p>
          </div>
        </div>
      </div>

      {/* STATS CARDS */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">

        <div className="bg-white/10 border border-white/20 rounded-2xl p-5">
          <p className="text-gray-400 text-sm">Total Services</p>
          <h3 className="text-2xl font-bold">12</h3>
        </div>

        <div className="bg-white/10 border border-white/20 rounded-2xl p-5">
          <p className="text-gray-400 text-sm">Last Service</p>
          <h3 className="text-2xl font-bold">2026-04-20</h3>
        </div>

        <div className="bg-white/10 border border-white/20 rounded-2xl p-5">
          <p className="text-gray-400 text-sm">Pending Requests</p>
          <h3 className="text-2xl font-bold text-yellow-400">2</h3>
        </div>

      </div>

      {/* QUICK ACTIONS */}
      <div className="flex gap-3 mb-6">
        <button className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-xl transition">
          View Services
        </button>

        <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-xl transition">
          New Request
        </button>
      </div>

      {/* RECENT SERVICES */}
      <div className="bg-white/10 border border-white/20 rounded-2xl overflow-hidden shadow-lg">

        <div className="p-4 border-b border-white/10">
          <h2 className="font-semibold">Recent Services</h2>
        </div>

        <table className="w-full text-sm">
          <thead className="text-gray-400 bg-white/5">
            <tr>
              <th className="p-3 text-left">Record</th>
              <th className="p-3 text-left">Service</th>
              <th className="p-3 text-left">Date</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-t border-white/10 hover:bg-white/5">
              <td className="p-3">SR-001</td>
              <td className="p-3">Oil Change</td>
              <td className="p-3">2026-04-20</td>
            </tr>

            <tr className="border-t border-white/10 hover:bg-white/5">
              <td className="p-3">SR-002</td>
              <td className="p-3">Brake Check</td>
              <td className="p-3">2026-03-15</td>
            </tr>
          </tbody>
        </table>

      </div>
    </div>
  );
}