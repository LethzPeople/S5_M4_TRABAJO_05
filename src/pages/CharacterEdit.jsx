import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCharacters } from '../context/CharacterContext';
import CharacterForm from '../components/CharacterForm';
import Loader from '../components/Loader';

const CharacterEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateCharacter, loading } = useCharacters();
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    
    const customCharacters = JSON.parse(localStorage.getItem('customCharacters') || '[]');
    const foundCharacter = customCharacters.find(c => c.id === parseInt(id));
    
    if (foundCharacter) {
      setCharacter(foundCharacter);
    } else {
      navigate('/404');
    }
  }, [id, navigate]);

  const handleUpdate = async (formData) => {
    return await updateCharacter(id, formData);
  };

  if (loading) return <Loader />;

  return (
    <div>
      <h1 className="text-3xl font-bold text-cyan-400 mb-6">Editar personaje</h1>
      {character ? (
        <CharacterForm 
          onSubmit={handleUpdate} 
          initialData={character} 
          isEdit={true} 
        />
      ) : (
        <p className="text-white">Cargando personaje...</p>
      )}
    </div>
  );
};

export default CharacterEdit;