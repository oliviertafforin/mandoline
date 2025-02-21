import React, { useEffect, useState } from "react";
import {
  getIngredient,
  Ingredient,
  updateIngredient,
} from "../services/ingredient";
import "./../styles/IngredientDetailsForm.css";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ReturnButton from "./ReturnButton";
import {
  IngredientUtilisateur,
  getIngredientUtilisateur,
  updateIngredientUtilisateur,
} from "../services/ingredient_utilisateur";
import { useAuth } from "./utils/AuthContextType";

function IngredientDetailsForm() {
  const auth = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const [ingredient, setIngredient] = useState<Ingredient | null>(null);
  const [ingredientUtilisateur, setIngredientUtilisateur] =
    useState<IngredientUtilisateur | null>(null);
  useEffect(() => {
    if (id) {
      getIngredient(id).then((data) => {
        if (data) {
          setIngredient(data);
        } else {
          setIngredient(null);
        }
        if (auth.id) {
          getIngredientUtilisateur(id, auth.id).then((data) => {
            if (data) {
              setIngredientUtilisateur(data);
            } else {
              setIngredientUtilisateur({
                prixUnite: 0,
                prixKilo: 0,
                eviter: false,
                saison: [],
                remplacements: [],
              } as IngredientUtilisateur);
            }
          });
        }
      });
    }
  }, [id, auth.id]);

  async function handleUpdateIngredient(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (ingredient && id && auth.id) {
      const updatedIngredient = { ...ingredient };
      const updatedIngredientUtilisateur = { ...ingredientUtilisateur };
      console.log(updatedIngredient);
      console.log(updatedIngredientUtilisateur);
      console.log(id);
      console.log(auth.id);
      try {
        await updateIngredient(id, updatedIngredient);
        await updateIngredientUtilisateur(
          id,
          auth.id,
          updatedIngredientUtilisateur
        );
        console.log("Ingrédient mis à jour avec succès");
        navigate("/ingredients");
      } catch (error) {
        console.error("Erreur lors de la mise à jour de l'ingrédient :", error);
      }
    }
  }

  if (!ingredient || !ingredientUtilisateur) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="form-container">
      <ReturnButton label="← Retour" />
      <h1>{ingredient.nom}</h1>
      <Form onSubmit={handleUpdateIngredient}>
        <Form.Group controlId="formNom">
          <Form.Label>Nom</Form.Label>
          <Form.Control
            type="text"
            value={ingredient.nom}
            onChange={(e) =>
              setIngredient({ ...ingredient, nom: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group controlId="formImage">
          <Form.Label>URL de l'image</Form.Label>
          <Form.Control
            type="text"
            value={ingredient.image.url}
            onChange={(e) =>
              setIngredient({
                ...ingredient,
                image: { ...ingredient.image, url: e.target.value },
              })
            }
          />
        </Form.Group>

        <Form.Group controlId="formPrixUnite">
          <Form.Label>Prix à l'unité</Form.Label>
          <Form.Control
            type="number"
            value={ingredientUtilisateur.prixUnite}
            onChange={(e) =>
              setIngredientUtilisateur({
                ...ingredientUtilisateur,
                prixUnite: Number(e.target.value),
              })
            }
          />
        </Form.Group>

        <Form.Group controlId="formPrixKilo">
          <Form.Label>Prix au kilo</Form.Label>
          <Form.Control
            type="number"
            value={ingredientUtilisateur.prixKilo}
            onChange={(e) =>
              setIngredientUtilisateur({
                ...ingredientUtilisateur,
                prixKilo: Number(e.target.value),
              })
            }
          />
        </Form.Group>

        <Form.Group controlId="formEviter">
          <Form.Check
            type="checkbox"
            label="Éviter l'ingrédient"
            checked={ingredientUtilisateur.eviter}
            onChange={(e) =>
              setIngredientUtilisateur({
                ...ingredientUtilisateur,
                eviter: e.target.checked,
              })
            }
          />
        </Form.Group>

        <Form.Group controlId="formSaison">
          <Form.Label>Mois à préférer</Form.Label>
          {[...Array(12).keys()].map((monthIndex) => (
            <Form.Check
              key={monthIndex}
              type="checkbox"
              label={new Intl.DateTimeFormat("fr-FR", { month: "long" }).format(
                new Date(0, monthIndex)
              )}
              checked={ingredientUtilisateur.saison.includes(monthIndex)}
              onChange={(e) => {
                const saison = e.target.checked
                  ? [...ingredientUtilisateur.saison, monthIndex]
                  : ingredientUtilisateur.saison.filter(
                      (month) => month !== monthIndex
                    );
                setIngredientUtilisateur({ ...ingredientUtilisateur, saison });
              }}
            />
          ))}
        </Form.Group>

        <Button variant="primary" type="submit">
          Mettre à jour
        </Button>
      </Form>
    </div>
  );
}

export default IngredientDetailsForm;
