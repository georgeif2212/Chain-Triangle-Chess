import { Line, Layer } from "react-konva";
import { useEffect, useRef } from "react";

const Triangle = ({ triangle }) => {
  const triangleRef = useRef(null);

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
        triangle.coordinates[0].x,
        triangle.coordinates[0].y,
        triangle.coordinates[1].x,
        triangle.coordinates[1].y,
        triangle.coordinates[2].x,
        triangle.coordinates[2].y,
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
