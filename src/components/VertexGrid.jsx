import { useMemo } from "react"; // * useMemo is useful, it calculates the vertices only when polygonX, polygonY, vertexSpacing, rows changes

const VertexGrid = ({ polygonX, polygonY, vertexSpacing, rows }) => {
  const vertices = useMemo(() => {
    const calculatedVertices = [];
    rows.forEach((numVertices, rowIndex) => {
      const yOffset =
        polygonY + ((rowIndex - 3) * vertexSpacing * Math.sqrt(3)) / 2; // Ajuste en Y
      const xOffsetStart = polygonX - ((numVertices - 1) * vertexSpacing) / 2; // Ajuste en X inicial

      for (let i = 0; i < numVertices; i++) {
        const x = xOffsetStart + i * vertexSpacing;
        const y = yOffset;
        calculatedVertices.push({ x, y });
      }
    });
    
    return calculatedVertices;
  }, [polygonX, polygonY, vertexSpacing, rows]);

  return vertices;
};

export default VertexGrid;
