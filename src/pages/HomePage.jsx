import React from 'react';
import { Link } from 'react-router-dom';
import SearchForm from '../components/SearchForm';

const HomePage = () => {
  return (
    <div className="flex flex-col space-y-6">
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold text-green-400 mb-4">¡Bienvenido a Rick and Morty Explorer!</h1>
        <p className="text-white text-lg max-w-2xl mx-auto mb-8">
          Explora el multiverso de Rick and Morty: busca personajes, crea tus propios personajes
          y guarda tus favoritos para futuras referencias.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          <Link 
            to="/characters"
            className="bg-black p-6 rounded-lg shadow-md hover:shadow-lg transition-all hover:transform hover:scale-105"
          >
            <h2 className="text-xl font-bold text-green-400 mb-2">Explorar personajes</h2>
            <p className="text-gray-300">Busca entre cientos de personajes de la serie</p>
          </Link>
          
          <Link 
            to="/characters/create"
            className="bg-black p-6 rounded-lg shadow-md hover:shadow-lg transition-all hover:transform hover:scale-105"
          >
            <h2 className="text-xl font-bold text-green-400 mb-2">Crear personaje</h2>
            <p className="text-gray-300">Crea tu propio personaje del universo</p>
          </Link>
          
          <Link 
            to="/favorites"
            className="bg-black p-6 rounded-lg shadow-md hover:shadow-lg transition-all hover:transform hover:scale-105"
          >
            <h2 className="text-xl font-bold text-green-400 mb-2">Ver favoritos</h2>
            <p className="text-gray-300">Accede rápidamente a tus personajes guardados</p>
          </Link>
        </div>
      </div>

      <SearchForm />
    </div>
  );
};

export default HomePage;