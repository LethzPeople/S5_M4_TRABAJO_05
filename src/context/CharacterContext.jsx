// src/context/CharacterContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

// Creamos el contexto
export const CharacterContext = createContext();

// Hook personalizado para usar el contexto
export const useCharacters = () => useContext(CharacterContext);

// Proveedor del contexto
export const CharacterProvider = ({ children }) => {
  const [characters, setCharacters] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar favoritos desde localStorage al iniciar
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // Guardar favoritos en localStorage cuando cambien
  useEffect(() => {
    if (favorites.length > 0) {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    } else {
      localStorage.removeItem('favorites');
    }
  }, [favorites]);

  // Configuración base de Axios
  const api = axios.create({
    baseURL: 'https://rickandmortyapi.com/api'
  });

  // Funciones CRUD
  const searchCharacters = async (searchTerm) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/character/?name=${searchTerm}`);
      setCharacters(response.data.results);
      toast.success(`Se encontraron ${response.data.results.length} personajes`);
      return response.data.results;
    } catch (err) {
      const errorMessage = err.response?.status === 404 
        ? "No se encontraron personajes con ese nombre" 
        : `Error: ${err.message}`;
      setError(errorMessage);
      toast.error(errorMessage);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const getRandomCharacters = async (count = 5) => {
    setLoading(true);
    setError(null);
    try {
      const maxId = 826;
      const randomIds = Array.from({ length: count }, () => 
        Math.floor(Math.random() * maxId) + 1
      );
      
      const response = await api.get(`/character/${randomIds}`);
      const result = Array.isArray(response.data) ? response.data : [response.data];
      setCharacters(result);
      toast.success(`Se cargaron ${result.length} personajes aleatorios`);
      return result;
    } catch (err) {
      setError(`Error: ${err.message}`);
      toast.error(`Error: ${err.message}`);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const getCharacterById = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/character/${id}`);
      return response.data;
    } catch (err) {
      const errorMessage = `Error al obtener el personaje: ${err.message}`;
      setError(errorMessage);
      toast.error(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createCharacter = async (characterData) => {
    setLoading(true);
    setError(null);
    try {
      const newId = Date.now();
      const newCharacter = {
        ...characterData,
        id: newId,
        created: new Date().toISOString(),
        origin: characterData.origin || { name: characterData.originName || 'Unknown' },
        location: characterData.location || { name: characterData.locationName || 'Unknown' }
      };

      const customCharacters = JSON.parse(localStorage.getItem('customCharacters') || '[]');
      

      customCharacters.push(newCharacter);

      localStorage.setItem('customCharacters', JSON.stringify(customCharacters));
      

      toast.success(`Personaje "${newCharacter.name}" creado con éxito`);
      return newCharacter;
    } catch (err) {
      const errorMessage = `Error al crear el personaje: ${err.message}`;
      setError(errorMessage);
      toast.error(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };


  const updateCharacter = async (id, characterData) => {
    setLoading(true);
    setError(null);
    try {

      const customCharacters = JSON.parse(localStorage.getItem('customCharacters') || '[]');
      

      const index = customCharacters.findIndex(char => char.id === parseInt(id));
      
      if (index === -1) {
        throw new Error('Personaje no encontrado');
      }
      

      const updatedCharacter = {
        ...customCharacters[index],
        ...characterData,
        origin: { name: characterData.originName || customCharacters[index].origin.name },
        location: { name: characterData.locationName || customCharacters[index].location.name }
      };
      
      customCharacters[index] = updatedCharacter;
      

      localStorage.setItem('customCharacters', JSON.stringify(customCharacters));
      

      const favoriteIndex = favorites.findIndex(fav => fav.id === parseInt(id));
      if (favoriteIndex !== -1) {
        const newFavorites = [...favorites];
        newFavorites[favoriteIndex] = updatedCharacter;
        setFavorites(newFavorites);
      }
      
      toast.success(`Personaje "${updatedCharacter.name}" actualizado con éxito`);
      return updatedCharacter;
    } catch (err) {
      const errorMessage = `Error al actualizar el personaje: ${err.message}`;
      setError(errorMessage);
      toast.error(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteCharacter = async (id) => {
    setLoading(true);
    setError(null);
    try {
  
      const customCharacters = JSON.parse(localStorage.getItem('customCharacters') || '[]');
      
 
      const filteredCharacters = customCharacters.filter(char => char.id !== parseInt(id));
      
      if (filteredCharacters.length === customCharacters.length) {
        throw new Error('Personaje no encontrado');
      }
      
      
      localStorage.setItem('customCharacters', JSON.stringify(filteredCharacters));
      
      
      setFavorites(prevFavorites => prevFavorites.filter(fav => fav.id !== parseInt(id)));
      
      toast.info('Personaje eliminado con éxito');
      return true;
    } catch (err) {
      const errorMessage = `Error al eliminar el personaje: ${err.message}`;
      setError(errorMessage);
      toast.error(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  
  const getCustomCharacters = () => {
    const customCharacters = JSON.parse(localStorage.getItem('customCharacters') || '[]');
    return customCharacters;
  };

  
  const addToFavorites = (character) => {
    if (!favorites.some(fav => fav.id === character.id)) {
      setFavorites(prev => [...prev, character]);
      toast.success(`"${character.name}" añadido a favoritos`);
    }
  };

  const removeFromFavorites = (characterId) => {
    setFavorites(prev => prev.filter(fav => fav.id !== characterId));
    toast.info("Personaje eliminado de favoritos");
  };

  
  const value = {
    characters,
    setCharacters,
    favorites,
    loading,
    error,
    searchCharacters,
    getRandomCharacters,
    getCharacterById,
    createCharacter,
    updateCharacter,
    deleteCharacter,
    getCustomCharacters,
    addToFavorites,
    removeFromFavorites
  };

  return (
    <CharacterContext.Provider value={value}>
      {children}
    </CharacterContext.Provider>
  );
};