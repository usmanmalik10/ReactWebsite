import React, { useContext, useEffect, useReducer } from 'react';
const AppContext = React.createContext();
import reducer from './reducer';

const API = 'https://thapademoapi.herokuapp.com/service';

const intialState = {
  name: '',
  image: '',
  services: [],
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, intialState);

  const updateHomePage = () => {
    return dispatch({
      type: 'HOME_UPDATE',
      payload: {
        name: 'Usman Malik',
        image: './images/hero.svg',
      },
    });
  };

  const updateAboutPage = () => {
    return dispatch({
      type: 'ABOUT_UPDATE',
      payload: {
        name: 'Muhammd Usman',
        image: './images/about1.svg',
      },
    });
  };

  // To get api data
  const getServices = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      dispatch({ type: 'GET_SERVICES', payload: data });
    } catch (error) {
      console.log(error);
    }
  };

  //to call the api
  useEffect(() => {
    getServices(API);
  }, []);

  return (
    <AppContext.Provider value={{ ...state, updateHomePage, updateAboutPage }}>
      {children}
    </AppContext.Provider>
  );
};

// Global Custom Hooks

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
