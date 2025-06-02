import React from "react";
import styles from "./../../styles/HomePage.module.css";

const HomePage: React.FC = () => {
  return (
    <div className={styles.container}>
      <img src="assets/calendrier_saison.jpg" alt="Calendrier saisonnier fruits et légumes" className={styles.calendrier} ></img>
      <p>
        Prévoir une liste des ingrédients de saison en fonction de la date du jour + recettes associées
      </p>
    </div>
    
  );
};

export default HomePage;
