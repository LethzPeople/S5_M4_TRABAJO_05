import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CharacterForm = ({ onSubmit, initialData = null, isEdit = false }) => {
  const defaultForm = {
    name: '',
    status: 'Alive',
    species: 'Human',
    gender: 'Male',
    originName: 'Earth',
    locationName: 'Earth',
    image: 'https://rickandmortyapi.com/api/character/avatar/19.jpeg',
    type: ''
  };

  const [formData, setFormData] = useState(initialData || defaultForm);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        originName: initialData.origin?.name || '',
        locationName: initialData.location?.name || ''
      });
    }
  }, [initialData]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'El nombre es obligatorio';
    if (!formData.species.trim()) newErrors.species = 'La especie es obligatoria';
    if (!formData.status) newErrors.status = 'El estado es obligatorio';
    if (!formData.gender) newErrors.gender = 'El género es obligatorio';
    if (!formData.originName) newErrors.originName = 'El origen es obligatorio';
    if (!formData.locationName) newErrors.locationName = 'La ubicación es obligatoria';
    
    // Validación simple de URL para la imagen
    if (formData.image && !formData.image.match(/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif))$/i)) {
      newErrors.image = 'URL de imagen inválida (debe terminar en .png, .jpg, .jpeg o .gif)';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const success = await onSubmit(formData);
      if (success) {
        navigate(isEdit ? '/custom' : '/characters');
      }
    } else {
      window.scrollTo(0, 0); 
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-black p-6 rounded-lg shadow-lg">
      {/* Sección de errores */}
      {Object.keys(errors).length > 0 && (
        <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
          <p className="font-bold">Por favor corrige los siguientes errores:</p>
          <ul className="list-disc ml-5">
            {Object.values(errors).map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="mb-4">
        <label htmlFor="name" className="block text-white font-medium mb-2">Nombre*</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-4 py-2 bg-black text-white border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="Nombre del personaje"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="status" className="block text-white font-medium mb-2">Estado*</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className={`w-full px-4 py-2 bg-black text-white border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 ${errors.status ? 'border-red-500' : 'border-gray-300'}`}
          >
            <option value="Alive">Vivo</option>
            <option value="Dead">Muerto</option>
            <option value="unknown">Desconocido</option>
          </select>
        </div>

        <div>
          <label htmlFor="species" className="block text-white font-medium mb-2">Especie*</label>
          <input
            type="text"
            id="species"
            name="species"
            value={formData.species}
            onChange={handleChange}
            className={`w-full px-4 py-2 bg-black text-white border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 ${errors.species ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Especie"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="gender" className="block text-white font-medium mb-2">Género*</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className={`w-full px-4 py-2 bg-black text-white border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 ${errors.gender ? 'border-red-500' : 'border-gray-300'}`}
          >
            <option value="Male">Masculino</option>
            <option value="Female">Femenino</option>
            <option value="Genderless">Sin género</option>
            <option value="unknown">Desconocido</option>
          </select>
        </div>

        <div>
          <label htmlFor="type" className="block text-white font-medium mb-2">Tipo</label>
          <input
            type="text"
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-black text-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Tipo de personaje (opcional)"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="originName" className="block text-white font-medium mb-2">Origen*</label>
          <input
            type="text"
            id="originName"
            name="originName"
            value={formData.originName}
            onChange={handleChange}
            className={`w-full px-4 py-2 bg-black text-white border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 ${errors.originName ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Planeta o lugar de origen"
          />
        </div>

        <div>
          <label htmlFor="locationName" className="block text-white font-medium mb-2">Ubicación actual*</label>
          <input
            type="text"
            id="locationName"
            name="locationName"
            value={formData.locationName}
            onChange={handleChange}
            className={`w-full px-4 py-2 bg-black text-white border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 ${errors.locationName ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Ubicación actual"
          />
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="image" className="block text-white font-medium mb-2">URL de la imagen (opcional)</label>
        <input
          type="text"
          id="image"
          name="image"
          value={formData.image}
          onChange={handleChange}
          className={`w-full px-4 py-2 bg-black text-white border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 ${errors.image ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="https://ejemplo.com/imagen.jpg"
        />
        {formData.image && (
          <div className="mt-2">
            <p className="text-white text-sm mb-2">Vista previa:</p>
            <img 
              src={formData.image} 
              alt="Vista previa" 
              className="h-32 w-32 object-cover rounded-md"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://rickandmortyapi.com/api/character/avatar/19.jpeg';
              }}
            />
          </div>
        )}
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          {isEdit ? 'Actualizar personaje' : 'Crear personaje'}
        </button>
      </div>
    </form>
  );
};

export default CharacterForm;