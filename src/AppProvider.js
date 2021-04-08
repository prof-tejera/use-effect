import React, { useState } from 'react';

const AppContextClass = React.createContext({});

const AppProvider = ({ children }) => {
  const [count, setCount] = useState(0);

  return <AppContextClass.Provider value={{ count, setCount }}>{children}</AppContextClass.Provider>;
};

export { AppContextClass as AppContext };

export default AppProvider;
