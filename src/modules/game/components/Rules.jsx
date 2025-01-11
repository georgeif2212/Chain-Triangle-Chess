import { matrixValidEdges } from "../../../utils/createArrays.jsx";
import { matrixAssociatedVertices } from "../../../utils/createArrays.jsx";
import { gameBoardMatrix } from "../../../utils/createArrays.jsx";
import { sortArray } from "../../../utils/utils.js";
import { triangles } from "../../../utils/utils.js";

export function checkNewTriangles(p_1, p_2) {
  let intermediateEdge = matrixValidEdges[p_1 - 1][p_2 - 1];
  if (intermediateEdge > -1) {
    return;
  }

  intermediateEdge = -intermediateEdge;
  console.log(p_1, p_2);
  console.log(intermediateEdge);

  const newEdges = [
    [p_1, intermediateEdge],
    [intermediateEdge, p_2],
  ];

  gameBoardMatrix[p_1 - 1][intermediateEdge - 1] = 1;
  gameBoardMatrix[intermediateEdge - 1][p_2 - 1] = 1;
  
  // * For each new edge, check if a triangle is formed
  for (let i = 0; i < newEdges.length; i++) {
    // Get associated vertices of each new Edge
    const associatedVertices = matrixAssociatedVertices[newEdges[i][0] - 1][newEdges[i][1] - 1]; 

    // For each associated vertex check if an edge is placed on the board
    for (let j = 0; j < associatedVertices.length; j++) {
      // Get keys to query the board. Each key is an ordered pair
      const llaves_1 = sortArray(associatedVertices[j], newEdges[i][0]); 
      const llaves_2 = sortArray(associatedVertices[j], newEdges[i][1]);

      console.log(gameBoardMatrix);
      console.log("nuevas aristas:", newEdges);
      console.log("associted: ", associatedVertices);

      // Consultar en el tablero si las aristas están puestas
      const wildcardEdge_1 = gameBoardMatrix[llaves_1[0] - 1][llaves_1[1] - 1]; // 1 si está puesta
      const wildcardEdge_2 = gameBoardMatrix[llaves_2[0] - 1][llaves_2[1] - 1]; //
      console.log("arista1:", wildcardEdge_1, llaves_1);
      console.log("arista2:", wildcardEdge_2, llaves_2);

      if (wildcardEdge_1 === 1 && wildcardEdge_2 === 1) {
        // Hay dos aristas puestas, entonces la nueva arista completa un triángulo
        const verticesOfTriangle = sortArray([
          associatedVertices[j],
          ...newEdges[i],
        ]);
        console.log("verticesOfTriangle", verticesOfTriangle);
        // Checar si el triángulo que se formó ya está ocupado
        console.log("STRING::  ", verticesOfTriangle.toString());
        const availableTriangle = triangles[verticesOfTriangle.toString()];
        console.log("availableTriangle",availableTriangle);
        if (availableTriangle !== 0) {
          console.log("SE FORMÓ TRIANGULOOOOO");
          triangles[verticesOfTriangle.toString()] = 1; // Ocupar el triángulo
        }
      }
    }
  }
}
