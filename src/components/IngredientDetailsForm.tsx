import React, { useEffect, useRef, useState } from "react";
import {
  getIngredient,
  Ingredient,
  updateIngredient,
} from "../services/ingredient";
import styles from "./../styles/IngredientDetailsForm.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Modal, Form } from 'react-bootstrap';
import ReturnButton from "./ReturnButton";
import {
  IngredientUtilisateur,
  getIngredientUtilisateur,
  updateIngredientUtilisateur,
} from "../services/ingredient_utilisateur";
import { useAuth } from "./utils/AuthContextType";
import {
  createImage,
  download,
  updateImage,
  Image,
  uploadImage,
} from "../services/image";

function IngredientDetailsForm() {
  const auth = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const [ingredient, setIngredient] = useState<Ingredient>({
    nom: "",
    image: undefined,
  });
  const fileRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [ingredientUtilisateur, setIngredientUtilisateur] =
    useState<IngredientUtilisateur>({
      utilisateur: auth.utilisateur,
      ingredient: ingredient,
      prixKilo: 0,
      prixUnite: 0,
      eviter: false,
      saison: [],
      remplacements: [],
    });
  const [image, setImage] = useState<string>();
  const [nomImage, setNomImage] = useState<string>();
  const [showModalSuppression, setShowModalSuppression] = useState(false);
  const handleShowModalSuppression = () => setShowModalSuppression(true);
  const handleCloseModalSuppression = () => setShowModalSuppression(false);

  useEffect(() => {
    if (id) {
      getIngredient(id).then((data) => {
        if (data) {
          setIngredient(data);
          if (data.image && data.image?.id) {
            download(data.image?.id).then((image) => {
              if (image) {
                setImage(image);
              }
            });
          }
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
  }, []);

  async function sauvegarderIngredient(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (ingredient && id && auth.id) {
      // Créez un objet Image
      let imagePrincipale: Image | undefined = {
        libelle: ingredient.nom,
        path: ingredient.image?.path,
      };

      //update ou create l'imageDTO
      if (ingredient.image?.id) {
        imagePrincipale = await updateImage(
          ingredient.image?.id,
          imagePrincipale
        );
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
      const updatedIngredient = { ...ingredient, image: imagePrincipale };
      const updatedIngredientUtilisateur = { ...ingredientUtilisateur };

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

  const handleClick = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

   const handleDelete = () => {
    // Logique de suppression ici
    console.log('Élément supprimé');
    setShowModalSuppression(false);
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
      <div className={styles.container}>
        <div className={styles.titre}>
          <h1>
            {id ? "Modifier l'ingrédient" : "Ajouter un nouvel ingrédient"}
          </h1>
          <Button
            type="submit"
            variant="primary"
            className={styles.submitButton}
            form="formulaireIngredient"
          >
            Sauvegarder
          </Button>
          <Button
            type="button"
            variant="danger"
            className={styles.deleteButton}
            onClick={handleShowModalSuppression}
          >
            Supprimer
          </Button>

          <Modal show={showModalSuppression} onHide={handleCloseModalSuppression} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmer la suppression</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Êtes-vous sûr de vouloir supprimer cet ingrédient ? Cette action est irréversible.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModalSuppression}>
            Annuler
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Supprimer
          </Button>
        </Modal.Footer>
      </Modal>
        </div>

        <p>
          Utilisez ce formulaire pour sauvegarder vos informations concernant un
          ingrédient particulier ! Ces modifications vous sont propres afin de
          permettre au mieux d'affiner vos recherches de recette en fonction de
          vos préférences et votre budget !
        </p>
        <Form id="formulaireIngredient" onSubmit={sauvegarderIngredient}>
          <div className={`${styles.formGroup} ${styles.detailsRecette}`}>
            <div className={styles.uploader}>
              <button
                type="button"
                className={`${styles.uploaderPlaceholder} ${styles.uploaderButton} ${styles.iconAddPhoto}`}
                onClick={() => handleClick()}
              >
                {image ? (
                  <img
                    src={image}
                    alt="Uploaded"
                    className={styles.previewImage}
                  />
                ) : (
                  <div
                    className={`${styles.uploaderPlaceholder} ${styles.iconAddPhoto}`}
                  >
                    Ajouter une photo
                  </div>
                )}
              </button>
              <input
                ref={fileRef}
                type="file"
                accept=".png,.jpg,.jpeg"
                id="recipeImage"
                name="recipeImage"
                onChange={handleFileChange}
              />
            </div>
            <div>
              <Form.Group controlId="formNom" className={styles.ligneDetail}>
                <Form.Label>Nom</Form.Label>
                <Form.Control
                  type="text"
                  value={ingredient.nom}
                  onChange={(e) =>
                    setIngredient({ ...ingredient, nom: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group
                controlId="formPrixUnite"
                className={styles.ligneDetail}
              >
                <Form.Label>Prix à l'unité</Form.Label>
                <Form.Control
                  type="text"
                  className={styles.inputNumerique}
                  inputMode="numeric"
                  value={ingredientUtilisateur.prixUnite}
                  onChange={(e) =>
                    setIngredientUtilisateur({
                      ...ingredientUtilisateur,
                      prixUnite: Number(e.target.value),
                    })
                  }
                />
              </Form.Group>

              <Form.Group
                controlId="formPrixKilo"
                className={styles.ligneDetail}
              >
                <Form.Label>Prix au kilo</Form.Label>
                <Form.Control
                  type="text"
                  className={styles.inputNumerique}
                  inputMode="numeric"
                  value={ingredientUtilisateur.prixKilo}
                  onChange={(e) =>
                    setIngredientUtilisateur({
                      ...ingredientUtilisateur,
                      prixKilo: Number(e.target.value),
                    })
                  }
                />
              </Form.Group>

              <Form.Group controlId="formEviter" className={styles.ligneDetail}>
                <Form.Check
                  type="checkbox"
                  className={styles.inputCheck}
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
            </div>
          </div>
          <Form.Group controlId="formSaison">
            <Form.Label>Mois à préférer</Form.Label>
            {[...Array(12).keys()].map((monthIndex) => (
              <Form.Check
                key={monthIndex}
                type="checkbox"
                label={new Intl.DateTimeFormat("fr-FR", {
                  month: "long",
                }).format(new Date(0, monthIndex))}
                checked={ingredientUtilisateur.saison.includes(monthIndex)}
                onChange={(e) => {
                  const saison = e.target.checked
                    ? [...ingredientUtilisateur.saison, monthIndex]
                    : ingredientUtilisateur.saison.filter(
                        (month) => month !== monthIndex
                      );
                  setIngredientUtilisateur({
                    ...ingredientUtilisateur,
                    saison,
                  });
                }}
              />
            ))}
          </Form.Group>
        </Form>
      </div>
    </div>
  );
}

export default IngredientDetailsForm;
