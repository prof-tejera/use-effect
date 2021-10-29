import { useCallback, useEffect, useRef, useState } from 'react';

export const useToggle = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);
  return [value, () => setValue(!value)];
};

const useListener = (event, handler) => {
  useEffect(() => {
    window.addEventListener(event, handler);
    return () => window.removeEventListener(event, handler);
  }, [event, handler]);
};

export const useWindowSize1 = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const listener = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener('resize', listener);
    return () => window.removeEventListener('resize', listener);
  }, []);

  return windowSize;
};

export const useMousePosition1 = () => {
  const { width, height } = useWindowSize();
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const listener = e => {
    setPosition({ x: e.clientX - width / 2, y: e.clientY - height / 2 });
  };

  useEffect(() => {
    window.addEventListener('mousemove', listener);
    return () => window.removeEventListener('mousemove', listener);
  }, []);

  return position;
};

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useListener('resize', () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  });

  return windowSize;
};

export const useMousePosition = () => {
  const { width, height } = useWindowSize();
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useListener('mousemove', e => {
    setPosition({ x: e.clientX - width / 2, y: e.clientY - height / 2 });
  });

  return position;
};

export const useInterval = (callback, delay) => {
  const interval = useRef();
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    interval.current = setInterval(() => savedCallback.current(), delay);
    return () => clearInterval(interval.current);
  }, [delay]);

  return interval.current;
};
