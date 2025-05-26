import React, { useEffect, useState } from "react";
import {
  fetchIngredientsPagines,
  Ingredient,
} from "../services/ingredient";
import CarteIngredient from "./CarteIngredient";
import { Pagination, Row, Spinner } from "react-bootstrap";
import styles from "./../styles/ListeCarteIngredient.module.css";
import Sidebar from "./SidebarIngredient";

function ListeCarteIngredient() {
  const [IngredientList, setIngredientList] = useState<Ingredient[] | null>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 12;
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadIngredients = async () => {
      setIsLoading(true);
      const data = await fetchIngredientsPagines(page, pageSize);
      if (data) {
        setIngredientList(data.content);
        setTotalPages(data.totalPages);
      } else {
        setIngredientList([]);
      }
      setIsLoading(false);
    };
    loadIngredients();
  }, [page]);

  return (
    <div className={styles.listeIngredients}>
      <Sidebar />
      {isLoading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "200px" }}
        >
          <Spinner animation="border" variant="primary" role="status" />
        </div>
      ) : (
        <Row xs={1} md={2} className={styles.carteIngredient}>
          {IngredientList?.sort((a, b) => a.nom.localeCompare(b.nom)).map(
            (ingredient) => (
              <CarteIngredient key={ingredient.id} ingredient={ingredient} />
            )
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
export default ListeCarteIngredient;
