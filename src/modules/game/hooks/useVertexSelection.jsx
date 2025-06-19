import { useState, useContext, useRef } from "react";
import { GameContext } from "../../../contexts/GameContext.jsx";
import { getMoveStrategy } from "../services/MoveStrategyFactory.js";
import { getIntermediateEdge } from "../../../utils/utils.js";
import { matrixValidEdges } from "../../../utils/createArrays.jsx";

const useVertexSelection = (
  vertices,
  setConnections,
  setTriangles,
  setInvalidMoveAlert,
  setQuestionData
) => {
  const { state, dispatch } = useContext(GameContext);
  const [selectedVertex, setSelectedVertex] = useState(null);

  const connectedVerticesRef = useRef(new Set());
  const usedConnectionsRef = useRef(new Set());         // Guarda conexiones completas ya usadas


  const handleVertexClick = (vertex) => {
    if (!selectedVertex) {
      setSelectedVertex(vertex);
      return;
    }

    const [vertex1, vertex2] =
      selectedVertex.index < vertex.index
        ? [selectedVertex, vertex]
        : [vertex, selectedVertex];

    const intermediateEdge = getIntermediateEdge(
      vertex1.index,
      vertex2.index,
      matrixValidEdges
    );

    // Clave única de esta conexión (ordenada)
    const connectionKey = [vertex1.index, intermediateEdge, vertex2.index]
      .sort((a, b) => a - b)
      .join("-");

    // Validación: ya existe esta conexión
    if (usedConnectionsRef.current.has(connectionKey)) {
      setInvalidMoveAlert("Esta conexión ya ha sido realizada.");
      setSelectedVertex(null);
      return;
    }
    
    // si es el primer movimiento debe ser igual a 0
    const isFirstMove = connectedVerticesRef.current.size === 0;

    // determina si el set de vertices conectados tienen el vertice 1 o el vertice 2 o el intermedio
    const isConnected =
      connectedVerticesRef.current.has(vertex1.index) ||
      connectedVerticesRef.current.has(vertex2.index) ||
      connectedVerticesRef.current.has(intermediateEdge)

    if (!isFirstMove && !isConnected) {
      setInvalidMoveAlert(
        "Debes iniciar la conexión desde un vértice que ya esté conectado."
      );
      setSelectedVertex(null);
      return;
    }

    const strategy = getMoveStrategy(state.mode, {
      vertex1,
      vertex2,
      onValidConnection: (i1, i2) => {
        // Registrar la conexión visual
        setConnections((prev) => [
          ...prev,
          {
            start: { ...vertex1, index: i1 },
            end: { ...vertex2, index: i2 },
            fromIndex: selectedVertex.index,
          },
        ]);

        // Actualizar el set de vértices conectados
        connectedVerticesRef.current.add(i1);
        connectedVerticesRef.current.add(i2);
        connectedVerticesRef.current.add(intermediateEdge);

        // Registrar la conexión como ya usada
        usedConnectionsRef.current.add(connectionKey);
      },
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
      onInvalidConnection: () =>
        setInvalidMoveAlert("No puedes conectar esos vértices."),
      showQuestion: (questionData) =>
        setQuestionData({ open: true, ...questionData }),
    });

    strategy.execute();
    setSelectedVertex(null);
  };

  return {
    handleVertexClick,
    selectedVertexIndex: selectedVertex?.index,
  };
};

export default useVertexSelection;
