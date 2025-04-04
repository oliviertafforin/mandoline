import React, { useEffect, useState } from "react";
import { fetchIngredients, Ingredient } from "../services/ingredient";
import CarteIngredient from "./CarteIngredient";
import { Row } from "react-bootstrap";
import styles from "./../styles/ListeCarteIngredient.module.css";
import Sidebar from "./SidebarIngredient";

function ListeCarteIngredient() {
  const [IngredientList, setIngredientList] = useState<Ingredient[] | null>([]);
  useEffect(() => {
    fetchIngredients().then((data) => {
      if (data) {
        setIngredientList(data);
      } else {
        setIngredientList([]);
      }
    });
  }, []);

  return (
    <div className={styles.listeIngredients}>
      <Sidebar />
      <Row xs={1} md={2} className={styles.carteIngredient}>
        {IngredientList?.sort((a, b) => a.nom.localeCompare(b.nom)).map(
          (ingredient) => (
            <CarteIngredient key={ingredient.id} ingredient={ingredient} />
          )
        )}
      </Row>
    </div>
  );
}
export default ListeCarteIngredient;
