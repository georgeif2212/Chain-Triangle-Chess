import { useState, useContext } from "react";
import { GameContext } from "../../../contexts/GameContext.jsx";
import { checkNewTriangles } from "../services/Rules.jsx";

const useVertexSelection = (vertices, setConnections, setTriangles,setInvalidMoveAlert) => {
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

    // * If it is a valid connection from Rules.jsx a connection is drawn
    const onValidConnection = (index1, index2) => {
      setConnections((prev) => [
        ...prev,
        {
          start: { ...selectedVertex, index: index1 },
          end: { ...vertex, index: index2 },
        },
      ]);
      dispatch({ type: "NEXT_TEAM" });
    };

    const generateNewTriangle = (coordinates, triangles) => {
      setTriangles((prev) => {
        const updatedTriangles = [
          ...prev,
          { coordinates, team: state.currentTeam },
        ];

        // * Check if all triangles are completed
        if (Object.keys(triangles).length === updatedTriangles.length) {
          console.log("¡El juego ha finalizado!");
          dispatch({ type: "GAME_OVER" });
        }

        return updatedTriangles;
      });
    };

    checkNewTriangles(
      vertex1,
      vertex2,
      onValidConnection,
      vertices,
      generateNewTriangle,
      { state, dispatch },
      () => setInvalidMoveAlert(true)
    );
    setSelectedVertex(null);
  };

  return handleVertexClick;
};

export default useVertexSelection;
