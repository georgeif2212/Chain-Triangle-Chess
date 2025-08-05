import { useMemo } from "react";

const VertexGrid = ({ polygonX, polygonY, vertexSpacing, rows }) => {
  return useMemo(() => {
    let index = 1;
    return rows.flatMap((numVertices, rowIndex) => {
      const yOffset = polygonY + ((rowIndex - (rows.length - 1) / 2) * vertexSpacing * Math.sqrt(3)) / 2;
      const xOffsetStart = polygonX - ((numVertices - 1) * vertexSpacing) / 2;
      return Array.from({ length: numVertices }, (_, i) => ({
        x: xOffsetStart + i * vertexSpacing,
        y: yOffset,
        index: index++,
      }));
    });
  }, [polygonX, polygonY, vertexSpacing, rows]);
};

export default VertexGrid;
