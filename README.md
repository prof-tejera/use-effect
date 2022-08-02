## Review

Last class we covered how to provide state management to components. We introduced the `useState` hook:

```jsx
const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="main-panel">
      <div className="display">Current {count}</div>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

We also introduced a way to create side-effects using the `useEffect` hook:

```jsx
const Counter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('Firing AFTER count changes!');
  }, [count])

  return (
    <div className="main-panel">
      <div className="display">Current {count}</div>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

Lastly, we talked about `useRef`, which gives us a way to store values over time and modify them without triggering a re-render. It also gives us a way to bind to the DOM without querying the DOM directly:

```jsx
const Counter = () => {
  const [trigger, setTrigger] = useState(true);
  const count = useRef(0);

  return (
    <div className="main-panel">
      <div className="display">Current {count.current}</div>
      <button
        onClick={() => {
          count.current += 1;
        }}
      >
        Increment
      </button>
      <button
        onClick={() => {
          setTrigger(!trigger);
        }}
      >
        Re-render
      </button>
    </div>
  );
};
```

Lets try an interesting example using timers:

```jsx
const Counter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setCount(count + 1);
    }, 5000);
  }, [])

  return (
    <div className="main-panel">
      <div className="display">Current {count}</div>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

As you can see, clicking the button increments the count but when the timeout function fires, it has an old value. This is because when we *registered* the timeout function on mount (no dependencies in the array), the value was 0 and that's what it will use when it fires. The callback passed to `setTimeout` is not being updated. To fix this we can use a different version of the `setter` returned by `useState`. This receives a function which is passed the previous value of the state and returns the new value:

```jsx
const Counter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setCount(prevCount => {
        return prevCount + 1
      });
    }, 5000);
  }, [])

  return (
    <div className="main-panel">
      <div className="display">Current {count}</div>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

This works well, but sometimes we want to use updated values in our callback functions without using a setter function. 

```jsx
const Counter = () => {
  const [trigger, setTrigger] = useState(true);
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
```

Something interesting happened here - as you can see, `var2.current` logged the value of `var1` but missed the last change. If we typed `abc`, it will log `ab`. This is because `useState` is *asynchronous*. When we set the value, its not immediately available which is why we can only rely on `useEffect` to get the updated value.