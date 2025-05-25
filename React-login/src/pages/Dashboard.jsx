import { useState, useEffect, lazy, Suspense } from "react";
import {
  Routes,
  Route,
  NavLink,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import Sidebar from "../components/dashboard/sidebar";
import Header from "../components/dashboard/Header";
import LoadingSpinner from "../components/common/LoadingSpinner";
import useWindowSize from "../hooks/useWindowSize";

// loading the dashboard component lazily

const Overview = lazy(() => import("../components/dashboard/Overview"));
const UserManagement = lazy(() =>
  import("../components/dashboard/UserManagement")
);
const Settings = lazy(() => import("../components/dashboard/Settings"));
const Profile = lazy(() => import("../components/dashboard/Profile"));

const Dashboard = () => {
  const { currentUser, logout } = useAuth();
  const { darkMode } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { width } = useWindowSize();
  const navigate = useNavigate();
  const location = useLocation();

  //closing sidebar in mobile and tabet devices
  useEffect(() => {
    if (width < 1024) {
      setSidebarOpen(false);
    }
  }, [location.pathname, width]);

  useEffect(() => {
    if (width >= 1024) {
      setSidebarOpen(true);
    } else {
      setSidebarOpen(false);
    }
  }, [width]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
};
return (
  <div
    className={`h-screen flex overflow-hidden ${
      darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
    }`}
  >
    <div
      className={`fixed inset-0 z-40 lg:hidden ${
        sidebarOpen ? "block" : "hidden"
      }`}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 bg-gray-600 bg-opacity-75 transition-opacity"
        onClick={() => setSidebarOpen(false)}
      ></div>
      <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white dark:bg-gray-800 transition transform">
        <Sidebar
          currentUser={currentUser}
          onCloseSidebar={() => setSidebarOpen(false)}
          darkMode={darkMode}
        />
      </div>
    </div>
    {/* Sidebar for desktop */}
    <div
      className={`hidden lg:flex lg:flex-shrink-0 transition-all duration-300 ease-in-out ${
        sidebarOpen ? "lg:w-64" : "lg:w-20"
      }`}
    >
      <div className="flex flex-col w-full">
        <Sidebar
          currentUser={currentUser}
          isCollapsed={!sidebarOpen}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          darkMode={darkMode}
        />
      </div>
    </div>
    {/* Main content */}
    <div className="flex flex-col w-0 flex-1 overflow-hidden">
      <Header
        onOpenSidebar={() => setSidebarOpen(true)}
        onLogout={handleLogout}
        userName={currentUser?.name}
        darkMode={darkMode}
      />
      <main className="flex-1 relative overflow-y-auto focus:outline-none">
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Overview />} />
              <Route path="/users" element={<UserManagement />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </Suspense>
        </div>
      </main>
    </div>
  </div>
);

export default Dashboard;