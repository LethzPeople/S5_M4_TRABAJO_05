import React from 'react';
import { Link } from 'react-router-dom';
import CharacterCard from '../components/CharacterCard';
import { useCharacters } from '../context/CharacterContext';

const CustomCharacters = () => {
  const { getCustomCharacters } = useCharacters();
  const customCharacters = getCustomCharacters();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-cyan-400">Mis personajes creados</h1>
        <Link 
          to="/characters/create" 
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
        >
          Crear nuevo
        </Link>
      </div>
      
      {customCharacters.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {customCharacters.map(character => (
            <CharacterCard
              key={character.id}
              character={character}
              showControls={true}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-black rounded-lg">
          <h2 className="text-2xl font-bold text-cyan-400 mb-4">No has creado personajes</h2>
          <p className="text-white max-w-lg mx-auto mb-6">
            Crea tu primer personaje personalizado del universo de Rick and Morty.
          </p>
          <Link 
            to="/characters/create" 
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
          >
            Crear mi personaje
          </Link>
        </div>
      )}
    </div>
  );
};

export default CustomCharacters;