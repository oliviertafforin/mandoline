import React, { useEffect, useRef, useState } from "react";
import { Ingredient } from "../services/ingredient";
import styles from "./../styles/CarteIngredient.module.css";
import { Button, Card } from "react-bootstrap";
import { NavLink } from "react-router";

interface CarteIngredientProps {
  ingredient: Ingredient;
}

const CarteIngredient: React.FC<CarteIngredientProps> = ({ ingredient }) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [styleTitre, setStyleTitre] = useState('');
  useEffect(() => {
    const titleElement = titleRef.current;
    if (titleElement && titleElement.scrollWidth > titleElement.clientWidth * 1.25) {
      setStyleTitre(styles.adjusted2);
    }else if (titleElement && titleElement.scrollWidth > titleElement.clientWidth) {
      setStyleTitre(styles.adjusted);
    } else if (titleElement) {
      setStyleTitre('');
    }
  }, [ingredient.nom]);
  
  return (
    <Card className={styles.carteIngredient}>
      <Button
        className={styles.boutonEdition}
        variant="primary"
        href={`/ingredients/${ingredient.id}/edit`}
      >
        <i className="bi-wrench" style={{ color: "white" }} />
      </Button>
      <NavLink className={styles.link} to={`/ingredients/${ingredient.id}`}>
        <Card.Img
          className={styles.image}
          variant="top"
          src={ingredient.image.path}
        />
        <Card.Body className={styles.body}>
          <Card.Title className={`${styles.titre} ${styleTitre}`} ref={titleRef}>
            {ingredient.nom}
          </Card.Title>
          <Card.Text className={styles.description}>
            Le {ingredient.nom} c'est bien
          </Card.Text>
        </Card.Body>
      </NavLink>
    </Card>
  );
};

export default CarteIngredient;
