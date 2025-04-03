import React, { useEffect, useState } from "react";
import { fetchRecettes, Recette } from "../services/recette";
import CarteRecette from "./CarteRecette";
import {  Row } from "react-bootstrap";
import styles from "./../styles/ListeCarteRecette.module.css";
import Sidebar from "./SidebarRecette";

function ListeCarteRecette() {
  const [RecetteList, setRecetteList] = useState<Recette[] | null>([]);
  useEffect(() => {
    fetchRecettes().then((data) => {
      if (data) {
        setRecetteList(data);
      } else {
        setRecetteList([]);
      }
    });
  }, []);

  return (
    <div className={styles.listeRecettes}>
      <Sidebar />
      <Row xs={1} md={2}>
        {RecetteList?.map((recette) => (
          <CarteRecette key={recette.id} recette={recette} />
        ))}
      </Row>
    </div>
  );
}
export default ListeCarteRecette;
