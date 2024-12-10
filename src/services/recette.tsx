// src/api/recette.tsx
import { httpClient } from './httpClient';

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
export const fetchRecettes = () => {
  return httpClient.get<Recette[]>('/recette'); // Response will be an array of Recette
};

  export const getRecette = async (id: string) => {
    const response = await httpClient.get(`/recetgte/${id}`).catch(error => {console.error("Erreur récupération de la recette : "+error)});
    return response?.data;
};

// Create a new recette
export const createRecette = (data: Recette) => {
  return httpClient.post<Recette>('/recette', data); // Response will be a Recette
};

// Update an existing recette
export const updateRecette = (id: number, data: Partial<Recette>) => {
  return httpClient.put<Recette>(`/recette/${id}`, data); // Response will be a Recette
};

// Delete a recette
export const deleteRecette = (id: number) => {
  return httpClient.delete<void>(`/recette/${id}`); // Response will have no data
};
