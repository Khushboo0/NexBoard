import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTheme } from "../contexts/ThemeContext";
import Button from "../components/common/Button";
import TextInput from "../components/common/TextInput";
import Alert from "../components/common/Alert";

//Schema for validation

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be 8 characters long"),
});

const Login = () => {
  const { login, error: authError } = useAuth();
  const { darkMode, toggleTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });
  const onSubmit = async (data) => {
    setIsLoading(true);
    setError("");

    try {
      await login(data);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold">
            Sign in to your account
          </h2>
          
        </div>
        {(error || authError) && (
          <Alert type="error" message={error || authError} />
        )}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm -space-y-px">
            <TextInput
              id="email"
              name="email"
              type="email"
              label="Email Address"
              register={register}
              error={errors.email?.message}
              placeholder="Email address"
              autoComplete="email"
              required
            />

            <TextInput
              id="password"
              name="password"
              type="password"
              label="Password"
              register={register}
              error={errors.password?.message}
              placeholder="Password"
              autoComplete="current-password"
              required
              className="mt-2"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link
                to="/forgot-password"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <Button type="submit" isLoading={isLoading} fullWidth>
              Sign in
            </Button>
          </div>

          <div className="text-center">
            <p className="mt-2 text-sm">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Register here
              </Link>
            </p>
          </div>
        </form>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={toggleTheme}
            className={`p-2 rounded-full ${
              darkMode
                ? "bg-gray-800 text-yellow-300"
                : "bg-gray-200 text-gray-700"
            }`}
            aria-label="Toggle dark mode"
          >
            {darkMode ? "🌙" : "☀️"}
          </button>
        </div>
      </div>
    </div>
  );
};
export default Login;
