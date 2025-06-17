import { useState, useContext } from "react";
import { GameContext } from "../../../contexts/GameContext.jsx";
import { getMoveStrategy } from "../services/MoveStrategyFactory.js";

const useVertexSelection = (
  vertices,
  setConnections,
  setTriangles,
  setInvalidMoveAlert,
  setQuestionData
) => {
  const { state, dispatch } = useContext(GameContext);
  const [selectedVertex, setSelectedVertex] = useState(null);

  const handleVertexClick = (vertex) => {
    if (!selectedVertex) {
      setSelectedVertex(vertex);
      return;
    }

    const [vertex1, vertex2] =
      selectedVertex.index < vertex.index
        ? [selectedVertex, vertex]
        : [vertex, selectedVertex];

    const strategy = getMoveStrategy(state.mode, {
      vertex1,
      vertex2,
      onValidConnection: (i1, i2) =>
        setConnections((prev) => [
          ...prev,
          {
            start: { ...vertex1, index: i1 },
            end: { ...vertex2, index: i2 },
          },
        ]),
      vertices,
      generateNewTriangle: (coordinates, triangles) =>
        setTriangles((prev) => [
          ...prev,
          { coordinates, team: state.currentTeam },
        ]),
      context: { state, dispatch },
      onInvalidConnection: () => setInvalidMoveAlert(true),
      showQuestion: (questionData) =>
        setQuestionData({ open: true, ...questionData }),
    });

    strategy.execute();
    setSelectedVertex(null);
  };

  return handleVertexClick;
};

export default useVertexSelection;
