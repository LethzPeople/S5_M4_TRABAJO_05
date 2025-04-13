import React, { useState } from 'react';
import { useCharacters } from '../context/CharacterContext';
import { useNavigate } from 'react-router-dom';

const SearchForm = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [characterCount, setCharacterCount] = useState(5);
  const { searchCharacters, getRandomCharacters } = useCharacters();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      const results = await searchCharacters(searchTerm);
      if (results && results.length > 0) {
        navigate('/characters');
      }
    }
  };

  const handleCountChange = (e) => {
    const value = parseInt(e.target.value);
    setCharacterCount(value > 0 ? value : 1);
  };

  const handleRandomSearch = async () => {
    const results = await getRandomCharacters(characterCount);
    if (results && results.length > 0) {
      navigate('/characters');
    }
  };

  return (
    <div className="bg-black p-6 rounded-lg shadow-md mb-6">
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-4">
          <label htmlFor="search" className="block text-white font-medium mb-2">
            Buscar personajes
          </label>
          <div className="flex">
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Ingresa el nombre de un personaje..."
              className="flex-grow px-4 py-2 bg-black text-white border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
            <button
              type="submit"
              className="bg-green-600 text-black px-4 py-2 rounded-r-md hover:bg-green-700 transition-colors"
            >
              Buscar
            </button>
          </div>
        </div>
      </form>

      <div className="bg-black p-4 rounded-md border border-green-500">
        <h3 className="text-lg font-medium text-white mb-3">Obtener personajes aleatorios</h3>
        <div className="flex items-center">
          <div className="mr-4">
            <label htmlFor="character-count" className="block text-sm text-white mb-1">
              Cantidad de personajes
            </label>
            <input
              type="number"
              id="character-count"
              min="1"
              max="20"
              value={characterCount}
              onChange={handleCountChange}
              className="w-16 px-2 py-1 bg-black text-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <button
            onClick={handleRandomSearch}
            className="bg-green-600 text-black px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
          >
            Obtener aleatorios
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;