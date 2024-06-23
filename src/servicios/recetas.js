import axios from 'axios';

const url = 'https://66663bb1a2f8516ff7a2e4b0.mockapi.io/recetas';

export const getAll = async () => {
  try {
    const { data: recetas } = await axios.get(url);
    return recetas;
  } catch (error) {
    console.error('Error productos GET:', error);
    return [];
  }
};

export const getById = async (id) => {
  try {
    const { data: receta } = await axios.get(`${url}/${id}`);
    return receta;
  } catch (error) {
    console.error('Error productos GET by ID:', error);
    return null;
  }
};

export const create = async (receta) => {
  try {
    const { data: nuevaReceta } = await axios.post(url, receta);
    return nuevaReceta;
  } catch (error) {
    console.error('Error productos POST:', error);
    throw error;
  }
};

export const update = async (id, receta) => {
  try {
    const { data: recetaActualizada } = await axios.put(`${url}/${id}`, receta);
    return recetaActualizada;
  } catch (error) {
    console.error('Error productos PUT:', error);
    throw error;
  }
};

export const remove = async (id) => {
  try {
    await axios.delete(`${url}/${id}`);
  } catch (error) {
    console.error('Error productos DELETE:', error);
    throw error;
  }
};
