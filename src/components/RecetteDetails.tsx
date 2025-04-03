import React, { useEffect, useState } from "react";
import ReturnButton from "./ReturnButton";
import { Etape, getRecette, Recette } from "../services/recette";
import styles from "./../styles/RecetteDetails.module.css";
import { useParams } from "react-router-dom";
import { useAuth } from "./utils/AuthContextType";
import { download } from "../services/image";

function RecetteDetails() {
  const { id } = useParams();
  const auth = useAuth();
  const [recette, setRecette] = useState<Recette>({
    nom: "",
    tpsPrepa: 0,
    tpsCuisson: 0,
    categorie: "",
    introduction: "",
    proprietaire: auth.utilisateur,
    nbPersonnes: 0,
    image: undefined,
  });
  const [image, setImage] = useState<string>();
  const [etapes, setEtapes] = useState<Etape[]>([]);
  useEffect(() => {
    if (id) {
      getRecette(id).then((data) => {
        if (data) {
          setRecette(data);
          if (data.image && data.image?.id) {
            download(data.image?.id).then((image) => {
              if (image) {
                setImage(image);
              }
            });
          }
                    // Initialiser les étapes à partir du tableau JSON
                    if (data.etapes) {
                      setEtapes(JSON.parse(data.etapes));
                    }
        }
      });
    }
  }, [id]);

  return (
    <div>
      <ReturnButton label="← Retour" />
      <div className="formulaire-container">

        <div className="recette-details">
          <h2>{recette.nom}</h2>
          <p>{recette.introduction}</p>

          <div className="details-recette">
            {image && (
              <img src={image} alt="Recipe" className="preview-image" />
            )}
            <div>
              <p>
                <strong>Temps de préparation (min.)</strong>: {recette.tpsPrepa}
              </p>
              <p>
                <strong>Temps de cuisson (min.)</strong>: {recette.tpsCuisson}
              </p>
              <p>
                <strong>Nombre de personnes</strong>: {recette.nbPersonnes}
              </p>
              <p>
                <strong>Catégorie</strong>: {recette.categorie}
              </p>
            </div>
          </div>

          <div className="etapes-container">
            {etapes.map((etape, index) => (
              <div key={index} className="etape">
                <h3>{etape.titre}</h3>
                <p>{etape.texte}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default RecetteDetails;
