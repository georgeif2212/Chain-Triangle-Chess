import React, { createContext, useReducer } from "react";

const GameContext = createContext();

const initialState = {
  mode: 'normal', // o 'questions'
  currentTeam: null,
  teams: ['Team A', 'Team B', 'Team C', 'Team D'],
  // Otros estados como conexiones, triángulos, etc.
  gameStarted: false // Para saber si el juego ya comenzó
};


const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_MODE':
      return { ...state, mode: action.payload };
    case 'START_GAME':
      return { ...state, gameStarted: true, currentTeam: state.teams[0] };
    case 'SET_CURRENT_TEAM':
      if (!state.gameStarted) return state; 
      return { ...state, currentTeam: action.payload };
    default:
      return state;
  }
};


const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

export { GameContext, GameProvider };
