// src/api/ingredient.tsx
import { httpClient } from "./httpClient";
import { Ingredient } from "./ingredient";
import { Utilisateur } from "./utilisateur";

// Define the type for a ingredient
export interface IngredientUtilisateur {
  ingredient?: Ingredient;
  utilisateur?: Utilisateur;
  prixUnite: number;
  prixKilo: number;
  eviter: boolean;
  saison: number[];
  remplacements: Ingredient[];
}

export const getIngredientUtilisateur = async (
  idIngredient: string,
  idUtilisateur: string
) => {
  const response = await httpClient
    .get<IngredientUtilisateur>(
      `/utilisateurs/${idUtilisateur}/ingredients/${idIngredient}`
    )
    .catch((error) => {
      console.error(
        "Erreur récupération de l'ingredient de l'utilisateur : " + error
      );
    });
  return response?.data;
};

// // Create a new ingredient
// export const createIngredientUtilisateur = async (data: IngredientUtilisateur) => {
//   const response = await httpClient
//     .post<IngredientUtilisateur>("/ingredient/utilisateur", data)
//     .catch((error) => {
//       console.error("Erreur création de l'ingredient de l'utilisateur: " + error);
//     });
//   return response?.data;
// };

// Update an existing ingredient
export const updateIngredientUtilisateur = async (idIngredient:string, idUtilisateur: string, data: Partial<IngredientUtilisateur>) => {
  const response = await httpClient
    .put<IngredientUtilisateur>(`/utilisateurs/${idUtilisateur}/ingredients/${idIngredient}`, data)
    .catch((error) => {
      console.error("Erreur màj de l'ingredient de l'utilisateur : " + error);
    });
  return response?.data;
};
