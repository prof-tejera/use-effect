import React, { useState } from 'react';
import countries from '../countries.json';

export const MapContext = React.createContext({});

const MapProvider = ({ children }) => {
  const [favorites, setFavorites] = useState({});

  const toggleFavorite = country_code => {
    const newFavorites = { ...favorites };

    if (newFavorites[country_code]) {
      delete newFavorites[country_code];
    } else {
      newFavorites[country_code] = true;
    }

    setFavorites(newFavorites);
  };

  const clearFavorites = () => setFavorites({});

  const isFavorite = country_code => !!favorites[country_code];

  return (
    <MapContext.Provider
      value={{
        countries,
        favoriteCount: Object.keys(favorites).length,
        favoriteCountries: countries.filter(c => isFavorite(c.country_code)),
        isFavorite,
        toggleFavorite,
        clearFavorites,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

export default MapProvider;
