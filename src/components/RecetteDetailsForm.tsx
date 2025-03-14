import React, { useEffect, useRef, useState } from "react";
import { Categorie, createRecette, getRecette, Recette, updateRecette } from "../services/recette";
import "./../styles/RecetteDetailsForm.css";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ReturnButton from "./ReturnButton";
import { useAuth } from "./utils/AuthContextType";
import { Image } from "../services/image";
function RecetteDetailsForm() {
  const { id } = useParams();
  const auth = useAuth();
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);
  //Initialisation de Recette par défaut
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

  useEffect(() => {
    if (id) {
      getRecette(id).then((data) => {
        if (data) {
          setRecette(data);
        }
      });
    }
  }, [id]);

  async function sauvegarderRecette(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Logique de soumission du formulaire
    if (recette && auth.id) {
      // Créez un objet Image
    const imagePrincipale : Image = {
      id: undefined, // L'ID peut être généré ou assigné par le serveur
      libelle: recette.nom,
      url:  "https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Begrippenlijst.svg"
    };
      const recetteModifiee = { ...recette, image : imagePrincipale};
    
      try {
        if(id){
          await updateRecette(id, recetteModifiee);
        } else{
          await createRecette(recetteModifiee);
        }
      
        console.log("Recette mise à jour avec succès");
        navigate("/recettes");
      } catch (error) {
        console.error("Erreur lors de la mise à jour de la recette :", error);
      }
    }
  }

  const handleClick = () => {
    if (fileRef.current) {
      console.log("clicjk");
      console.log(fileRef.current);
      fileRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <ReturnButton label="← Retour" />
      <div className="formulaire-container">
        <h1>{id ? "Modifier la recette" : "Écrire une nouvelle recette"}</h1>
        <p>
          Utilisez ce formulaire pour sauvegarder et partager vos recettes avec
          votre famille, vos amis ! Essayez d'être précis et clair pour que tout
          cuistot en herbe puisse réaliser votre recette sans problème !
        </p>
        <Form onSubmit={sauvegarderRecette}>
          <Form.Group className="form-group" controlId="nomRecette">
            <Form.Label>Nom de la recette</Form.Label>
            <Form.Control
              type="text"
              value={recette.nom || ""}
              onChange={(e) => setRecette({ ...recette, nom: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="form-group" controlId="introduction">
            <Form.Label>Introduction</Form.Label>
            <Form.Control
              as="textarea"
              value={recette.introduction || ""}
              onChange={(e) =>
                setRecette({ ...recette, introduction: e.target.value })
              }
            />
          </Form.Group>

          <div className="form-group details-recette">
            <div className="uploader">
              <button type="button"
                className="uploader_placeholder uploader_button icon-add-photo"
                onClick={() => handleClick()}
              >
                {image ? (
                  <img src={image} alt="Uploaded" className="preview-image" />
                ) : (
                  <div className="uploader_placeholder icon-add-photo">
                    Ajouter une photo
                  </div>
                )}
              </button>
              <input
                ref={fileRef}
                className="display-hidden"
                type="file"
                accept=".png,.jpg,.jpeg"
                id="recipeImage"
                name="recipeImage"
                onChange={handleFileChange}
              />
            </div>
            <div>
              <Form.Group
                className="details-base-recette-ligne"
                controlId="tempsPreparation"
              >
                <Form.Label>Temps de préparation</Form.Label>

                <Form.Control
                  type="text"
                  className="input-nombre"
                  inputMode="numeric"
                  maxLength={3} // Limite à 3 caractères
                  value={recette.tpsPrepa || ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Vérifiez que la valeur est un nombre
                    if (/^\d*$/.test(value)) {
                      setRecette({
                        ...recette,
                        tpsPrepa: value ? parseInt(value) : 0,
                      });
                    }
                  }}
                />
              </Form.Group>

              <Form.Group
                className="details-base-recette-ligne"
                controlId="tempsCuisson"
              >
                <Form.Label>Temps de cuisson</Form.Label>

                <Form.Control
                  className="input-nombre"
                  type="text"
                  inputMode="numeric"
                  maxLength={3} // Limite à 3 caractères
                  value={recette.tpsCuisson || ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Vérifiez que la valeur est un nombre
                    if (/^\d*$/.test(value)) {
                      setRecette({
                        ...recette,
                        tpsCuisson: value ? parseInt(value) : 0,
                      });
                    }
                  }}
                />
              </Form.Group>

              <Form.Group
                className="details-base-recette-ligne"
                controlId="nombrePersonnes"
              >
                <Form.Label>Nombre de personnes</Form.Label>
                <Form.Control
                  type="text"
                  className="input-nombre"
                  inputMode="numeric"
                  maxLength={2} // Limite à 2 caractères
                  value={recette.nbPersonnes || ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Vérifiez que la valeur est un nombre
                    if (/^\d*$/.test(value)) {
                      setRecette({
                        ...recette,
                        nbPersonnes: value ? parseInt(value) : 0,
                      });
                    }
                  }}
                />
              </Form.Group>

              <Form.Group
                controlId="categorySelect"
                className="details-base-recette-ligne"
              >
                <Form.Label>Catégorie</Form.Label>
                <Form.Select
                  value={recette.categorie}
                  onChange={(e) => {
                    setRecette({ ...recette, categorie: e.target.value });
                  }}
                >
                  <option value="">Sélectionnez une catégorie</option>
                  {Object.values(Categorie).map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </div>
          </div>

          <Button type="submit" variant="primary" className="submit-button">
            Sauvegarder
          </Button>
        </Form>
      </div>
    </div>
  );

  // return (
  //   <div className="form-container">
  //     <ReturnButton label="← Retour" />
  //     <h1>{recette?.nom}</h1>
  //     <Form onSubmit={updateRecette}>
  //       <Form.Group className="mb-3" controlId="formBasicCheckbox">
  //         <Form.Check name="avoid" type="checkbox" label="Éviter la recette" />
  //       </Form.Group>
  //       <Button variant="primary" type="submit">
  //         Submit
  //       </Button>
  //     </Form>
  //   </div>
  // );
}
export default RecetteDetailsForm;
