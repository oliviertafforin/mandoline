// src/api/utilisateur.tsx
import { toast } from "react-toastify";
import { Image } from "./image";
import { httpClient } from "./httpClient";
import { Recette } from "./recette";

export interface Utilisateur {
  id?: string;
  role? : string | undefined;
  pseudo?: string | undefined;
  avatar? : Image | undefined;
  recettesLikees? : Recette[] | undefined;
}

// Fetch all utilisateurs
export const fetchUtilisateurs = async () => {
  const response = await httpClient
    .get<Utilisateur[]>(`/utilisateur`)
    .catch((error) => {
      console.error("Erreur récupération des utilisateurs : " + error);
    });
  return response?.data;
};

//AUTH LOGIN
export const login = async (pseudo: string, mdp: string) => {
  const response = await httpClient
  .post("/auth/login", { pseudo, mdp })
  .catch((error) => {
    console.error("Erreur connexion utilisateur : " + error);
    toast.error("Pseudo/mdp incorrect");
  });
  return response;
};

export const getUtilisateur = async (id: string) => {
  const response = await httpClient
    .get<Utilisateur>(`/utilisateurs/${id}`)
    .catch((error) => {
      console.error("Erreur récupération de l'utilisateur : " + error);
    });
  return response?.data;
};

export const likeRecette = async (id: string, idRecette: string) => {
  const response = await httpClient
    .post<void>(`/utilisateurs/${id}/recettes-preferees/${idRecette}`)
    .catch((error) => {
      console.error("Erreur like recette : " + error);
    });
  return response?.data;
};

export const getRecetteLikees = async (id: string) => {
  const response = await httpClient
    .get<Recette[]>(`/utilisateurs/${id}/recettes-preferees`)
    .catch((error) => {
      console.error("Erreur récupération recettes likées : " + error);
    });
  return response?.data;
};

// Create a new Utilisateur
export const createUtilisateur = async (data: Utilisateur) => {
  const response = await httpClient
    .post<Utilisateur>("/utilisateurs", data)
    .catch((error) => {
      console.error("Erreur création de l'utilisateur : " + error);
    });
  return response?.data;
};

// Update an existing Utilisateur
export const updateUtilisateur = async (
  id: number,
  data: Partial<Utilisateur>
) => {
  const response = await httpClient
    .put<Utilisateur>(`/utilisateurs/${id}`, data)
    .catch((error) => {
      console.error("Erreur màj de l'utilisateur : " + error);
    });
  return response?.data;
};

// Delete a utilisateur
export const deleteUtilisateur = async (id: number) => {
  const response = await httpClient
    .delete<void>(`/utilisateurs/${id}`)
    .catch((error) => {
      console.error("Erreur suppression de l'utilisateur : " + error);
    });
  return response?.data;
};
