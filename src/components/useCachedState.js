import { useState, useEffect } from 'react';

const useCachedState = (key, defaultValue) => {
 const [state, setState] = useState(() => {
    const cachedValue = window.localStorage.getItem(key);
    return cachedValue !== null ? cachedValue : defaultValue;
 });

 useEffect(() => {
    window.localStorage.setItem(key, state);
 }, [key, state]);

 return [state, setState];
};


export default useCachedState;
