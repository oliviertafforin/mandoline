// src/api/ingredient.tsx
import { httpClient } from "./httpClient";

// Define the type for an image
export interface Image {
  id?: string;
  libelle : string;
  path?: string;
  url?: string;
}

export const getImage = async (id: string) => {
  const response = await httpClient
    .get<Image>(`/image/${id}`)
    .catch((error) => {
      console.error("Erreur récupération de l'image : " + error);
    });
  return response?.data;
};

// Create a new image
export const createImage = async (data: Image) => {
  const response = await httpClient
    .post<Image>("/image", data)
    .catch((error) => {
      console.error("Erreur création de l'image : " + error);
    });
  return response?.data;
};

// Update an existing image
export const updateImage = async (id: string, data: Partial<Image>) => {
  const response = await httpClient
    .put<Image>(`/image/${id}`, data)
    .catch((error) => {
      console.error("Erreur màj de l'image : " + error);
    });
  return response?.data;
};

// Delete a image
export const deleteImage = async (id: string) => {
  const response = await httpClient
    .delete<void>(`/image/${id}`)
    .catch((error) => {
      console.error("Erreur suppression de l'image : " + error);
    });
  return response?.data;
};

//upload image
export const uploadImage = async (file: File, id: string) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('id', id);

  try {
    const response = await httpClient.post<Image>('image/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'upload de l'image : ", error);
    throw error;
  }
};

//download image
export const download = async (id: string) => {

  try {
    const response = await httpClient.get(`image/download/${id}`, {
      responseType : 'blob'
    });
    const imageUrl = URL.createObjectURL(new Blob([response.data]));
    return imageUrl;
  } catch (error) {
    console.error("Erreur lors de l'upload de l'image : ", error);
  }
};
