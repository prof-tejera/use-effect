import React, { useContext, useState, useEffect, useReducer, useRef } from 'react';
// import styled from 'styled-components';
// import { token } from './config';
// import Map from './Map';

// const Wrapper = styled.div`
//   margin: 100px auto;
//   display: flex;
//   justify-content: center;
// `;

const App = () => {
  const [obj, setObj] = useState({});

  useEffect(() => {
    console.log('Object changed', obj);
  }, [obj]);

  return (
    <div>
      <div>{JSON.stringify(obj)}</div>
      <button
        onClick={() => {
          // obj[`newKey_${Math.random()}`] = 'newValue';
          setObj({
            ...obj,
            [`newKey_${Math.random()}`]: 'newValue',
          });
        }}
      >
        Change it!
      </button>
    </div>
  );
};

export default App;
