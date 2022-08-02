import React, { useContext, useLayoutEffect, useEffect, useRef, useState, useReducer, useCallback } from 'react';
import './App.css';
// import { useInterval, useWindowSize, useMousePosition, useWindowSize1, useMousePosition1 } from './hooks';
import Map from './map/Map';

const Counter = () => {
  const [var1, setVar1] = useState('');

  const var2 = useRef('');

  useEffect(() => {
    setTimeout(() => {
      console.log('Var1', var1);
      console.log('Var2', var2);
    }, 5000);
  }, []);

  return (
    <div className="main-panel">
      <input
        value={var1}
        onChange={v => {
          setVar1(v.target.value);
          var2.current = `the value of var1 is ${var1}`;
        }}
      />
    </div>
  );
};

const App = () => <Counter />;

export default App;
