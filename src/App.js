import React from 'react';
import AppProvider from './AppProvider';
import Map from './Map';

const App = () => {
  return (
    <AppProvider>
      <Map />
    </AppProvider>
  );
};

export default App;
