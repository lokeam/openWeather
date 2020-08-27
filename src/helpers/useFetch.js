import { useEffect, useRef, useState } from 'react';

const useFetch = (endpoint) => {
  const cache = useRef({});
  const [status, setStatus] = useState('idle');
  const [data, setData] = useState([]);

  useEffect(() => {
      if (!endpoint) return;

      const fetchData = async () => {

          setStatus('fetching');
          if (cache.current[endpoint]) {
              const data = cache.current[endpoint];
              setData(data);
              setStatus('fetched');

          } else {
              const response = await fetch(endpoint);
              const data = await response.json();
              cache.current[endpoint] = data; // set response in cache;
              setData(data);
              setStatus('fetched');

          }
      };

      fetchData();
  }, [endpoint]);

  return { status, data };
}

export default useFetch;