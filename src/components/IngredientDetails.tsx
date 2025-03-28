import React, { useEffect, useState } from "react";
import ReturnButton from "../components/ReturnButton";
import { Image } from "react-bootstrap";
import config from ".././config";
import { getIngredient, Ingredient } from "../services/ingredient";
import {
  getIngredientUtilisateur,
  IngredientUtilisateur,
} from "../services/ingredient_utilisateur";
import "./../styles/IngredientDetails.css";
import { useParams } from "react-router-dom";

function IngredientDetails() {
  const { id } = useParams();
  const [ingredient, setIngredient] = useState<Ingredient | null>(null);
  const [ingredientUtilisateur, setIngredientUtilisateur] =
    useState<IngredientUtilisateur | null>(null);

    const monthNames = [
      "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
      "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
    ];

    
  useEffect(() => {
    if (id) {
      getIngredient(id).then((data) => {
        if (data) {
          setIngredient(data);
        } else {
          setIngredient(null);
        }
      });
      getIngredientUtilisateur(id, config.DEFAULT_USER).then((data) => {
        if (data) {
          setIngredientUtilisateur(data);
        } else {
          setIngredientUtilisateur(null);
        }
        console.log(data);
      });
    }
  }, [id]);

  return (
    <div className="ingredient">
        <ReturnButton/>
      <h1>{ingredient?.nom}</h1>
      <Image
        className="icone-ingredient"
        src={ingredient?.image.path}
        roundedCircle
      />
      <ul>
        <li className="item">
          {ingredientUtilisateur?.eviter
            ? "Aliment évité ❌"
            : "Aliment validé ✅"}{" "}
        </li>
        <li className="item">
          Prix au kilo : {ingredientUtilisateur?.prixKilo} ✅
        </li>
        <li className="item">
          Prix à l'unité : {ingredientUtilisateur?.prixUnite} ✅
        </li>
        <li>Mois à préférer : </li>
        {ingredientUtilisateur?.saison.map(mois => {
          return monthNames[mois] + ", ";
        })}
        <li>Remplacements potentiels : </li>
        {ingredientUtilisateur?.remplacements.map(r => {
          return r.nom + ", ";
        })}
      </ul>

      <div></div>
    </div>
  );
}
export default IngredientDetails;
