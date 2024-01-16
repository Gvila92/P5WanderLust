import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState({}); // Initialize user as an empty object

  // Load authentication state from storage on mount
  useEffect(() => {
    const storedAuthState = localStorage.getItem("authState");
    if (storedAuthState) {
      setAuthenticated(JSON.parse(storedAuthState));
    }

    // Load user from storage if available
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = () => {
    setAuthenticated(true);
    // Save authentication state to storage
    localStorage.setItem("authState", JSON.stringify(true));
  };

  const logout = () => {
    setAuthenticated(false);
    // Remove authentication state from storage
    localStorage.removeItem("authState");
    // Remove user from storage
    localStorage.removeItem("user");
    // Clear user in state
    setUser({});
  };

  // Expose setUser function for updating user
  const updateUser = (newUserData) => {
    setUser((prevUser) => ({ ...prevUser, ...newUserData }));
    // Save updated user to storage
    localStorage.setItem("user", JSON.stringify(user));
  };

  return (
    <AuthContext.Provider value={{ authenticated, user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
