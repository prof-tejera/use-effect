import { useEffect, useState } from 'react';
import './App.css';

const Even = ({ number }) => {
  useEffect(() => {
    console.log('updated Even');
    return () => {
      console.log('unmounted Even');
    };
  });

  return `Even ${number}`;
};

const Odd = ({ number }) => {
  useEffect(() => {
    console.log('updated Odd');
    return () => {
      console.log('unmounted Odd');
    };
  });

  return `Odd ${number}`;
};

const App = () => {
  const [counter, setCounter] = useState(0);

  return (
    <div className="main-panel">
      <div className="display">{counter % 2 ? <Odd number={counter} /> : <Even number={counter} />}</div>
      <button onClick={() => setCounter(counter + 1)}>Inc</button>
    </div>
  );
};

export default App;
