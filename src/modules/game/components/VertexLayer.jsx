import Vertex from "./Vertex.jsx";

const VertexLayer = ({ vertices, onVertexClick }) => (
  <>
    {vertices.map((pos, index) => (
      <Vertex
        key={index}
        x={pos.x}
        y={pos.y}
        onClick={() => onVertexClick(pos)}
      />
    ))}
  </>
);

export default VertexLayer;
