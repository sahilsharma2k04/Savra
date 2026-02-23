import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const Layout = ({ children }) => {
  const { logout } = useAuth();
  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-64 p-4 hidden md:block">
        <div className="h-full bg-gradient-to-b from-purple-100 to-purple-50 rounded-3xl p-6 flex flex-col justify-between shadow-sm">

          {/* Top Section */}
          <div>
            <h2 className="text-2xl font-bold text-purple-700 mb-10">
              SAVRA
            </h2>

            <nav className="space-y-3 text-gray-700">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-xl transition-all ${isActive
                    ? "bg-white shadow-sm text-purple-600 font-semibold"
                    : "hover:bg-white/60"
                  }`
                }
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/teachers"
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-xl transition-all ${isActive
                    ? "bg-white shadow-sm text-purple-600 font-semibold"
                    : "hover:bg-white/60"
                  }`
                }
              >
                Teachers
              </NavLink>

              <NavLink
                to="/classrooms"
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-xl transition-all ${isActive
                    ? "bg-white shadow-sm text-purple-600 font-semibold"
                    : "hover:bg-white/60"
                  }`
                }
              >
                Classrooms
              </NavLink>

              <NavLink
                to="/reports"
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-xl transition-all ${isActive
                    ? "bg-white shadow-sm text-purple-600 font-semibold"
                    : "hover:bg-white/60"
                  }`
                }
              >
                Reports
              </NavLink>
            </nav>
          </div>

          {/* Bottom User Section */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-200 flex items-center justify-center font-semibold text-purple-700">
                A
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">
                  Admin
                </p>
                <p className="text-xs text-gray-500">
                  School Admin
                </p>
              </div>
            </div>

            <button
              onClick={logout}
              className="mt-4 w-full text-sm text-red-500 hover:text-red-600 transition"
            >
              Logout
            </button>
          </div>

        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {children}
      </div>
    </div>
  );
};

export default Layout;