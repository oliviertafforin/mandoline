// src/api/recette.tsx
import { httpClient } from "./httpClient";
import { Image } from "./image";

// Define the type for a Recette
export interface ResultatRecherche {
  id?: string;
  nom: string;
  type: string;
  description: string;
  image: Image;
}

//tous les resultats pour une query
export const recherche = async (query : string) => {
  const response = await httpClient
    .get<ResultatRecherche[]>(`/recherche/${query}`)
    .catch((error) => {
      console.error("Erreur recherche: " + error);
    });
  return response?.data;
};


// precharge avec un max de données
export const prechargement = async () => {
    const response = await httpClient
      .get<ResultatRecherche[]>(`/recherche`)
      .catch((error) => {
        console.error("Erreur recherche: " + error);
      });
    return response?.data;
  };
  