import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("taskflow_token"));

  useEffect(() => {
    const savedUser = localStorage.getItem("taskflow_user");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const saveSession = (session) => {
    setToken(session.token);
    setUser(session);
    localStorage.setItem("taskflow_token", session.token);
    localStorage.setItem("taskflow_user", JSON.stringify(session));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("taskflow_token");
    localStorage.removeItem("taskflow_user");
  };

  return (
    <AuthContext.Provider value={{ user, token, saveSession, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);