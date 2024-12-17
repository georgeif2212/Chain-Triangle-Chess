import { useMemo } from "react";

const VertexGrid = ({ polygonX, polygonY, vertexSpacing, rows }) => {
  const vertices = useMemo(() => {
    const calculatedVertices = [];
    let index = 0; // Contador para el índice de los vértices

    const totalRows = rows.length;

    rows.forEach((numVertices, rowIndex) => {
      const yOffset =
        polygonY +
        ((rowIndex - (totalRows - 1) / 2) * vertexSpacing * Math.sqrt(3)) / 2;
      const xOffsetStart = polygonX - ((numVertices - 1) * vertexSpacing) / 2;

      for (let i = 0; i < numVertices; i++) {
        const x = xOffsetStart + i * vertexSpacing;
        const y = yOffset;
        calculatedVertices.push({ x, y, index: index++ }); // Asigna un índice y lo incrementa
      }
    });

    return calculatedVertices;
  }, [polygonX, polygonY, vertexSpacing, rows]);

  return vertices;
};

export default VertexGrid;
