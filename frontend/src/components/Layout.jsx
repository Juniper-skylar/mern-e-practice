import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg hidden md:block">
        <div className="p-6 text-xl font-bold text-indigo-600">
          CRPMS
        </div>

        <nav className="flex flex-col gap-2 p-4">
          <Link className="p-2 rounded hover:bg-indigo-50" to="/admin-dashboard">
            Dashboard
          </Link>
          <Link className="p-2 rounded hover:bg-indigo-50" to="/save-car">
            Cars
          </Link>
          <Link className="p-2 rounded hover:bg-indigo-50" to="/save-service">
            Services
          </Link>
          <Link className="p-2 rounded hover:bg-indigo-50" to="/manage-service-record">
            Service Records
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        
        {/* Topbar */}
        <header className="h-16 bg-white shadow flex items-center px-6 justify-between">
          <h1 className="font-semibold text-gray-700">Dashboard</h1>

          <div className="flex gap-3">
            <button className="px-4 py-1 rounded bg-indigo-600 text-white hover:bg-indigo-700">
              Profile
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;