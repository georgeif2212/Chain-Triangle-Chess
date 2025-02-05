import { Line,Layer } from "react-konva";

  const TriangleLayer = ({ triangles }) => {
  return (
    <Layer>
      {triangles.map((triangle, index) => (
        <Line
          key={index}
          points={[
            triangle.coordinates[0].x,
            triangle.coordinates[0].y,
            triangle.coordinates[1].x,
            triangle.coordinates[1].y,
            triangle.coordinates[2].x,
            triangle.coordinates[2].y,
          ]}
          stroke={triangle.team.color}
          strokeWidth={2}
          fill={triangle.team.color}
          closed
        />
      ))}
    </Layer>
  );
};
export default TriangleLayer;
