import jwtEncode from "jwt-encode";

const SECRET = "secret";

const authService = {
  login: async (credentials) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (
      credentials.email === "admin@example.com" &&
      credentials.password === "password"
    ) {
      const user = {
        id: 1,
        name: "Admin User",
        email: "admin@example.com",
        role: "admin",
      };
      const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        exp: Math.floor(Date.now() / 1000) + 60 * 60, // expires in 1 hour
      };

      
      const token = jwtEncode(payload, SECRET);
      return { user, token };
    } else {
      throw new Error("Invalid email or password");
    }
  },
  register: async (userData) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const user = {
      id: Date.now(), // Generate a mock ID
      name: userData.name,
      email: userData.email,
      role: "user", // Default role for new users
    };
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      exp: Math.floor(Date.now() / 1000) + 60 * 60, // expires in 1 hour
    };

    
    const token = jwtEncode(payload, SECRET);

    return { user, token };
  },
  verifyToken: async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      id: 1,
      name: "Admin User",
      email: "admin@example.com",
      role: "admin",
    };
  },
  forgotPassword: async (email) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { success: true };
  },
  resetPassword: async (token, newPassword) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { success: true };
  },
};
export default authService;
