const Alert = ({ type = "info", message, onClose }) => {
  const types = {
    info: "bg-blue-50 text-blue-800 border-blue-300 dark:bg-blue-900 dark:text-blue-200 dark:border-blue-700",
    success:
      "bg-green-50 text-green-800 border-green-300 dark:bg-green-900 dark:text-green-200 dark:border-green-700",
    warning:
      "bg-yellow-50 text-yellow-800 border-yellow-300 dark:bg-yellow-900 dark:text-yellow-200 dark:border-yellow-700",
    error:
      "bg-red-50 text-red-800 border-red-300 dark:bg-red-900 dark:text-red-200 dark:border-red-700",
  };
  return (
    <div className={`rounded-md p-4 border ${types[type]}`} role="alert">
      <div className="flex">
        <div className="flex-shrink-0">
          {type === "info" && <span>ℹ️</span>}
          {type === "success" && <span>✅</span>}
          {type === "warning" && <span>⚠️</span>}
          {type === "error" && <span>❌</span>}
        </div>
        <div className="ml-3">
          <p className="text-sm">{message}</p>
        </div>
        {onClose && (
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <span className="sr-only">Dismiss</span>
                <span>✖</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Alert;