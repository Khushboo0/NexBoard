const StatCard = ({ title = "Title", value = "N/A", icon = "ℹ️", trend = "0%", trendDirection = "up", darkMode = false }) => {
  return (
    <div
      className={`${
        darkMode ? "bg-gray-700" : "bg-white"
      } overflow-hidden shadow rounded-lg`}
    >
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div
              className={`h-10 w-10 rounded-md flex items-center justify-center ${
                darkMode ? "bg-gray-500" : "bg-blue-100"
              }`}
            >
              <span className="text-xl">{icon}</span>
            </div>
          </div>
          <div className="ml-5 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-200 dark:text-gray-400 truncate">
                {title}
              </dt>
              <dd>
                <div className="text-lg font-medium text-gray-400 dark:text-white">
                  {value}
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <div className={`${darkMode ? "bg-gray-800" : "bg-gray-50"} px-5 py-3`}>
        <div className="text-sm">
          <div className="flex items-center">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                trendDirection === "up"
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                  : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
              }`}
            >
              {trendDirection === "up" ? "↑" : "↓"} {trend}
            </span>
            <span className="ml-2 text-gray-400 dark:text-gray-400">
              from previous period
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default StatCard;
