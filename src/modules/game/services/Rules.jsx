import {
  matrixValidEdges,
  matrixAssociatedVertices,
  gameBoardMatrix,
} from "../../../utils/createArrays.jsx";
import { sortArray, triangles } from "../../../utils/utils.js";

/**
 * * Checks if a new connection is valid.
 */
export function isValidConnection(vertex1, vertex2) {
  const intermediateEdge =
    matrixValidEdges[vertex1.index - 1][vertex2.index - 1];
  return intermediateEdge <= -1; // Retorna true si es un movimiento válido.
}

/**
 * * Registers a new connection in the dashboard matrix.
 */
export function registerNewConnection(vertex1, vertex2, intermediateEdge) {
  const updatedEdge = -intermediateEdge;
  gameBoardMatrix[vertex1.index - 1][updatedEdge - 1] = 1;
  gameBoardMatrix[updatedEdge - 1][vertex2.index - 1] = 1;
  return updatedEdge;
}

/**
 * * Obtains the coordinates of the vertices from their indices.
 */
function getTriangleCoordinates(vertices, vertexIndices) {
  return vertexIndices.map((vertexIndex) => {
    const vertex = vertices.find((v) => v.index === vertexIndex);
    return { x: vertex.x, y: vertex.y };
  });
}

/**
 * * Checks if a triangle is formed with new connections and logs it if it is valid.
 */
export function checkAndRegisterTriangle(
  newEdges,
  vertices,
  generateNewTriangle,
  { state, dispatch }
) {
  let trianglesFormed = 0; // * Counter of formed triangles in each movement
  let newTriangles = {}; // * Store the new triangles in this movement

  for (let i = 0; i < newEdges.length; i++) {
    const [start, end] = newEdges[i];
    const associatedVertices = matrixAssociatedVertices[start - 1][end - 1];

    associatedVertices.forEach((assocVertex) => {
      const sortedVertices1 = sortArray(assocVertex, start);
      const sortedVertices2 = sortArray(assocVertex, end);

      if (
        gameBoardMatrix[sortedVertices1[0] - 1][sortedVertices1[1] - 1] === 1 &&
        gameBoardMatrix[sortedVertices2[0] - 1][sortedVertices2[1] - 1] === 1
      ) {
        const triangleVertices = [assocVertex, start, end].sort(
          (a, b) => a - b
        );
        const triangleKey = triangleVertices.toString();

        // * Only count if the triangle has not been recorded before
        if (!triangles[triangleKey] && !newTriangles[triangleKey]) {
          const coordinates = getTriangleCoordinates(
            vertices,
            triangleVertices
          );
          newTriangles[triangleKey] = 1; // Mark this triangle as new on this play
          triangles[triangleKey] = 1; // Register it on the global list of triangles

          trianglesFormed++; // Add to counter
          generateNewTriangle(coordinates, triangles);
        }
      }
    });
  }

  // * If new triangles were formed, update score and state
  if (trianglesFormed > 0) {
    const updatedTeams = state.teams.map((team) =>
      team.name === state.currentTeam.name
        ? { ...team, score: (team.score || 0) + trianglesFormed }
        : team
    );
    dispatch({ type: "SET_TEAMS", payload: updatedTeams });
  }
}

export function checkNewTriangles(
  vertex1,
  vertex2,
  onValidConnection,
  vertices,
  generateNewTriangle,
  { state, dispatch },
  onInvalidConnection
) {
  if (!isValidConnection(vertex1, vertex2)) {
    onInvalidConnection();
    return;
  } // ! It means that is not a valid movement

  onValidConnection(vertex1.index, vertex2.index);

  const intermediateEdge = registerNewConnection(
    vertex1,
    vertex2,
    matrixValidEdges[vertex1.index - 1][vertex2.index - 1]
  );

  const newEdges = [
    [vertex1.index, intermediateEdge],
    [intermediateEdge, vertex2.index],
  ];

  checkAndRegisterTriangle(newEdges, vertices, generateNewTriangle, {
    state,
    dispatch,
  });
}
