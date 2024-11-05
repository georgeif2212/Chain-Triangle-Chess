import { Circle } from "react-konva";

const Vertex = ({ x, y, onClick }) => {
  return (
    <Circle
      x={x}
      y={y}
      radius={10}
      fill="black"
      stroke="black"
      strokeWidth={1}
      onClick={onClick} 
      onMouseEnter={(e) => {
        const container = e.target.getStage().container();
        container.style.cursor = "pointer";
      }}
      onMouseLeave={(e) => {
        const container = e.target.getStage().container();
        container.style.cursor = "default";
      }}
    />
  );
};

export default Vertex;
