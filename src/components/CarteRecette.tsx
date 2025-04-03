import React, { useEffect, useRef, useState } from "react";
import { Recette } from "../services/recette";
import styles from "./../styles/CarteRecette.module.css";
import { Button, Card } from "react-bootstrap";
import { NavLink } from "react-router";
import { download } from "../services/image";

interface CarteRecetteProps {
  recette: Recette;
}

const CarteRecette: React.FC<CarteRecetteProps> = ({ recette }) => {
  const [imageSrc, setImageSrc] = useState("");
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [styleTitre, setStyleTitre] = useState("");

  useEffect(() => {
    const titleElement = titleRef.current;
    if (
      titleElement &&
      titleElement.scrollWidth > titleElement.clientWidth * 1.25
    ) {
      setStyleTitre(styles.adjusted2);
    } else if (
      titleElement &&
      titleElement.scrollWidth > titleElement.clientWidth
    ) {
      setStyleTitre(styles.adjusted);
    } else if (titleElement) {
      setStyleTitre("");
    }
  }, [recette.nom]);

  useEffect(() => {
    if (recette.image && recette.image?.id) {
      download(recette.image?.id).then((src) => {
        if (src) {
          setImageSrc(src);
        }
      });
    }
  }, [recette.image]);

  return (
    <Card className={styles.carteRecette}>
      <Button
        className={styles.boutonEdition}
        variant="primary"
        href={`/recettes/${recette.id}/edit`}
      >
        <i className="bi-wrench" style={{ color: "white" }} />
      </Button>
      <NavLink className={styles.link} to={`/recettes/${recette.id}`}>
        {recette?.image ? (
          <Card.Img className={styles.image} variant="top" src={imageSrc} />
        ) : (
          <p>Pas d'image disponible</p>
        )}

        <Card.Body>
          <Card.Title
            className={`${styles.titre} ${styleTitre}`}
            ref={titleRef}
          >
            {recette.nom}
          </Card.Title>
          <Card.Text className={styles.description}>
            Le {recette.nom} c'est bien
          </Card.Text>
        </Card.Body>
      </NavLink>
    </Card>
  );
};

export default CarteRecette;
