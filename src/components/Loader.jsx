import React from 'react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center py-8">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-400"></div>
      <span className="ml-3 text-lg text-black">Cargando...</span>
    </div>
  );
};

export default Loader;