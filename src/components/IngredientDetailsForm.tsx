import React, { useEffect, useState } from "react";
import { getIngredient, Ingredient } from "../services/ingredient";
import "./../styles/IngredientDetailsForm.css";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ReturnButton from "./ReturnButton";
function IngredientDetailsForm() {
  const { id } = useParams();

  const [Ingredient, setIngredient] = useState<Ingredient | null>(null);

  useEffect(() => {
    if (id) {
      getIngredient(id).then((data) => {
        if (data) {
          setIngredient(data);
        } else {
          setIngredient(null);
        }
      });
    }
  }, [id]);

  async function updateIngredient(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("soumission du formulaire");
    const formData = new FormData(e.currentTarget);

    console.log(formData);

    const formValues = {
      avoid: formData.get('avoid')
    }

    console.log(formData.get('avoid'));
    console.log(formValues);
  }

  return (
    <div className="form-container">
      <ReturnButton label="← Retour" />
      <h1>{Ingredient?.nom}</h1>
      <Form onSubmit={updateIngredient}>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check name="avoid" type="checkbox" label="Éviter l'ingrédient" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
export default IngredientDetailsForm;
