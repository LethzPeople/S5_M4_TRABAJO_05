import React from 'react';
import { Link } from 'react-router-dom';
import CharacterCard from '../components/CharacterCard';
import { useCharacters } from '../context/CharacterContext';

const FavoritesPage = () => {
  const { favorites } = useCharacters();

  return (
    <div>
      <h1 className="text-3xl font-bold text-cyan-400 mb-6">Mis personajes favoritos</h1>
      
      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favorites.map(character => (
            <CharacterCard
              key={character.id}
              character={character}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-black rounded-lg">
          <h2 className="text-2xl font-bold text-cyan-400 mb-4">No tienes favoritos</h2>
          <p className="text-white max-w-lg mx-auto mb-6">
            Explora los personajes y añade algunos a tus favoritos para verlos aquí.
          </p>
          <Link 
            to="/characters" 
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
          >
            Explorar personajes
          </Link>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
