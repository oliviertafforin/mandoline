import React, { useEffect, useRef } from "react";
import { Ingredient } from "../services/ingredient";
import "./../styles/CarteIngredient.css";
import { Button, Card } from "react-bootstrap";
import { NavLink } from "react-router";

interface CarteIngredientProps {
  ingredient: Ingredient;
}

const CarteIngredient: React.FC<CarteIngredientProps> = ({ ingredient }) => {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const titleElement = titleRef.current;
    if (titleElement && titleElement.scrollWidth > titleElement.clientWidth) {
      titleElement.classList.add("adjusted");
    } else if (titleElement) {
      titleElement.classList.remove("adjusted");
    }
  }, [ingredient.nom]);
  
  return (
    <Card className="ingredient-card">
      <Button
        className="ingredient-card__edit-button"
        variant="primary"
        href={`/ingredients/${ingredient.id}/edit`}
      >
        <i className="bi-wrench" style={{ color: "white" }} />
      </Button>
      <NavLink className="card-link" to={`/ingredients/${ingredient.id}`}>
        <Card.Img
          className="ingredient-card__image"
          variant="top"
          src={ingredient.image.url}
        />
        <Card.Body>
          <Card.Title className="ingredient-card__title" ref={titleRef}>
            {ingredient.nom}
          </Card.Title>
          <Card.Text className="ingredient-card__description">
            Le {ingredient.nom} c'est bien
          </Card.Text>
        </Card.Body>
      </NavLink>
    </Card>
  );
};

export default CarteIngredient;
