import { useState, useContext } from "react";
import { GameContext } from "../../../contexts/GameContext.jsx";
import { checkNewTriangles } from "../services/Rules.jsx";

const useVertexSelection = (vertices, setConnections, setTriangles) => {
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

    const generateNewTriangle = (coordinates) => {
      setTriangles((prev) => [
        ...prev,
        { coordinates, team: state.currentTeam },
      ]);
    };

    checkNewTriangles(vertex1, vertex2, onValidConnection, vertices, generateNewTriangle);
    setSelectedVertex(null);
  };

  return handleVertexClick;
};

export default useVertexSelection;
