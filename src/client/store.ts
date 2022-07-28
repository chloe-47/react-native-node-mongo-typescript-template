import * as React from 'react';

export type Listener<T> = (val: T) => void;

export type Store<T> = {
  getValue: () => T;
  subscribe: (listener: Listener<T>) => void;
  unsubscribe: (listener: Listener<T>) => void;
  update: (value: T) => void;
};

export function createStore<T>(initialValue: T): Store<T> {
  let value: T = initialValue;
  const listeners: Set<Listener<T>> = new Set();

  return {
    getValue,
    subscribe,
    unsubscribe,
    update,
  };

  function getValue(): T {
    return value;
  }

  function subscribe(listener: Listener<T>): void {
    listeners.add(listener);
  }

  function unsubscribe(listener: Listener<T>): void {
    listeners.delete(listener);
  }

  function update(val: T): void {
    value = val;
    listeners.forEach((listener: Listener<T>): void => {
      listener(value);
    });
  }
}

export function useStore<T>(store: Store<T>): T {
  const [value, setValue] = React.useState<T>(store.getValue);
  React.useEffect(() => {
    store.subscribe(setValue);
    return () => store.unsubscribe(setValue);
  }, [store]);
  return value;
}
