import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";
import TextInput from "../components/common/TextInput";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Button from "../components/common/Button";
import authService from "../services/authService";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Email is required"),
});

const ForgotPassword = () => {
  const { darkMode, toggleTheme } = useTheme();
  const { forgotPassword } = useAuth();
  const [error, setError] = useState("");
  const [isLoading,setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const {
    formState: { errors },
    handleSubmit,
    reset,
    register,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });
  const onSubmit = async ({email}) => {
     console.log("Submitted email:", email); 
    setError(null);
    setIsLoading(true);
    try{
        await authService.forgotPassword(email);
        
        setSuccessMsg(
        "If the email exists in our system, a password reset link has been sent. Please check your inbox."
      );
      

      reset();
    }
    catch(err){
        setError('Failed to send the email')

    }
    finally{
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
            Forgot Password
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm -space-y-px">
            <TextInput
              id="email"
              name="email"
              type="email"
              label="Email Address"
              error={errors.email?.message}
              placeholder="Email address"
              autoComplete="email"
              register={register} 
              required
              
            />
          </div>
           {successMsg && (
            <p className="text-green-600 text-sm mt-2 text-center">
              {successMsg}
            </p>
          )}
           <div>
            <Button type="submit" isLoading={isLoading} fullWidth>
              Send Password reset link
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
