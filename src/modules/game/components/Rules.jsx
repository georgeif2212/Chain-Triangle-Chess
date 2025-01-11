import { matrixValidEdges } from "../../../utils/createArrays.jsx";
import { matrixAssociatedVertices } from "../../../utils/createArrays.jsx";
import { gameBoardMatrix } from "../../../utils/createArrays.jsx";
import { sortArray } from "../../../utils/utils.js";
import { triangles } from "../../../utils/utils.js";

export function checkNewTriangles(p_1, p_2, onValidConnection) {
  let intermediateEdge = matrixValidEdges[p_1 - 1][p_2 - 1];
  
  if (intermediateEdge > -1) {
    return; // ! It means that is not a valid movement
  }
  onValidConnection(p_1, p_2); // Call the callback function
  intermediateEdge = -intermediateEdge;

  const newEdges = [
    [p_1, intermediateEdge],
    [intermediateEdge, p_2],
  ];

  gameBoardMatrix[p_1 - 1][intermediateEdge - 1] = 1;
  gameBoardMatrix[intermediateEdge - 1][p_2 - 1] = 1;

  // Check if triangle is formed
  for (let i = 0; i < newEdges.length; i++) {
    const associatedVertices = matrixAssociatedVertices[newEdges[i][0] - 1][newEdges[i][1] - 1];

    for (let j = 0; j < associatedVertices.length; j++) {
      const llaves_1 = sortArray(associatedVertices[j], newEdges[i][0]); 
      const llaves_2 = sortArray(associatedVertices[j], newEdges[i][1]);

      const wildcardEdge_1 = gameBoardMatrix[llaves_1[0] - 1][llaves_1[1] - 1]; 
      const wildcardEdge_2 = gameBoardMatrix[llaves_2[0] - 1][llaves_2[1] - 1]; 

      if (wildcardEdge_1 === 1 && wildcardEdge_2 === 1) {
        const verticesOfTriangle = sortArray([
          associatedVertices[j],
          ...newEdges[i],
        ]);
        const availableTriangle = triangles[verticesOfTriangle.toString()];

        if (availableTriangle !== 0) {
          triangles[verticesOfTriangle.toString()] = 1;
          console.log("SE FORMÓ TRIANGULO");
        }
      }
    }
  }
}
