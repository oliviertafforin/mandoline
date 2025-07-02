// src/api/recette.tsx
import { httpClient } from "./httpClient";
import { Utilisateur } from "./utilisateur";
import { Image } from "./image";

// Define the type for a Recette
export interface Recette {
  id?: string;
  nom: string;
  introduction?: string | undefined;
  nbPersonnes?: number | undefined;
  tpsCuisson?: number | undefined;
  temperature?: number | undefined;
  tpsPrepa?: number | undefined;
  proprietaire?: Utilisateur | undefined;
  categorie?: string;
  etapes?: string;
  image?: Image | undefined;
}

export enum Categorie {
  Aperitif = "Apéritif",
  Boissons = "Boissons",
  Bases = "Bases",
  Plats = "Plats",
  Entrees = "Entrées",
  Desserts = "Desserts",
}

const requestMapping = "/recettes";

// Définir une interface pour les étapes
export interface Etape {
  titre: string;
  texte: string;
}

// Fetch all recettes
export const fetchRecettes = async (
  page: number,
  size: number,
  sortBy: string,
  sortDir: string,
  categories: string[] = [],
  filtreNom?: string,
  
) => {
  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
    sort: `${sortBy},${sortDir}`,
  });
  if (filtreNom) {
    params.append("nom", filtreNom);
  }
  
  categories.forEach((cat) => params.append("criteres", cat));

  const response = await httpClient
  .get(requestMapping+`?${params.toString()}`)
    .catch((error) => {
      console.error("Erreur récupération des recettes : " + error);
    });
  return response?.data;
};

export const getRecette = async (id: string) => {
  const response = await httpClient
    .get<Recette>(requestMapping+`/${id}`)
    .catch((error) => {
      console.error("Erreur récupération de la recette : " + error);
    });
  return response?.data;
};

// Create a new recette
export const createRecette = async (data: Recette) => {
  const response = await httpClient
    .post<Recette>(requestMapping, data)
    .catch((error) => {
      console.error("Erreur création de la recette : " + error);
    });
  return response?.data;
};

// Update an existing recette
export const updateRecette = async (id: string, data: Partial<Recette>) => {
  const response = await httpClient
    .put<Recette>(requestMapping+`/${id}`, data)
    .catch((error) => {
      console.error("Erreur màj de la recette : " + error);
    });
  return response?.data;
};

// Delete a recette
export const deleteRecette = async (id: string) => {
  const response = await httpClient
    .delete<void>(requestMapping+`/${id}`)
    .catch((error) => {
      console.error("Erreur suppression de la recette : " + error);
    });
  return response?.data;
};
