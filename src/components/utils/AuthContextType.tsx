import { createContext, useState, ReactNode, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import React from "react";

interface AuthContextType {
  token: string | null;
  login: (token : string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
    token: '',
    login: () => {},
    logout: () => {}
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const storedInfo =  localStorage.getItem('token') ? localStorage.getItem('token') || '{}' : null;
  const [ token, setToken ] = useState( storedInfo || null);
  const login = async (jwt: string) => {
    toast.success("Connecté !");
    setToken(jwt);
    localStorage.setItem('token', jwt);
  };

  const logout = () => {
    toast.info("Déconnecté !")
    setToken(null);
    localStorage.removeItem('token')
    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
  };