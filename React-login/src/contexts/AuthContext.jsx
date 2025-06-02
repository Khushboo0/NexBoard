import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { jwtDecode } from "jwt-decode";
import authService from "../services/authService";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

const storedUser = localStorage.getItem("user");

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    storedUser ? JSON.parse(storedUser) : null
  );
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //checking the tokens on mount
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Token on refresh:", (token));
        if (!token) {
          console.log('unverified ')
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }
          console.log('verified ')

        //toke expiration case

        const decodedToken = jwtDecode(token);
        console.log("Decoded token:", decodedToken);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          console.log("Token expired");

          // handleLogout();
          console.log('reaching here');
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }

        const userData = await authService.verifyToken();
         console.log("User data from verifyToken:", userData);
        localStorage.setItem("user", JSON.stringify(userData));

        setCurrentUser(userData);
        setIsAuthenticated(true);
      } catch (err) {
        console.log("Authetication failed", err);
        // handleLogout();
          console.log('reaching here')

      } finally {
        setLoading(false);
      }
    };
    verifyToken();
  }, []);

  const handleLogin = useCallback(async (credentials) => {
    try {
      setError(null);
      setLoading(true);
      const { user, token } = await authService.login(credentials);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setCurrentUser(user);
      setIsAuthenticated(true);
      return user;
    } catch (err) {
      setError(err.message || "Login Failed, try again later");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const handleRegister = useCallback(async (userData) => {
    try {
      setLoading(true);
      setError(null);
      const { user, token } = await authService.register(userData);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setCurrentUser(user);
      setIsAuthenticated(true);
      return user;
    } catch (err) {
      setError(err.message || "Registeration failed, Please try again later");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem('user');
    setCurrentUser(null);
    setIsAuthenticated(false);
  }, []);

  const handleForgotPassword = useCallback(async (email) => {
    try {
      setError(null);
      setLoading(true);

      await authService.forgotPassword(email);
    } catch (err) {
      setError(err.message || "Failed to reset the password");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const handleResetPassword = useCallback(async (token, newPassword) => {
    try {
      setError(null);
      setLoading(true);

      await authService.resetPassword(token, newPassword);
    } catch (err) {
      setError(err.message || "Failed to reset password");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const value = {
    currentUser,
    isAuthenticated,
    loading,
    error,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    forgotPassword: handleForgotPassword,
    resetPassword: handleResetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
