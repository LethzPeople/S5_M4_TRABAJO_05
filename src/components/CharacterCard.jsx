import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCharacters } from '../context/CharacterContext';
import Swal from 'sweetalert2';

const CharacterCard = ({ character, showControls = false }) => {
  const [showDetails, setShowDetails] = useState(false);
  const { addToFavorites, removeFromFavorites, deleteCharacter, favorites } = useCharacters();

  const isFavorite = favorites.some(fav => fav.id === character.id);
  const isCustom = character.id > 826 || character.custom;

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      removeFromFavorites(character.id);
    } else {
      addToFavorites(character);
    }
  };

  const handleDelete = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Realmente deseas eliminar a "${character.name}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#16a34a',
      cancelButtonColor: '#ef4444',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCharacter(character.id);
      }
    });
  };

  return (
    <div className="bg-black rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-lg">
      <img
        src={character.image || '/no-image.png'}
        alt={character.name}
        className="w-full h-64 object-cover"
      />

      <div className="p-4">
        <h3 className="text-xl font-bold text-cyan-400 mb-2">{character.name}</h3>

        <div className="flex items-center mb-3">
          <span
            className={`inline-block w-3 h-3 rounded-full mr-2 ${character.status === 'Alive' ? 'bg-green-500' :
                character.status === 'Dead' ? 'bg-red-500' : 'bg-gray-500'
              }`}
          ></span>
          <span className="text-white">
            {character.status} - {character.species}
          </span>
        </div>

        <div className="flex space-x-2 mb-3">
          <Link
            to={`/characters/${character.id}`}
            className="text-green-600 hover:text-green-800 text-sm font-medium"
          >
            Ver detalle
          </Link>

          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-green-600 hover:text-green-800 text-sm font-medium"
          >
            {showDetails ? 'Ocultar detalles' : 'Ver resumen'}
          </button>
        </div>

        {showDetails && (
          <div className="mt-2 text-sm text-white space-y-1 bg-black border border-green-400 p-2 rounded">
            <p><span className="font-medium">Género:</span> {character.gender}</p>
            <p><span className="font-medium">Origen:</span> {character.origin?.name || 'Desconocido'}</p>
            <p><span className="font-medium">Ubicación:</span> {character.location?.name || 'Desconocido'}</p>
            <p><span className="font-medium">Creado:</span> {new Date(character.created).toLocaleDateString()}</p>
          </div>
        )}

        <div className="mt-4 flex justify-between">
          {isCustom && showControls && (
            <div className="space-y-2">
              <Link
                to={`/characters/${character.id}/edit`}
                className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600"
              >
                Editar
              </Link>
              <button
                onClick={handleDelete}
                className="px-3 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-600"
              >
                Eliminar
              </button>
            </div>
          )}

          <button
            onClick={handleFavoriteToggle}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${isFavorite
                ? 'bg-red-100 text-red-700 hover:bg-red-200'
                : 'bg-green-100 text-black hover:bg-green-500'
              }`}
          >
            {isFavorite ? '❤️ Quitar de favoritos' : '🤍 Añadir a favoritos'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;