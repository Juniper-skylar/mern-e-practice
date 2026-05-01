import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-400 mt-1">
          Manage system operations and data
        </p>
      </div>

      {/* STATS / WELCOME CARD */}
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 mb-8 shadow-xl">
        <h2 className="text-xl font-semibold">Welcome Admin 👋</h2>
        <p className="text-gray-400 text-sm mt-2">
          Use the quick actions below to manage cars, services, and service records.
        </p>
      </div>

      {/* ACTION CARDS */}
      <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>

      <div className="grid md:grid-cols-3 gap-5">

        {/* CARD 1 */}
        <Link
          to="/save-car"
          className="bg-white/10 border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition group"
        >
          <h4 className="text-lg font-semibold group-hover:text-indigo-400">
            Insert Car
          </h4>
          <p className="text-gray-400 text-sm mt-2">
            Add new vehicles to the system
          </p>
        </Link>

        {/* CARD 2 */}
        <Link
          to="/save-service"
          className="bg-white/10 border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition group"
        >
          <h4 className="text-lg font-semibold group-hover:text-indigo-400">
            Insert Service
          </h4>
          <p className="text-gray-400 text-sm mt-2">
            Create new service types
          </p>
        </Link>

        {/* CARD 3 */}
        <Link
          to="/save-service-record"
          className="bg-white/10 border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition group"
        >
          <h4 className="text-lg font-semibold group-hover:text-indigo-400">
            Service Records
          </h4>
          <p className="text-gray-400 text-sm mt-2">
            Manage all service history records
          </p>
        </Link>

      </div>

    </div>
  );
}

export default AdminDashboard;