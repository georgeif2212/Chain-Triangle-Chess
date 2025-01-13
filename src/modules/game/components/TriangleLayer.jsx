import { Layer, Line } from "react-konva";

const TriangleLayer = ({ triangles }) => (
  <Layer>
    {triangles.map((triangle, index) => (
      <Line
        key={index}
        points={[
          triangle[0].x, triangle[0].y,
          triangle[1].x, triangle[1].y,
          triangle[2].x, triangle[2].y,
        ]}
        stroke="red"
        strokeWidth={2}
        fill="red"
        closed
      />
    ))}
  </Layer>
);

export default TriangleLayer;
