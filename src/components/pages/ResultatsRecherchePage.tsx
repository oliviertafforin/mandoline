import React, { useContext } from "react";
import "./../../styles/ResultatsRecherchePage.css";
import { Context } from "../Context";

const ResultatsRecherchePage: React.FC = () => {
    const { resultats } = useContext(Context)!;

  return (
    <div>
      <h2>Résultats</h2>
      <ul className="result-list">
        {resultats.map((item) => (
          <li key={item.id} className="item">
            {item.nom} - {item.description} - {item.type}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResultatsRecherchePage;
