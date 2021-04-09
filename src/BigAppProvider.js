import React, { useState } from 'react';

const BigAppContextClass = React.createContext({});

const BigAppProvider = ({ children }) => {
  const [bigCount, setBigCount] = useState(0);

  return <BigAppContextClass.Provider value={{ bigCount, setBigCount }}>{children}</BigAppContextClass.Provider>;
};

export { BigAppContextClass as BigAppContext };

export default BigAppProvider;
