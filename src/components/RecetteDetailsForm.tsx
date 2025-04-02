import React, { useEffect, useRef, useState } from "react";
import {
  Categorie,
  createRecette,
  getRecette,
  Recette,
  updateRecette,
} from "../services/recette";
import "./../styles/RecetteDetailsForm.css";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ReturnButton from "./ReturnButton";
import { useAuth } from "./utils/AuthContextType";
import {
  createImage,
  download,
  Image,
  updateImage,
  uploadImage,
} from "../services/image";

// Définir une interface pour les étapes
interface Etape {
  titre: string;
  texte: string;
}

function RecetteDetailsForm() {
  const { id } = useParams();
  const auth = useAuth();
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [etapes, setEtapes] = useState<Etape[]>([]);
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
  const [nomImage, setNomImage] = useState<string>();

  useEffect(() => {
    if (id) {
      getRecette(id).then((data) => {
        if (data) {
          console.log(data);
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ajouterEtape = () => {
    setEtapes([...etapes, { titre: "", texte: "" }]);
  };

  const supprimerEtape = (index: number) => {
    const nouvellesEtapes = [...etapes];
    nouvellesEtapes.splice(index, 1);
    setEtapes(nouvellesEtapes);
  };

  const modifierEtape = (index: number, champ: keyof Etape, valeur: string) => {
    const nouvellesEtapes = [...etapes];
    nouvellesEtapes[index][champ] = valeur;
    setEtapes(nouvellesEtapes);
  };

  async function sauvegarderRecette(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Logique de soumission du formulaire
    if (recette && auth.id) {
      // Créez un objet Image
      let imagePrincipale: Image | undefined = {
        libelle: recette.nom,
        path: recette.image?.path,
      };

      //update ou create l'imageDTO
      if (recette.image?.id) {
        imagePrincipale = await updateImage(recette.image?.id, imagePrincipale);
      } else {
        imagePrincipale.path = nomImage;
        imagePrincipale = await createImage(imagePrincipale);
      }
      if (imagePrincipale === undefined || imagePrincipale.id === undefined) {
        console.error("Erreur mise à jour de l'image");
        return;
      }

      //upload l'image => màj le path
      if (selectedFile) {
        imagePrincipale = await uploadImage(selectedFile, imagePrincipale.id);
      }

      const recetteModifiee = {
        ...recette,
        image: imagePrincipale,
        etapes: JSON.stringify(etapes),
      };

      try {
        if (id) {
          await updateRecette(id, recetteModifiee);
        } else {
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
        setNomImage(file.name);
      };
      reader.readAsDataURL(file);
      setSelectedFile(file);
    }
  };

  return (
    <div>
      <ReturnButton label="← Retour" />
      <div className="formulaire-container">
        <div className="label-titre-etape">
          <h1>{id ? "Modifier la recette" : "Écrire une nouvelle recette"}</h1>
          <Button
            type="submit"
            variant="primary"
            className="submit-button"
            form="formulaireRecette"
          >
            Sauvegarder
          </Button>
        </div>

        <p>
          Utilisez ce formulaire pour sauvegarder et partager vos recettes avec
          votre famille, vos amis ! Essayez d'être précis et clair pour que tout
          cuistot en herbe puisse réaliser votre recette sans problème !
        </p>
        <Form id="formulaireRecette" onSubmit={sauvegarderRecette}>
          <Form.Group className="form-group" controlId="nomRecette">
            <Form.Label>Nom de la recette</Form.Label>
            <Form.Control
              type="text"
              maxLength={32}
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
              <button
                type="button"
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
                <Form.Label>Temps de préparation (min.)</Form.Label>

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
                <Form.Label>Temps de cuisson (min.)</Form.Label>

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

          <div className="etapes-container">
            <h2>Étapes de la recette</h2>
            <Button variant="secondary" onClick={ajouterEtape}>
              Ajouter une étape
            </Button>
            {etapes.map((etape, index) => (
              <div key={index} className="etape">
                <Form.Group controlId={`etape-titre-${index}`}>
                  <div className="label-titre-etape">
                    <Form.Label className="labels">Titre de l'étape</Form.Label>
                    <div className="div-supprimer-etape">
                      <Button
                        className="supprimer-etape-bouton"
                        variant="danger"
                        size="sm"
                        onClick={() => supprimerEtape(index)}
                      >
                        <i
                          className="bi-trash3-fill"
                          style={{ color: "white" }}
                        />
                      </Button>
                    </div>
                  </div>
                  <Form.Control
                    type="text"
                    maxLength={32}
                    value={etape.titre}
                    onChange={(e) =>
                      modifierEtape(index, "titre", e.target.value)
                    }
                  />
                </Form.Group>
                <Form.Group
                  className="texte-etape"
                  controlId={`etape-texte-${index}`}
                >
                  <Form.Label className="labels">Texte de l'étape</Form.Label>
                  <Form.Control
                    as="textarea"
                    value={etape.texte}
                    maxLength={2048}
                    onChange={(e) =>
                      modifierEtape(index, "texte", e.target.value)
                    }
                  />
                </Form.Group>
              </div>
            ))}
          </div>
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
