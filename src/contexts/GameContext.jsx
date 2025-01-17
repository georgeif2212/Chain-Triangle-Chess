import React, { createContext, useReducer } from "react";

const GameContext = createContext();


const initialState = {
  mode: "normal",
  currentTeam: null,
  teams: [
    { name: "Team A", color: "#EF4B4B" },
    { name: "Team B", color: "#7BD3EA" },
    { name: "Team C", color: "#A5DD9B" },
    { name: "Team D", color: "#FFD966" }
  ],
  gameStarted: false,
};

const nextTeam = (state) => {
  const currentIndex = state.teams.indexOf(state.currentTeam);
  const nextIndex = (currentIndex + 1) % state.teams.length;
  return state.teams[nextIndex];
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_MODE":
      return { ...state, mode: action.payload };
    case "START_GAME":
      return { ...state, gameStarted: true, currentTeam: state.teams[0] };
    case "SET_CURRENT_TEAM":
      if (!state.gameStarted) return state;
      return { ...state, currentTeam: action.payload };
    case "NEXT_TEAM":
      return { ...state, currentTeam: nextTeam(state) };
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
