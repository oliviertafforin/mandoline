import React, { useEffect, useState } from "react";
import {
  fetchIngredients,
  Ingredient,
} from "../services/ingredient";
import CarteIngredient from "./CarteIngredient";
import { Row } from "react-bootstrap";
import "./../styles/ListeCarteIngredient.css";

function ListeCarteIngredient() {
  const [IngredientList, setIngredientList] = useState<Ingredient[] | null>(
    []
  );

  useEffect(() => {
    fetchIngredients().then((data) => {
      if (data) {
        setIngredientList(data);
      } else {
        setIngredientList([]);
      }
    });
  }, [IngredientList]);

  return (
    
    <div className="ingredient-list">
      <Row xs={1} md={2} className="row-card">
      {IngredientList?.map((ingredient) => (
        <CarteIngredient key={ingredient.id} ingredient={ingredient} />
      ))}
      </Row>
    </div>
  );
}
export default ListeCarteIngredient;
