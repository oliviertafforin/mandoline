import React, { useEffect, useState } from "react";
import { fetchRecettes, Recette } from "../services/recette";
import CarteRecette from "./CarteRecette";
import { Row } from "react-bootstrap";
import styles from "./../styles/ListeCarteRecette.module.css";
import Sidebar from "./SidebarRecette";
import {
  getRecetteLikees,
  getUtilisateur,
  Utilisateur,
} from "../services/utilisateur";
import { useAuth } from "./utils/AuthContextType";

function ListeCarteRecette() {
  const [RecetteList, setRecetteList] = useState<Recette[] | null>([]);
  const [utilisateur, setUtilisateur] = useState<Utilisateur>();
  const auth = useAuth();
  useEffect(() => {
    fetchRecettes().then((data) => {
      if (data) {
        setRecetteList(data);
      } else {
        setRecetteList([]);
      }
    });
    if (auth.id) {
      getUtilisateur(auth.id).then((user) => {
        setUtilisateur(user);
      });
    }
  }, [auth.id]);

  useEffect(() => {
    async function loadUtilisateurComplet() {
      if (auth.id) {
        const user = await getUtilisateur(auth.id);
        const recettesLikees = await getRecetteLikees(auth.id);
        setUtilisateur({ ...user, recettesLikees });
      }
    }
    loadUtilisateurComplet();
  }, [auth.id]);

  return (
    <div className={styles.listeRecettes}>
      <Sidebar />
      <Row xs={1} md={2}>
      {RecetteList?.map((recette) => (
        utilisateur ? (
          <CarteRecette
            key={recette.id}
            recette={recette}
            utilisateur={utilisateur}
          />
        ) : null
      ))}
      </Row>
    </div>
  );
}
export default ListeCarteRecette;
