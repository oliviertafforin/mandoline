import React, { useEffect, useState } from "react";
import ReturnButton from "./ReturnButton";
import { Image } from "react-bootstrap";
import { getRecette, Recette } from "../services/recette";

import "./../styles/RecetteDetails.css";
import { useParams } from "react-router-dom";

function RecetteDetails() {
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

  return (
    <div className="recette">
      <ReturnButton />
      <h1>{Recette?.nom}</h1>
      <Image className="icone-recette" src={Recette?.image.url} roundedCircle />
      <div></div>
    </div>
  );
}
export default RecetteDetails;
