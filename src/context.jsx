import React, { useContext, useReducer } from 'react';
const AppContext = React.createContext();
import reducer from './reducer';

const intialState = {
  name: '',
  image: '',
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
