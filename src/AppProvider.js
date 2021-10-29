import React, { useState } from 'react';

export const AppContext = React.createContext({
  count: 'No value here',
  setCount: () => {
    console.log('Im outside the provider :(');
  },
});

const AppProvider = ({ children }) => {
  const [count, setCount] = useState(0);

  return <AppContext.Provider value={{ count, setCount }}>{children}</AppContext.Provider>;
};

export default AppProvider;
