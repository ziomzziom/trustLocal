import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setUser(user);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Failed to parse user data from localStorage:", error);
        localStorage.removeItem("user"); // Clear invalid data
      }
    }
    setLoading(false);
  }, []);

  const login = async (userData, token) => {
    try {
      const response = await fetch('http://192.168.1.114:3000/api/auth/user', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const user = await response.json();
        setUser(user);
        setIsAuthenticated(true);
        Cookies.set("token", token, { expires: 7 });
        localStorage.setItem("user", JSON.stringify(user)); // Save user data
      } else {
        console.error('Failed to fetch user data after login', response.status);
        throw new Error('Failed to fetch user data');
      }
    } catch (error) {
      console.error('Error during login:', error);
      throw error; // Propagate the error to the caller
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    Cookies.remove("token");
    localStorage.removeItem("user"); // Clear user data
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};