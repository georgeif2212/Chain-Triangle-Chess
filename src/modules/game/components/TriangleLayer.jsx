import { Line } from "react-konva";

  const TriangleLayer = ({ triangles }) => {

  return (
    <>
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
          stroke="#EF4B4B"
          strokeWidth={2}
          fill="#EF4B4B"
          closed
        />
      ))}
    </>
  );
};
export default TriangleLayer;
