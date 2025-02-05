import Vertex from "./Vertex.jsx";
import { Layer } from "react-konva";
const VertexLayer = ({ vertices, onVertexClick }) => (
  <Layer>
    {vertices.map((pos, index) => (
      <Vertex
        key={index}
        x={pos.x}
        y={pos.y}
        onClick={() => onVertexClick(pos)}
      />
    ))}
  </Layer>
);

export default VertexLayer;
