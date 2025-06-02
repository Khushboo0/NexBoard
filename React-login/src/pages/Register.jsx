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

// Schema for validation
const schema = yup.object().shape({
  name: yup.string().required("Name is required").min(2, "Name is too short"),
  email: yup.string().email("Please enter a valid email").required("Email is required"),
  password: yup.string().required("Password is required").min(8, "Password must be 8 characters long"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
});

const Register = () => {
  const { register: registerUser, error: authError } = useAuth();
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
      await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Registration failed");
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
            Create your account
          </h2>
        </div>
        {(error || authError) && (
          <Alert type="error" message={error || authError} />
        )}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm -space-y-px">
            <TextInput
              id="name"
              name="name"
              type="text"
              label="Name"
              register={register}
              error={errors.name?.message}
              placeholder="Your full name"
              autoComplete="name"
              required
            />

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
              className="mt-2"
            />

            <TextInput
              id="password"
              name="password"
              type="password"
              label="Password"
              register={register}
              error={errors.password?.message}
              placeholder="Password"
              autoComplete="new-password"
              required
              className="mt-2"
            />

            <TextInput
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              register={register}
              error={errors.confirmPassword?.message}
              placeholder="Confirm password"
              autoComplete="new-password"
              required
              className="mt-2"
            />
          </div>

          <div>
            <Button type="submit" isLoading={isLoading} fullWidth>
              Register
            </Button>
          </div>

          <div className="text-center">
            <p className="mt-2 text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </form>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={toggleTheme}
            className={`p-2 rounded-full ${
              darkMode ? "bg-gray-800 text-yellow-300" : "bg-gray-200 text-gray-700"
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

export default Register;
