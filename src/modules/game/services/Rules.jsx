import {
  matrixValidEdges,
  matrixAssociatedVertices,
  gameBoardMatrix,
} from "../../../utils/createArrays.jsx";
import { sortArray, triangles } from "../../../utils/utils.js";

/**
 * * Checks if a new connection is valid.
 */
function isValidConnection(vertex1, vertex2) {
  const intermediateEdge = matrixValidEdges[vertex1.index - 1][vertex2.index - 1];
  return intermediateEdge <= -1; // Retorna true si es un movimiento válido.
}

/**
 * * Registers a new connection in the dashboard matrix.
 */
function registerNewConnection(vertex1, vertex2, intermediateEdge) {
  console.log(vertex1,vertex2,intermediateEdge);
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
function checkAndRegisterTriangle(newEdges, vertices, generateNewTriangle) {
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
        if (!triangles[triangleVertices.toString()]) {
          const coordinates = getTriangleCoordinates(
            vertices,
            triangleVertices
          );
          triangles[triangleVertices.toString()] = 1;
          generateNewTriangle(coordinates);
        }
      }
    });
  }
}

export function checkNewTriangles(
  vertex1,
  vertex2,
  onValidConnection,
  vertices,
  generateNewTriangle
) {

  if (!isValidConnection(vertex1, vertex2)) return; // ! It means that is not a valid movement

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

  checkAndRegisterTriangle(newEdges, vertices, generateNewTriangle);
}
