import { useTheme } from "../../contexts/ThemeContext";
import { NavLink } from "react-router-dom";

const HomeIcon = () => <span>🏠</span>;
const UsersIcon = () => <span>👥</span>;
const SettingsIcon = () => <span>⚙️</span>;
const ProfileIcon = () => <span>👤</span>;

const Sidebar = ({
  currentUser,
  isCollapsed = false,
  onToggleSidebar,
  onCloseSidebar,
  darkMode,
}) => {
  const menuItems = [
    { name: "Dashboard", to: "/dashboard", icon: <HomeIcon /> },
    { name: "Users", to: "/dashboard/users", icon: <UsersIcon /> },
    { name: "Settings", to: "/dashboard/settings", icon: <SettingsIcon /> },
    { name: "Profile", to: "/dashboard/profile", icon: <ProfileIcon /> },
  ];

  return (
    <div
      className={`h-screen flex flex-col ${
        darkMode ? "bg-gray-800" : "bg-white"
      } border-r ${darkMode ? "border-gray-700" : "border-gray-200"}`}
    >
      <div className="h-16 flex items-center justify-between px-4">
        <div className="flex items-center">
          {/* <img className="h-8 w-auto" src="/logo.svg" alt="Company Logo" /> */}
          {!isCollapsed && (
            <span className="ml-2 text-lg font-semibold">Admin Panel</span>
          )}
        </div>
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <span>{isCollapsed ? '▶' : '◀'}</span>
          </button>
        )}
        {onCloseSidebar && (
          <button
            onClick={onCloseSidebar}
            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <span>✖</span>
          </button>
        )}
      </div>
      <div className="flex-1 flex flex-col overflow-y-auto">
      <nav className="flex-1 px-2 py-4 space-y-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `
                ${isCollapsed ? 'justify-center' : 'justify-start'}
                flex items-center px-4 py-2 text-sm font-medium rounded-md
                ${isActive 
                  ? `${darkMode ? 'bg-gray-900 text-white' : 'bg-blue-100 text-blue-700'}`
                  : `${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}
              `}
            >
              <div className="flex items-center">
                <div className={`${isCollapsed ? 'mr-0' : 'mr-3'}`}>
                  {item.icon}
                </div>
                {!isCollapsed && <span>{item.name}</span>}
              </div>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* user profile */}
      {!isCollapsed && (
        <div className={`p-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                {currentUser?.name?.charAt(0) || 'U'}
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">
                {currentUser?.name || 'User'}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {currentUser?.email || 'user@example.com'}
              </p>
            </div>
                </div>
            </div>
      )}
    </div>
  );
};

export default Sidebar;
