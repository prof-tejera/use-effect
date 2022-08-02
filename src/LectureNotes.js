// Managing state is getting easier and easier as we
// learned with hooks. We can now use hooks in very simple
// functional components with a simple line, that allows
// us to get and set a value, and have our component react to
// changes very easily

import { useEffect, useState } from 'react';
import { useInterval } from './hooks';

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="main-panel">
      <div className="display">Current {count}</div>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

const App = () => {
  return <Counter />;
};

// We also covered useEffect, which allows us to perform
// side-effects in our function components. We can mimic
// componentDidMount, componentDidUpdate and componentWillUnmount
const Counter = ({ count, setCount }) => {
  useEffect(() => {
    console.log('MOUNT Counter');

    return () => {
      console.log('before UNMOUNT Counter');
    };
  }, []);

  return (
    <div className="main-panel">
      <div className="display">Current {count}</div>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

const App = () => {
  const [mounted, setMounted] = useState(true);
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  useEffect(() => {
    console.log('MOUNT App');

    return () => {
      console.log('before UNMOUNT App');
    };
  }, []);

  useEffect(() => {
    console.log('after ANYTHING is updated');

    return () => {
      console.log('before ANYTHING is updated');
    };
  });

  useEffect(() => {
    console.log('after COUNT is updated');

    return () => {
      console.log('before COUNT is updated');
    };
  }, [count]);

  return (
    <div>
      <pre>AppState: {JSON.stringify({ count, text }, null, 2)}</pre>
      {mounted && <Counter setCount={setCount} count={count} />}
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={() => setMounted(!mounted)}>Unmount</button>
    </div>
  );
};

// useRef
const Timer = () => {
  const [count, setCount] = useState(0);
  const [running, setRunning] = useState(false);
  const interval = useRef();

  useEffect(() => {
    console.log('Triggering effect');
  });

  console.log('Rendering...');

  return (
    <div className="main-panel">
      <div className="display">Count {count}</div>
      <div style={{ display: 'flex' }}>
        <button
          onClick={() => {
            if (running) {
              setRunning(false);
              clearInterval(interval.current);
            } else {
              setRunning(true);
              interval.current = setInterval(() => {
                console.log('running interval', new Date());
                setCount(c => c + 1);
              }, 1000);
            }
          }}
        >
          {running ? 'Pause' : 'Start'}
        </button>
      </div>
    </div>
  );
};

// Further, we can have an overarching state that we can "centralize"
// and pass to other components as props, so they can be aware of changes
// and react accordingly
const Display = ({ count }) => <div className="display">Current {count}</div>;

const Counter = ({ count, setCount }) => (
  <div className="main-panel">
    <Display count={count} />
    <button onClick={() => setCount(count + 1)}>Increment</button>
  </div>
);

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <pre>AppState: {JSON.stringify({ count }, null, 2)}</pre>
      <br />
      <Counter setCount={setCount} count={count} />
    </div>
  );
};

const App = () => {
  const [v, setV] = useState(false);

  return (
    <button
      style={{ backgroundColor: v ? 'red' : 'blue' }}
      onClick={() => {
        setV(!v);
      }}
    >
      Toggle!
    </button>
  );
};

const App = () => {
  const [v, toggle] = useToggle(false);
  return (
    <button style={{ backgroundColor: v ? 'red' : 'blue' }} onClick={toggle}>
      Toggle!
    </button>
  );
};

const App = () => {
  const { width, height } = useWindowSize();
  const factor = 5;
  return (
    <div
      className="main-panel"
      style={{
        height: height / factor,
        width: width / factor,
        display: 'flex',
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
      }}
    >
      Window is {width} x {height}
    </div>
  );
};

const App = () => {
  const { x, y } = useMousePosition();

  return (
    <div style={{ perspective: '1000px' }}>
      <div
        className="main-panel"
        style={{
          backgroundColor: 'red',
          transform: `rotateX(${-y / 10}deg) rotateY(${x / 10}deg)`,
        }}
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/en/thumb/2/29/Harvard_shield_wreath.svg/1200px-Harvard_shield_wreath.svg.png"
          style={{ height: 100, width: 100 }}
          alt="Harvard"
        />
      </div>
    </div>
  );
};
