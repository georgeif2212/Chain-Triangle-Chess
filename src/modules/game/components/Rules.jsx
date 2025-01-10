import { matrixValidEdges } from "../../../utils/createArrays.jsx";
import { matrixAssociatedVertices } from "../../../utils/createArrays.jsx";

export function checkNewTriangles(p_1, p_2) {
  let intermedio = matrixValidEdges[p_1][p_2];
  if (intermedio > 0) {
    return;
  }

  intermedio = -intermedio;

  const nuevas_aristas = [[p_1, intermedio], [intermedio, p_2]];

  // Para cada nueva arista, checa si se forma un triángulo
  for (let i = 0; i < nuevas_aristas.length; i++) {
    const llave = conseguir_llave_string(nuevas_aristas[i]); // Los ordena y regresa en string separados por ","
    const asociados = matrixAssociatedVertices[llave]; // Consigue lista de 1 o dos postes asociados

    // Para cada poste asociado checa si está puesta una arista en el tablero
    for (let j = 0; j < asociados.length; j++) {
      // Obtener llaves para consultar el tablero. Cada llave es un par ordenado
      const llaves_1 = ordenar(asociados[j], nuevas_aristas[i][0]); // Los postes deben estar ordenados de menor a mayor
      const llaves_2 = ordenar(asociados[j], nuevas_aristas[i][1]);

      // Consultar en el tablero si las aristas están puestas
      const arista_puesta_1 = tablero[llaves_1[0]][llaves_1[1]]; // 1 si está puesta
      const arista_puesta_2 = tablero[llaves_2[0]][llaves_2[1]]; // 1 si está puesta

      if (arista_puesta_1 === 1 && arista_puesta_2 === 1) {
        // Hay dos aristas puestas, entonces la nueva arista completa un triángulo
        const tupla_ordenada = conseguir_llave_string([asociados[j], ...nuevas_aristas[i]]);

        // Checar si el triángulo que se formó ya está ocupado
        const esta_ocupado = triangulos[tupla_ordenada];
        if (!esta_ocupado) {
          colorear_triangulo(tupla_ordenada, equipo_en_turno);
          triangulos[tupla_ordenada] = true; // Ocupar el triángulo
        }
      }
    }
  }
}
