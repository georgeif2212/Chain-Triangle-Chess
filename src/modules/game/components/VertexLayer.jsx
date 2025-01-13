import { Layer } from "react-konva";
import Vertex from "./Vertex.jsx";

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
