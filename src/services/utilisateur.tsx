// src/api/utilisateur.tsx
import { httpClient } from "./httpClient";

export interface Utilisateur {
  id?: string;
  pseudo: string;
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

export const getUtilisateur = async (id: string) => {
  const response = await httpClient
    .get<Utilisateur>(`/utilisateur/${id}`)
    .catch((error) => {
      console.error("Erreur récupération de l'utilisateur : " + error);
    });
  return response?.data;
};

// Create a new Utilisateur
export const createUtilisateur = async (data: Utilisateur) => {
  const response = await httpClient
    .post<Utilisateur>("/utilisateur", data)
    .catch((error) => {
      console.error("Erreur création de l'utilisateur : " + error);
    });
  return response?.data;
};

// Update an existing Utilisateur
export const updateUtilisateur = async (id: number, data: Partial<Utilisateur>) => {
  const response = await httpClient
    .put<Utilisateur>(`/utilisateur/${id}`, data)
    .catch((error) => {
      console.error("Erreur màj de l'utilisateur : " + error);
    });
  return response?.data;
};

// Delete a utilisateur
export const deleteUtilisateur = async (id: number) => {
  const response = await httpClient
    .delete<void>(`/utilisateur/${id}`)
    .catch((error) => {
      console.error("Erreur suppression de l'utilisateur : " + error);
    });
  return response?.data;
};
