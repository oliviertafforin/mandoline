import { createContext, useState, ReactNode, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import React from "react";
import { Utilisateur } from "../../services/utilisateur";

interface AuthContextType {
  token: string | null;
  id: string | null;
  username: string | null;
  utilisateur : Utilisateur | undefined;
  login: (token: string) => void;
  logout: () => void;
}

interface MyJwtToken {
  sub: string;
  id: string;
  // whatever else is in the JWT.
}

export const AuthContext = createContext<AuthContextType>({
  token: null,
  id: null,
  username: null,
  utilisateur: undefined,
  login: () => {},
  logout: () => {},
});

const decodeJwt = (jwt: string | null): MyJwtToken | null => {
  if (jwt) {
    return jwtDecode<MyJwtToken>(jwt);
  }
  return null;
};

const getInfoFromJwt = (jwt: string | null, field: keyof MyJwtToken): string | null => {
  const decodedJwt = decodeJwt(jwt);
  return decodedJwt ? decodedJwt[field] as string : null;
};

const useAuthState = () => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token") || null);
  const [username, setUsername] = useState<string | null>(getInfoFromJwt(token, "sub") || null);
  const [id, setId] = useState<string | null>(getInfoFromJwt(token, "id") || null);
  const [utilisateur] = useState<Utilisateur | undefined>({
    "id" : id,
    "pseudo" : username
  });

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, [token]);

  const login = (jwt: string) => {
    toast.success("Connecté !");
    setToken(jwt);
    localStorage.setItem("token", jwt);
    setUsername(getInfoFromJwt(jwt, "sub"));
    setId(getInfoFromJwt(jwt, "id"));
  };

  const logout = () => {
    toast.info("Déconnecté !");
    setToken(null);
    setUsername(null);
    setId(null);
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
  };

  return { token, username, id, utilisateur, login, logout };
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const authState = useAuthState();

  return (
    <AuthContext.Provider value={authState}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
