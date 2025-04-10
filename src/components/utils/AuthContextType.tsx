import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import React from "react";
import { getUtilisateur, Utilisateur } from "../../services/utilisateur";

interface AuthContextType {
  token: string | null;
  id: string | undefined;
  username: string | undefined;
  utilisateur: Utilisateur | undefined;
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
  id: undefined,
  username: undefined,
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

const getInfoFromJwt = (
  jwt: string | null,
  field: keyof MyJwtToken
): string | undefined => {
  const decodedJwt = decodeJwt(jwt);
  return decodedJwt ? (decodedJwt[field] as string) : undefined;
};

const useAuthState = () => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token") || null
  );
  const [username, setUsername] = useState<string | undefined>(
    getInfoFromJwt(token, "sub") || undefined
  );
  const [id, setId] = useState<string | undefined>(
    getInfoFromJwt(token, "id") || undefined
  );
  const [utilisateur] = useState<Utilisateur | undefined>({
    id: id,
    pseudo: username,
    recettesLikees: [],
    avatar: undefined,
    role: "",
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
    setUsername(undefined);
    setId(undefined);
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
  };

  return { token, username, id, utilisateur, login, logout };
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const authState = useAuthState();

  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
