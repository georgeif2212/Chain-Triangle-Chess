import React, { createContext, useReducer } from "react";

const GameContext = createContext();

const getModeFromURL = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const mode = searchParams.get("mode");
  return mode === "conPreguntas" ? "conPreguntas  " : "sinPreguntas";
};

const getInitialState = () => ({
  mode: getModeFromURL().trim(), 
  currentTeam: null,
  teams: [
    { name: "Equipo 1", color: "#EF4B4B", score: 0 },
    { name: "Equipo 2", color: "#7BD3EA", score: 0 },
  ],
  gameState: "notStarted", // not started | started | finished
});

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
      return { ...state, gameState: "started", currentTeam: state.teams[0] };
    case "SET_CURRENT_TEAM":
      if (state.gameState === "notStarted") return state;
      return { ...state, currentTeam: action.payload };
    case "NEXT_TEAM":
      return { ...state, currentTeam: nextTeam(state) };
    case "SET_TEAMS":
      return { ...state, teams: action.payload };
    case "GAME_OVER":
      return { ...state, gameState: "finished" };
    case "LOAD_QUESTIONS":
      return {
        ...state,
        vaepData: {
          preguntas: action.payload.preguntas,
          respuestas: action.payload.respuestas,
          opciones: action.payload.opciones,
          materiaNombre: action.payload.materiaNombre,
          temaNombre: action.payload.temaNombre,
        },
      };
    case "RESET_GAME":
      return {
        ...getInitialState(), // reset con el modo actual desde URL
        teams: state.teams.map((team) => ({ ...team, score: 0 })),
      };
    default:
      return state;
  }
};

const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, getInitialState());
  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

export { GameContext, GameProvider };
