import Vertex from "./Vertex.jsx";
import { Layer } from "react-konva";
const VertexLayer = ({ vertices, onVertexClick, selectedVertex }) => (
  <Layer>
    {vertices.map((pos, index) => (
      <Vertex
        key={index}
        x={pos.x}
        y={pos.y}
        isSelected={index === selectedVertex - 1}
        onClick={() => onVertexClick(pos)}
      />
    ))}
  </Layer>
);

export default VertexLayer;
