// src/pages/Dashboard.jsx
import { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import Sidebar from "../components/dashboard/Sidebar";
import Header from "../components/dashboard/Header";
import useWindowSize from "../hooks/useWindowSize";
import LoadingSpinner from "../components/common/LoadingSpinner";

const Dashboard = () => {
  const { currentUser, logout } = useAuth();
  const { darkMode } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { width } = useWindowSize();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (width < 1024) {
      setSidebarOpen(false);
      console.log("this one is for mobile");
    }
  }, [location.pathname, width]);

  useEffect(() => {
    if (width >= 1024) {
      setSidebarOpen(true);
      console.log("this one is active");
    } else {
      if(width){
        setSidebarOpen(false);
        console.log("this one is mobile", width);
      }
    }
  }, [width]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
   
      <div
        className={`h-screen flex overflow-hidden ${
          darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
        }`}
      >
        {/* Sidebar for mobile */}
        <div
          className={`fixed inset-0 z-40 lg:hidden ${
          (sidebarOpen && width < 1024) ? "block" : "hidden"
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
          className={`lg:flex lg:flex-shrink-0 transition-all duration-300 ease-in-out ${
            sidebarOpen ? "lg:w-64" : "lg:w-20"
          } ${
            (width > 1023) ? "" : "hidden"
          }`}
        >
          <Sidebar
            currentUser={currentUser}
            isCollapsed={!sidebarOpen}
            onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
            darkMode={darkMode}
          />
        </div>

        {/* Main content */}
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header
            onOpenSidebar={() => setSidebarOpen(true)}
            onLogout={handleLogout}
            userName={currentUser?.name}
            darkMode={darkMode}
          />
          <main className="flex-1 relative overflow-y-auto focus:outline-none">
            <div className="px-4 sm:px-6 lg:px-8 py-6">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
