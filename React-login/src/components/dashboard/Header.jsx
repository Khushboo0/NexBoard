import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";

const Header = ({ onOpenSidebar, onLogout, userName, darkMode }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { toggleTheme } = useTheme();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.conatins(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header
      className={`relative z-10 flex-shrink-0 h-16 ${
        darkMode ? "bg-gray-800" : "bg-white"
      } shadow-sm flex`}
    >
      <button
        type="button"
        className="lg:hidden px-4 text-gray-500 dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
        onClick={onOpenSidebar}
      >
        <span className="sr-only">Open sidebar</span>
        <span className="text-xl">☰</span>
      </button>
      <div className="flex-1 flex justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex-1 flex items-center">
          <div className="text-xl font-semibold">
            Welcome, {userName || "User"}
          </div>
        </div>
        <div className="ml-4 flex items-center md:ml-6">
          {/* Theme toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className={`p-2 rounded-full ${
              darkMode
                ? "bg-gray-700 text-yellow-300"
                : "bg-gray-200 text-gray-700"
            } mr-3`}
            aria-label="Toggle dark mode"
          >
            {darkMode ? "🌙" : "☀️"}
          </button>
          <button
            type="button"
            className="p-1 rounded-full text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <span className="sr-only">View notifications</span>
            <span className="text-xl">🔔</span>
          </button>
          <div className="ml-3 relative" ref={dropdownRef}>
            <div>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="max-w-xs flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="user-menu"
                aria-expanded="false"
                aria-haspopup="true"
              >
                <span className="sr-only">Open user menu</span>
                <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                  {userName?.charAt(0) || "U"}
                </div>
              </button>
            </div>
            {dropdownOpen && (
              <div
                className={`origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 ${
                  darkMode ? "bg-gray-800" : "bg-white"
                } ring-1 ring-black ring-opacity-5`}
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu"
              >
                <Link
                  to="/dashboard/profile"
                  className={`block px-4 py-2 text-sm ${
                    darkMode
                      ? "text-gray-300 hover:bg-gray-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  role="menuitem"
                  onClick={() => setDropdownOpen(false)}
                >
                  Your Profile
                </Link>
                <Link
                  to="/dashboard/settings"
                  className={`block px-4 py-2 text-sm ${
                    darkMode
                      ? "text-gray-300 hover:bg-gray-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  role="menuitem"
                  onClick={() => setDropdownOpen(false)}
                >
                  Settings
                </Link>
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    onLogout();
                  }}
                  className={`w-full text-left block px-4 py-2 text-sm ${
                    darkMode
                      ? "text-gray-300 hover:bg-gray-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  role="menuitem"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
