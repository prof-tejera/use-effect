import React, { useState } from 'react';
import countries from './countries.json';

const MapContextClass = React.createContext({});

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

  const isFavorite = country_code => favorites[country_code];

  return (
    <MapContextClass.Provider
      value={{
        countries,
        favoriteCount: Object.keys(favorites).length,
        favoriteCountries: countries.filter(c => favorites[c.country_code]),
        isFavorite,
        toggleFavorite,
      }}
    >
      {children}
    </MapContextClass.Provider>
  );
};

export { MapContextClass as MapContext };

export default MapProvider;
