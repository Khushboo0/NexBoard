const TextInput = ({
  id,
  name,
  type = "text",
  label,
  placeholder,
  error,
  register,
  className = "",
  ...props
}) => {
  return (
    <div className={`relative ${className}`}>
      {label && (
        <label
          htmlFor={id}
          lassName="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        {...(register ? register(name) : { name })}
        className={`
          block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          ${error ? "border-red-300" : "border-gray-300 dark:border-gray-600"}
          ${error ? "focus:ring-red-500 focus:border-red-500" : ""}
          dark:bg-gray-800 dark:text-white
        `}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};

export default TextInput;