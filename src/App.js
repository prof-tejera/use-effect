import React, { useContext, useState, useEffect, useReducer, useRef } from 'react';
import styled from 'styled-components';
import { token } from './config';
import Map from './Map';

const Wrapper = styled.div`
  margin: 100px auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const App = () => {
  return <Map />;
};

export default App;
