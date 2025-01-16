import { Line } from "react-konva";

const TriangleLayer = ({ triangles }) => (
  <>
    {triangles.map((triangle, index) => (
      <Line
        key={index}
        points={[
          triangle[0].x, triangle[0].y,
          triangle[1].x, triangle[1].y,
          triangle[2].x, triangle[2].y,
        ]}
        stroke="#EF4B4B"
        strokeWidth={2}
        fill="#EF4B4B"
        closed
      />
    ))}
  </>
);

export default TriangleLayer;
