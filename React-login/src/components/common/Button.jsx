import LoadingSpinner from "./LoadingSpinner";

const Button = ({
  children,
  type = "button",
  onClick,
  disabled = false,
  isLoading = false,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-150 ease-in-out";

  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 text-white",
    secondary:
      "bg-gray-200 hover:bg-gray-300 focus:ring-gray-500 text-gray-800",
    danger: "bg-red-600 hover:bg-red-700 focus:ring-red-500 text-white",
    success: "bg-green-600 hover:bg-green-700 focus:ring-green-500 text-white",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };
  const buttonStyles = `
    ${baseStyles}
    ${variants[variant]}
    ${sizes[size]}
    ${fullWidth ? "w-full" : ""}
    ${disabled || isLoading ? "opacity-60 cursor-not-allowed" : ""}
    ${className}
    `;
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={buttonStyles}
      {...props}
    >
        {isLoading?(
            <>
            <LoadingSpinner size="sm"/>
            <span className="ml-2">{children}</span>
            </>
        ):(
            children
        )}
    </button>
  );
};

export default Button;