// src/api/recette.tsx
import { httpClient } from "./httpClient";

// Define the type for a Recette
export interface Recette {
  id?: string;
  nom: string;
  instruction: string;
  temperature: number;
  tpsCuisson: number;
  tpsPrepa: number;
}

// Fetch all recettes
export const fetchRecettes = async () => {
  const response = await httpClient
    .get<Recette[]>(`/recette`)
    .catch((error) => {
      console.error("Erreur récupération des recettes : " + error);
    });
  return response?.data;
};

export const getRecette = async (id: string) => {
  const response = await httpClient
    .get<Recette>(`/recette/${id}`)
    .catch((error) => {
      console.error("Erreur récupération de la recette : " + error);
    });
  return response?.data;
};

// Create a new recette
export const createRecette = async (data: Recette) => {
  const response = await httpClient
    .post<Recette>("/recette", data)
    .catch((error) => {
      console.error("Erreur création de la recette : " + error);
    });
  return response?.data;
};

// Update an existing recette
export const updateRecette = async (id: number, data: Partial<Recette>) => {
  const response = await httpClient
    .put<Recette>(`/recette/${id}`, data)
    .catch((error) => {
      console.error("Erreur màj de la recette : " + error);
    });
  return response?.data;
};

// Delete a recette
export const deleteRecette = async (id: number) => {
  const response = await httpClient
    .delete<void>(`/recette/${id}`)
    .catch((error) => {
      console.error("Erreur suppression de la recette : " + error);
    });
  return response?.data;
};
