import React, { useEffect, useState } from "react";
import { fetchRecettes, Recette } from "../services/recette";
import CarteRecette from "./CarteRecette";
import { Pagination, Row, Spinner } from "react-bootstrap";
import styles from "./../styles/ListeCarteRecette.module.css";
import Sidebar from "./SidebarRecette";
import {
  getRecetteLikees,
  getUtilisateur,
  Utilisateur,
} from "../services/utilisateur";
import { useAuth } from "./utils/AuthContextType";

function ListeCarteRecette() {
  const [recetteList, setRecetteList] = useState<Recette[] | null>([]);
  const [utilisateur, setUtilisateur] = useState<Utilisateur>();
  const auth = useAuth();
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 6; // Ou 10 selon ton choix
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadRecettes = async () => {
      setIsLoading(true);
      const data = await fetchRecettes(page, pageSize);
      if (data) {
        setRecetteList(data.content);
        setTotalPages(data.totalPages);
      } else {
        setRecetteList([]);
      }
      setIsLoading(false);
    };
    loadRecettes();
  }, [page]);

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
      {isLoading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "200px" }}
        >
          <Spinner animation="border" variant="primary" role="status" />
        </div>
      ) : (
        <Row xs={1} md={2}>
          {recetteList?.map((recette) =>
            utilisateur ? (
              <CarteRecette
                key={recette.id}
                recette={recette}
                utilisateur={utilisateur}
              />
            ) : null
          )}
        </Row>
      )}
      <Pagination className="justify-content-center mt-4">
        <Pagination.First onClick={() => setPage(0)} disabled={page === 0} />
        <Pagination.Prev
          onClick={() => setPage(page - 1)}
          disabled={page === 0}
        />
        {[...Array(totalPages)].map((_, index) => (
          <Pagination.Item
            key={index}
            active={index === page}
            onClick={() => setPage(index)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages - 1}
        />
        <Pagination.Last
          onClick={() => setPage(totalPages - 1)}
          disabled={page === totalPages - 1}
        />
      </Pagination>
    </div>
  );
}
export default ListeCarteRecette;
