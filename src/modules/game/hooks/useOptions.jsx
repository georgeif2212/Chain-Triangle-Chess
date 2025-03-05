import { useContext, useState } from "react";
import { GameContext } from "../../../contexts/GameContext.jsx";

const useOptions = () => {
  const { state, dispatch } = useContext(GameContext);
  const [gameMode, setGameMode] = useState(state.mode);
  const [teams, setTeams] = useState(state.teams.slice(0, 2));
  const [orderRandom, setOrderRandom] = useState(false);

  const handleGameModeChange = () => {
    setGameMode((prev) =>
      prev === "Con preguntas" ? "Sin preguntas" : "Con preguntas"
    );
  };

  const handleTeamChange = (index, key, value) => {
    setTeams((prev) =>
      prev.map((team, i) => (i === index ? { ...team, [key]: value } : team))
    );
  };

  const handleAddTeam = () => {
    if (teams.length < 4) {
      setTeams([...teams, { name: `Team ${teams.length + 1}`, color: "" }]);
    }
  };

  const handleRemoveTeam = () => {
    if (teams.length > 2) {
      setTeams(teams.slice(0, -1));
    }
  };

  const handleRandomizeOrder = () => {
    setOrderRandom(true);
    setTeams([...teams].sort(() => Math.random() - 0.5));
  };

  const handleStartGame = () => {
    dispatch({ type: "SET_MODE", payload: gameMode });
    dispatch({ type: "SET_CURRENT_TEAM", payload: null });
    dispatch({ type: "SET_TEAMS", payload: orderRandom ? [...teams] : teams });
  };

  return {
    gameMode,
    teams,
    orderRandom,
    handleGameModeChange,
    handleTeamChange,
    handleAddTeam,
    handleRemoveTeam,
    handleRandomizeOrder,
    handleStartGame,
  };
};

export default useOptions;
