import React from "react";
import { Recette } from "../services/recette";
import "./../styles/CarteRecette.css";
import { Button, Card } from "react-bootstrap";
import { NavLink } from "react-router";

interface CarteRecetteProps {
  recette: Recette;
}

const CarteRecette: React.FC<CarteRecetteProps> = ({ recette }) => {
  return (
    <Card className="recette-card">
      <Button
        className="recette-card__edit-button"
        variant="primary"
        href={`/recettes/${recette.id}/edit`}
      >
        <i className="bi-wrench" style={{ color: "white" }} />
      </Button>
      <NavLink className="card-link" to={`/recettes/${recette.id}`}>
        {recette?.image ? (
          <Card.Img
            className="recette-card__image"
            variant="top"
            src={recette?.image.url}
          />
        ) : (
          <p>Pas d'image disponible</p>
        )}

        <Card.Body>
          <Card.Title className="recette-card__title">{recette.nom}</Card.Title>
          <Card.Text className="recette-card__description">
            Le {recette.nom} c'est bien
          </Card.Text>
        </Card.Body>
      </NavLink>
    </Card>
  );
};

export default CarteRecette;
