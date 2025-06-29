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
        const token = localStorage?.getItem("token") || sessionStorage?.getItem('token');
        if (!token) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }

        //toke expiration case

        const decodedToken = jwtDecode(token);

        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          // handleLogout();

          setIsAuthenticated(false);
          setLoading(false);
          return;
        }

        const userData = await authService.verifyToken();

        localStorage.setItem("user", JSON.stringify(userData));

        setCurrentUser(userData);
        setIsAuthenticated(true);
      } catch (err) {
        // handleLogout();
      } finally {
        setLoading(false);
      }
    };
    verifyToken();
  }, []);

  const handleLogin = useCallback(async (credentials, remember) => {
    try {
      setError(null);
      setLoading(true);
      const { user, token } = await authService.login(credentials);
      if (remember) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("user", JSON.stringify(user));
      }

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
    localStorage?.removeItem("token");
    localStorage?.removeItem("user");

    sessionStorage?.removeItem("token");
    sessionStorage?.removeItem("user");
    
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
