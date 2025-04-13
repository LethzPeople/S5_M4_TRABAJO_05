import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/logo.png';
import { useCharacters } from '../context/CharacterContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { favorites } = useCharacters();

  const navLinkClass = ({ isActive }) => 
    isActive ? "text-green-300 transition" : "hover:text-green-200 transition";

  return (
    <header className="bg-black text-white py-4 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/">
              <img src={logo} alt="Rick and Morty Logo" className="h-12" />
            </Link>
          </div>

          {/* Menú para escritorio */}
          <div className="hidden md:flex space-x-6">
            <NavLink to="/" className={navLinkClass}>Inicio</NavLink>
            <NavLink to="/characters" end className={navLinkClass}>Personajes</NavLink>
            <NavLink to="/characters/create" className={navLinkClass}>Crear Personaje</NavLink>
            <NavLink to="/custom" className={navLinkClass}>Mis Personajes</NavLink>
            <NavLink to="/favorites" className={navLinkClass}>
              Favoritos {favorites.length > 0 && `(${favorites.length})`}
            </NavLink>
          </div>

          {/* Botón para menú móvil */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Menú móvil */}
        {isMenuOpen && (
          <div className="mt-4 md:hidden">
            <div className="flex flex-col space-y-4 pb-3">
              <NavLink to="/" className={navLinkClass} onClick={() => setIsMenuOpen(false)}>Inicio</NavLink>
              <NavLink to="/characters" className={navLinkClass} onClick={() => setIsMenuOpen(false)}>Personajes</NavLink>
              <NavLink to="/characters/create" className={navLinkClass} onClick={() => setIsMenuOpen(false)}>Crear Personaje</NavLink>
              <NavLink to="/custom" className={navLinkClass} onClick={() => setIsMenuOpen(false)}>Mis Personajes</NavLink>
              <NavLink to="/favorites" className={navLinkClass} onClick={() => setIsMenuOpen(false)}>
                Favoritos {favorites.length > 0 && `(${favorites.length})`}
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;