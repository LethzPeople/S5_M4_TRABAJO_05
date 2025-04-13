
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Layout from '../components/Layout';


import HomePage from '../pages/HomePage';
import CharacterList from '../pages/CharacterList';
import CharacterDetail from '../pages/CharacterDetail';
import CharacterCreate from '../pages/CharacterCreate';
import CharacterEdit from '../pages/CharacterEdit';
import FavoritesPage from '../pages/FavoritesPage';
import CustomCharacters from '../pages/CustomCharacters';
import NotFound from '../pages/NotFound';


import { CharacterProvider } from '../context/CharacterContext';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <CharacterProvider>
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="characters" element={<CharacterList />} />
            <Route path="characters/:id" element={<CharacterDetail />} />
            <Route path="characters/create" element={<CharacterCreate />} />
            <Route path="characters/:id/edit" element={<CharacterEdit />} />
            <Route path="favorites" element={<FavoritesPage />} />
            <Route path="custom" element={<CustomCharacters />} />
            <Route path="404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Route>
        </Routes>
      </CharacterProvider>
    </BrowserRouter>
  );
};

export default AppRouter;