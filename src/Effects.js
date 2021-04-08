import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 100px auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 200px;
`;

// Section questions
// When does useEffect trigger?
/*
From React docs:
When exactly does React clean up an effect? React performs the cleanup
when the component unmounts. However, as we learned earlier, effects run
for every render and not just once. This is why React also cleans up effects
from the previous render before running the effects next time.
*/

const EffectTest = () => {
  // Create an effect for mount (empty array dependency)
  useEffect(() => {
    console.log('effect []');

    return () => {
      console.log('callback []');
    };
  }, []);

  // Create an effect with no deps (triggers every time)
  useEffect(() => {
    console.log('effect no deps');

    return () => {
      console.log('callback no deps');
    };
  });

  const vars = [useState(0), useState(0)].map(([variable, setter], i) => ({
    variable,
    setter,
    jsx: (
      <div key={i} style={{ padding: 20, textAlign: 'center' }}>
        <div>
          Var{i + 1}: {variable}
        </div>
        <div>
          <button onClick={() => setter(variable + 1)}>Inc Var{i + 1}</button>
        </div>
      </div>
    ),
  }));

  const [{ variable: var1 }, { variable: var2 }] = vars;

  // Create an effect for variable 1 only
  useEffect(() => {
    console.log('effect [var1]');

    return () => {
      console.log('callback [var1]');
    };
  }, [var1]);

  // Create an effect for variable 2 only
  useEffect(() => {
    console.log('effect [var2]');

    return () => {
      console.log('callback [var2]');
    };
  }, [var2]);

  return vars.map(v => v.jsx);
};

const App = () => {
  const [mount, toggleMount] = useState(false);

  return (
    <Wrapper>
      <button onClick={() => toggleMount(!mount)}>{mount ? 'Unmount' : 'Mount'}</button>
      <div>{mount && <EffectTest />}</div>
    </Wrapper>
  );
};

export default App;
