import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []); 

  const login = async (userData, token) => {
    setIsAuthenticated(true);
    Cookies.set("token", token, { expires: 7 });
    
    // Fetch user data from the API
    const response = await fetch('http://192.168.1.114:3000/api/auth/user', { 

        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    
    if (response.ok) {
      const user = await response.json(); 

      setUser(user);
    } else {
      const errorText = await response.text();
      console.error('Failed to fetch user data', response.status, errorText);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    Cookies.remove("token");
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
