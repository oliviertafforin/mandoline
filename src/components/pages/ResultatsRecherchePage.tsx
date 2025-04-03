import React, { useContext } from "react";
import styles from "./../../styles/ResultatsRecherchePage.module.css";
import { Context } from "../Context";

const ResultatsRecherchePage: React.FC = () => {
    const { resultats } = useContext(Context)!;

  return (
    <div>
      <h2>Résultats</h2>
      <ul className={styles.listeResultats}>
        {resultats.map((item) => (
          <li key={item.id} className={styles.resultat}>
            {item.nom} - {item.description} - {item.type}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResultatsRecherchePage;
