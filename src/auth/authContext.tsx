import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

interface User {
  id: number;
  username: string;
  email: string;
  role: "Donor" | "Admin" | "CampaignCreator";
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.post(
          "http://localhost:3131/api/v1/users/refresh",
          {},
          { withCredentials: true }
        );
        setUser(res.data.user);
      } catch (error) {
        console.log("User not logged in");
      }
    };

    fetchUser();
  }, []);

  const login = (userData: User) => setUser(userData);

  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:3131/api/v1/auth/logout",
        {},
        { withCredentials: true }
      );
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
