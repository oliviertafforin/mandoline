// src/api/ingredient.tsx
import { httpClient } from "./httpClient";
import { Image } from "./image";

// Define the type for a ingredient
export interface Ingredient {
  id?: string;
  nom : string;
  image: Image;
}

// Fetch all ingredients
export const fetchIngredients = async () => {
  const response = await httpClient
    .get<Ingredient[]>(`/ingredient`)
    .catch((error) => {
      console.error("Erreur récupération des ingredients : " + error);
    });
    
  return response?.data;
};

export const getIngredient = async (id: string) => {
  const response = await httpClient
    .get<Ingredient>(`/ingredient/${id}`)
    .catch((error) => {
      console.error("Erreur récupération de l'ingredient : " + error);
    });
  return response?.data;
};

// Create a new ingredient
export const createIngredient = async (data: Ingredient) => {
  const response = await httpClient
    .post<Ingredient>("/ingredient", data)
    .catch((error) => {
      console.error("Erreur création de l'ingredient : " + error);
    });
  return response?.data;
};

// Update an existing ingredient
export const updateIngredient = async (id: number, data: Partial<Ingredient>) => {
  const response = await httpClient
    .put<Ingredient>(`/ingredient/${id}`, data)
    .catch((error) => {
      console.error("Erreur màj de l'ingredient : " + error);
    });
  return response?.data;
};

// Delete a ingredient
export const deleteIngredient = async (id: number) => {
  const response = await httpClient
    .delete<void>(`/ingredient/${id}`)
    .catch((error) => {
      console.error("Erreur suppression de l'ingredient : " + error);
    });
  return response?.data;
};
