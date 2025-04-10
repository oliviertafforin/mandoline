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
  const [page, setPage] = useState(0); //n° de page actuel
  const [totalPages, setTotalPages] = useState(1); //nb total de pages pour la recherche
  const pageSize = 10; //nb éléments par page
  const [isLoading, setIsLoading] = useState<boolean>(true); //détermine si chargement en cours
  const [sortBy, setSortBy] = useState<string>("nom"); //nom du champ à trier
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc"); //direction du tri
  const [filtreNom, setFiltreNom] = useState<string>(""); //champ de filtre par nom
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null); //id timeout pour le filtrage pâr nom
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);


  const handleFiltreNomChange = (value: string) => {
    setFiltreNom(value);

    if (timer) {
      clearTimeout(timer);
    }

    const newTimeout = setTimeout(() => {
      setPage(0);
      loadRecettes(value, sortBy, sortDir);
    }, 500);

    setTimer(newTimeout);
  };

  useEffect(() => {
    loadRecettes(filtreNom, sortBy, sortDir);
  }, [page, sortBy, sortDir, selectedCategories]);

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

  const loadRecettes = async (
    nom: string,
    sortField: string,
    sortDirection: "asc" | "desc"
  ) => {
    setIsLoading(true);
    const data = await fetchRecettes(
      page,
      pageSize,
      sortField,
      sortDirection,
     
      selectedCategories,
      nom
    );
    if (data) {
      setRecetteList(data.content);
      setTotalPages(data.totalPages);
    } else {
      setRecetteList([]);
    }
    setIsLoading(false);
  };

  return (
    <div className={styles.listeRecettes}>
      <Sidebar
        filtreNom={filtreNom}
        onFiltreNomChange={handleFiltreNomChange}
        onSortByChange={setSortBy}
        onSortDirChange={setSortDir}
        sortBy={sortBy}
        sortDir={sortDir}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
      />
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
      <Pagination className="justify-content-center flex-wrap">
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
