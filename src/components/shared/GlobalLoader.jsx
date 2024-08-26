import React from 'react';
import { useLoader } from '../../services/LoaderContext';
const GlobalLoader = () => {
  const { loading } = useLoader();
  if (!loading) return null;
  return (
    <div className="loader-container">
      <div className="loader"></div>
    </div>
  );
};

export default GlobalLoader;