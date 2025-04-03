import React, {  useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./../../styles/LoginPage.module.css";
import { login } from "../../services/utilisateur";
import { useAuth } from "../utils/AuthContextType";

const LoginPage: React.FC = () => {
  const [pseudo, setPseudo] = useState("");
  const [mdp, setMdp] = useState("");
  const [error, setError] = useState("");
  const auth = useAuth();
  const navigate = useNavigate();
  if (!auth) return <p>Erreur : Contexte non disponible</p>;
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login(pseudo, mdp);
      const jwt = response?.data;
      if (jwt) {
        auth.login(jwt);
        navigate("/");
      }
    } catch (err) {
      setError("Problème de connexion");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginForm} onSubmit={handleLogin}>
        <h2>Connexion</h2>
        {error && <p className={styles.errorMessage}>{error}</p>}
        <input
          type="text"
          placeholder="Pseudo"
          value={pseudo}
          onChange={(e) => setPseudo(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={mdp}
          onChange={(e) => setMdp(e.target.value)}
          required
        />
        <button type="submit">Se connecter</button>
      </form>
      <button className={styles.registerButton} onClick={() => navigate("/register")}>
        S'inscrire
      </button>
    </div>
  );
};

export default LoginPage;
