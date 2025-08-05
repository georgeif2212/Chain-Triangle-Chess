import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GameContext } from "@contexts/GameContext.jsx";
import { availableColors } from "@utils/utils.js";

const useOptions = () => {
  const { state, dispatch } = useContext(GameContext);
  const [gameMode, setGameMode] = useState(state.mode);
  const [teams, setTeams] = useState(state.teams);
  const [orderRandom, setOrderRandom] = useState(false);
  const navigate = useNavigate();

  const handleTeamChange = (index, key, value) => {
    setTeams((prev) =>
      prev.map((team, i) => (i === index ? { ...team, [key]: value } : team))
    );
  };

  const handleAddTeam = () => {
    const usedColors = teams.map((team) => team.color);
    const availableColor =
      availableColors.find((color) => !usedColors.includes(color)) || "#000000";

    if (teams.length < 4) {
      const newTeams = [
        ...teams,
        { name: `Equipo ${teams.length + 1}`, color: availableColor },
      ];

      setTeams(newTeams);
      dispatch({ type: "SET_TEAMS", payload: newTeams });
    }
  };

  const handleRemoveTeam = () => {
    if (teams.length > 2) {
      const updatedTeams = teams.slice(0, -1);
      setTeams(updatedTeams);
      dispatch({ type: "SET_TEAMS", payload: updatedTeams });
    }
  };

  const handleRandomizeOrder = () => {
    setOrderRandom(true);
    const updatedTeams = [...teams].sort(() => Math.random() - 0.5);
    setTeams(updatedTeams);
    dispatch({ type: "SET_TEAMS", payload: updatedTeams });
  };

  const handleOptionsStartGame = () => {
    dispatch({ type: "SET_MODE", payload: gameMode });
    dispatch({ type: "SET_CURRENT_TEAM", payload: teams[0] });
    dispatch({ type: "SET_TEAMS", payload: [...teams] });
    navigate(`/game${location.search}`);
  };

  return {
    gameMode,
    teams,
    orderRandom,
    handleTeamChange,
    handleAddTeam,
    handleRemoveTeam,
    handleRandomizeOrder,
    handleOptionsStartGame,
  };
};

export default useOptions;
