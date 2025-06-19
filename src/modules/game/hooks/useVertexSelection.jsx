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
            fromIndex: selectedVertex.index // is useful to generate the animation 
          },
        ]),
      vertices,
      generateNewTriangle: (coordinates, triangles) =>
        setTriangles((prev) => {
          const updatedTriangles = [
            ...prev,
            { coordinates, team: state.currentTeam },
          ];
          
          // Validar si ya se completaron todos los triángulos posibles
          if (Object.keys(triangles).length === updatedTriangles.length) {
            console.log("¡El juego ha finalizado!");
            dispatch({ type: "GAME_OVER" });
          }

          return updatedTriangles;
        }),

      context: { state, dispatch },
      onInvalidConnection: () => setInvalidMoveAlert(true),
      showQuestion: (questionData) =>
        setQuestionData({ open: true, ...questionData }),
    });

    strategy.execute();
    setSelectedVertex(null);
  };

  return { handleVertexClick, selectedVertexIndex: selectedVertex?.index };
};

export default useVertexSelection;
