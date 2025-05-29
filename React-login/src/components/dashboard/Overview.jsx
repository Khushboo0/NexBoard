import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import useFetch from "../../hooks/useFetch";
import LoadingSpinner from "../common/LoadingSpinner";
import StatCard from "../common/StatCard";
import { useTheme } from "../../contexts/ThemeContext";

const Overview = () => {
  const { currentUser } = useAuth();
  const { darkMode } = useTheme();
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    newUsersToday: 0,
    totalRevenue: 0,
  });

  const { data, loading, error } = useFetch("/api/dashboard/stats");

  useEffect(() => {
    if (data) {
      setStats(data);
    }
  }, [data]);
  if (loading) return <LoadingSpinner size="lg" />;
  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">Failed to load dashboard data</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {error.message || "An unknown error occurred"}
        </p>
      </div>
    );
  }
  return (
    <div>
      <h1
        className={`text-2xl font-semibold ${
          darkMode ? "text-white" : "text-gray-900"
        }`}
      >
        Dashboard Overview
      </h1>
      <div className="mt-6">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Users"
            value={stats.totalUsers}
            icon="👥"
            trend="+5.2%"
            trendDirection="up"
            darkMode={darkMode}
          />

          <StatCard
            title="Active Users"
            value={stats.activeUsers}
            icon="👤"
            trend="+2.1%"
            trendDirection="up"
            darkMode={darkMode}
          />

          <StatCard
            title="New Users Today"
            value={stats.newUsersToday}
            icon="🆕"
            trend="-0.5%"
            trendDirection="down"
            darkMode={darkMode}
          />

          <StatCard
            title="Total Revenue"
            value={`$${stats.totalRevenue.toLocaleString()}`}
            icon="💰"
            trend="+12.5%"
            trendDirection="up"
            darkMode={darkMode}
          />
        </div>
      </div>
      <div
        className={`mt-8 bg-white dark:bg-gray-800 shadow rounded-lg p-6 ${
          darkMode ? "text-white" : "text-gray-900"
        }`}
      >
        <h2 className="text-lg font-medium mb-4">Recent Activity</h2>

        <div className="flow-root">
          <ul className="-my-5 divide-y divide-gray-200 dark:divide-gray-700">
            <li className="py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                    U
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    New user registered: John Doe
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    10 minutes ago
                  </p>
                </div>
              </div>
            </li>

            <li className="py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                    A
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    Admin action: System updated
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    1 hour ago
                  </p>
                </div>
              </div>
            </li>

            <li className="py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                    S
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    Server maintenance completed
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    3 hours ago
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Overview;
