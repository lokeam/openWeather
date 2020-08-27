import { useEffect, useRef, useReducer } from 'react';

const useFetch = (endpoint, extraParsingRequired = false) => {
  const cache = useRef({});

  /* init initial state and reducer in order to get/set status and data at the same time in order to help prevent unnecessary re-renders */
  const initialState = {
    status: 'idle',
    error: null,
    data: {

    }
  };

  const [state, dispatch] = useReducer( (state, action) => {
    switch (action.type) {
      case 'FETCHING':
        return {...initialState, status: 'fetching' };

      case 'FETCHED':
        return {...initialState, status: 'fetched', data: action.payload };

      case 'FETCH_ERROR':
        return {...initialState, status: 'error', error: action.payload };
      default:
        return state;
    }
  }, initialState);

  /* try to clean up sideeffect with cancel request */
  useEffect( () => {
    let cancelRequest = false;
    if (!endpoint) {
      return;
    }

    /* helper fn to sort through 5 day forecast */
    const sortForecastResults = (list) => {
      console.log('sortForecastResults, list: ', list);
      const dates = list
        .map((item, i) => {
          return item.dt_txt.split(" ")[0];
        })
        .filter((item, i, currArr) => {
          return currArr.indexOf(item) === i;
        });
    
    
      let sortedResults = [];
      for(let day of dates) {
        sortedResults.push({
          name: day,
          weatherArray: []
        });
      }
    
      // for each item in the json.list
      for(let item of list) {
        let itemDate = item.dt_txt.split(" ")[0];
    
        /* refactor this for the sake of time complexity when I have more time--
           initial implementation of lookup table for faster searching failed, wasn't able to update the array within the result object*/
        for(let result of sortedResults) {
          if(result.name === itemDate) {
            result.weatherArray.push(item);
          }
        }
      }
    
      return sortedResults;
    }

    const fetchData = async () => {
      dispatch({type: 'FETCHING'});

      if (cache.current[endpoint]) {
        console.log('data currently saved in cache');

        const data = cache.current[endpoint];
        dispatch({ type: 'FETCHED', payload: data });

      } else {
        try {
          const response = await fetch(endpoint);
          const data = await response.json();

          /* extra parsing required here because the openweathermap 5 day response is absolutely terrible */
          if (extraParsingRequired) {
            data.list = sortForecastResults(data.list);
          }

          console.log('useFetch, try block data: ', data);
          cache.current[endpoint] = data;

          /* confirm if the component has been unmounted before making changes. if unmounted,
             skip updating the state and if it hasn’t been unmounted, update the state.
             helping to resolve the React state update error + prevent component race conditions*/
          if (cancelRequest) {
            return;
          }

          dispatch({ type: 'FETCHED', payload: data});
        } catch(error) {
          console.log('useFetch error: ', error);
          if (cancelRequest) {
            return;
          }

          dispatch({ type: 'FETCH_ERROR', payload: error.message });
        }
      }
    };

    fetchData();

    return function tidyup() {
      cancelRequest = true;
    };
  }, [endpoint]);

  return state;
};

export default useFetch;