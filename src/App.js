import React, { useContext, useLayoutEffect, useEffect, useRef, useState, useReducer, useCallback } from 'react';
import './App.css';
// import { useInterval, useWindowSize, useMousePosition, useWindowSize1, useMousePosition1 } from './hooks';
import Map from './map/Map';

const usePrevious = value => {
  const previous = useRef();

  useEffect(() => {
    previous.current = value;
  }, [value]);

  return previous.current;
};

const DiffInput = () => {
  const [value, setValue] = useState('');
  const previous = usePrevious(value);

  return (
    <div>
      <input type="text" value={value} onChange={e => setValue(e.target.value)} />
      <div>
        <b>Previous:</b> {previous}
      </div>
      <br />
      <button
        onClick={() => {
          console.log('previous', previous);
          setValue(previous);
        }}
      >
        Undo
      </button>
    </div>
  );
};

const App = () => <DiffInput />;

export default App;
