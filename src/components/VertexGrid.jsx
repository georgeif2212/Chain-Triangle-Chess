import { useMemo } from "react"; // * useMemo is useful, it calculates the vertices only when polygonX, polygonY, vertexSpacing, rows changes

const VertexGrid = ({ polygonX, polygonY, vertexSpacing, rows }) => {
  const vertices = useMemo(() => {
    const calculatedVertices = [];
    rows.forEach((numVertices, rowIndex) => {
      const yOffset = polygonY + ((rowIndex - 3) * vertexSpacing * Math.sqrt(3)) / 2;
      const xOffsetStart = polygonX - ((numVertices - 1) * vertexSpacing) / 2;

      const rowVertices = [];
      for (let i = 0; i < numVertices; i++) {
        const x = xOffsetStart + i * vertexSpacing;
        const y = yOffset;
        rowVertices.push({ x, y, row: rowIndex, col: i });
      }
      calculatedVertices.push(rowVertices); // Agrupa vértices en filas
    });
    return calculatedVertices;
  }, [polygonX, polygonY, vertexSpacing, rows]);
  console.log(vertices);
  return vertices.flat(); // Aplanamos el arreglo para mantener la compatibilidad
};

export default VertexGrid;
