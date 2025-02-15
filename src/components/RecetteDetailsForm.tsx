import React, { useEffect, useState } from "react";
import { getRecette, Recette } from "../services/recette";
import "./../styles/RecetteDetailsForm.css";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ReturnButton from "./ReturnButton";
function RecetteDetailsForm() {
  const { id } = useParams();

  const [Recette, setRecette] = useState<Recette | null>(null);

  useEffect(() => {
    if (id) {
      getRecette(id).then((data) => {
        if (data) {
          setRecette(data);
        } else {
          setRecette(null);
        }
      });
    }
  }, [id]);

  async function updateRecette(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("soumission du formulaire");
    const formData = new FormData(e.currentTarget);

    const formValues = {
      avoid: formData.get("avoid"),
    };

    console.log(formData.get("avoid"));
    console.log(formValues);
  }

  return (
    <div className="form-container">
      <ReturnButton label="← Retour" />
      <h1>{Recette?.nom}</h1>
      <Form onSubmit={updateRecette}>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check name="avoid" type="checkbox" label="Éviter la recette" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
export default RecetteDetailsForm;
