import { Line, Layer } from "react-konva";
import { useEffect, useRef } from "react";

const shrinkTriangle = (coordinates, factor = 0.85) => {
  // Calcular centroide
  const cx = (coordinates[0].x + coordinates[1].x + coordinates[2].x) / 3;
  const cy = (coordinates[0].y + coordinates[1].y + coordinates[2].y) / 3;

  // Acercar cada punto hacia el centroide
  return coordinates.map((point) => ({
    x: cx + (point.x - cx) * factor,
    y: cy + (point.y - cy) * factor,
  }));
};

const Triangle = ({ triangle }) => {
  const triangleRef = useRef(null);

  const shrunkCoords = shrinkTriangle(triangle.coordinates, 0.75);

  useEffect(() => {
    if (triangleRef.current) {
      triangleRef.current.to({
        fill: triangle.team.color,
        opacity: 1,
        duration: 0.5,
        easing: Konva.Easings.EaseInOut,
      });
    }
  }, [triangle.team.color]);

  return (
    <Line
      ref={triangleRef}
      points={[
        shrunkCoords[0].x,
        shrunkCoords[0].y,
        shrunkCoords[1].x,
        shrunkCoords[1].y,
        shrunkCoords[2].x,
        shrunkCoords[2].y,
      ]}
      stroke="#5a5a5a"
      strokeWidth={1}
      fill={triangle.team.color}
      opacity={0}
      closed
    />
  );
};

const TriangleLayer = ({ triangles }) => {
  return (
    <Layer>
      {triangles.map((triangle, index) => (
        <Triangle key={index} triangle={triangle} />
      ))}
    </Layer>
  );
};

export default TriangleLayer;
