// Managing state is getting easier and easier as we
// learned with hooks. We can now use hooks in very simple
// functional components with a simple line, that allows
// us to get and set a value, and have our component react to
// changes very easily

import { useEffect, useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <Wrapper>
      <div>Current {count}</div>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </Wrapper>
  );
};

const App = () => {
  return <Counter />;
};

// Further, we can have an overarching state that we can "centralize"
// and pass to other components as props, so they can be aware of changes
// and react accordingly
const Display = ({ count }) => {
  return (
    <div>
      <div>Current {count}</div>
    </div>
  );
};

const Counter = ({ count, setCount }) => {
  return (
    <div>
      <Display count={count} />
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <Wrapper>
      AppState: {JSON.stringify({ count })}
      <Counter setCount={setCount} count={count} />
    </Wrapper>
  );
};

// We also covered useEffect, which allows us to perform
// side-effects in our function components. We can mimic
// componentDidMount, componentDidUpdate and componentWillUnmount

const App = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  useEffect(() => {
    console.log('I run on mount because I have no dependencies');
  }, []);

  useEffect(() => {
    console.log('I run every time anything in this component changes');
  });

  useEffect(() => {
    console.log('I run only when count changes but not when text changes');
  }, [count]);

  return (
    <Wrapper>
      AppState: {JSON.stringify({ count })}
      <Counter setCount={setCount} count={count} />
      <input value={text} onChange={e => setText(e.target.value)} />
    </Wrapper>
  );
};

// New built-in hook in react
// useRef
// returns an object with a 'current' property that holds a value
// and persists for the lifetime of the component

// Common use cases
// 1. accessing the DOM
const App = () => {
  const inputRef = useRef();
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    console.log(inputRef.current.value);
  });

  return (
    <Wrapper>
      <input ref={inputRef} />
      <button onClick={() => setToggle(!toggle)}>Click</button>
    </Wrapper>
  );
};

const Map = () => {
  const mapRef = useRef();

  useEffect(() => {
    mapboxgl.accessToken = token;
    new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });
  }, []);

  return (
    <div
      id="map"
      ref={mapRef}
      style={{
        height: 300,
        width: 300,
      }}
    ></div>
  );
};

// However, useRef can be used for more than accessing the DOM.
// this is a variable that is similar to state vars, but has two main
// differences:
// 1. setting a ref does NOT trigger a re-render
// 2. you can set it directly, without a setter function
const Timer = () => {
  const [count, setCount] = useState(0);
  const [running, setRunning] = useState(false);
  const interval = useRef();

  return (
    <div>
      Count {count}
      <div style={{ display: 'flex' }}>
        <button
          onClick={() => {
            if (running) {
              setRunning(false);
              clearInterval(interval.current);
            } else {
              setRunning(true);
              interval.current = setInterval(() => {
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

// useReducer
// this is an alternative to useState and can be used when the new state
// logic is more complex rather than a single value
const reducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    console.log(inputRef.current.value);
  });

  return (
    <Wrapper>
      Count: {state.count}
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
    </Wrapper>
  );
};

// So far we've been managing state locally and passing it down explicitly
// through props. Is there a better way? Yup, using React Context. It was specifically
// designed so that state can be shared down a component tree, without prop drilling.
// any component in the tree shares the context and can access it directly.

const Display = () => {
  const { count } = useContext(AppContext);

  return (
    <div>
      <div>Current {count}</div>
    </div>
  );
};

const Counter = () => {
  const { count, setCount } = useContext(AppContext);

  return (
    <div>
      <Display count={count} />
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

const Inner = () => {
  const { count } = useContext(AppContext);

  return (
    <Wrapper>
      AppState: {JSON.stringify({ count })}
      <Counter />
    </Wrapper>
  );
};

const App = () => {
  return (
    <AppProvider>
      <Inner />
    </AppProvider>
  );
};
