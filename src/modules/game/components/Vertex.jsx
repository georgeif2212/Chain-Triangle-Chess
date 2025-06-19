import { Circle } from "react-konva";
import { useEffect, useRef } from "react";

const Vertex = ({ x, y, isSelected, onClick }) => {
  const circleRef = useRef(null);

  // * Animation
  useEffect(() => {
    if (circleRef.current) {
      circleRef.current.to({
        radius: isSelected ? 14 : 10,
        fill: isSelected ? "#d4b68a" : "#A79277",
        stroke: isSelected ? "#8a6f4d" : "#5c4936",
        duration: 0.1,
      });
    }
  }, [isSelected]);

  return (
    <Circle
      ref={circleRef}
      x={x}
      y={y}
      radius={10}
      fill="#A79277"
      stroke="#5c4936"
      strokeWidth={2}
      onClick={onClick}
      shadowColor="black"
      shadowBlur={isSelected ? 8 : 3}
      shadowOffset={{ x: 0, y: 1 }}
      shadowOpacity={isSelected ? 0.4 : 0.2}
      onMouseEnter={(e) => {
        e.target.getStage().container().style.cursor = "pointer";
      }}
      onMouseLeave={(e) => {
        e.target.getStage().container().style.cursor = "default";
      }}
    />
  );
};

export default Vertex;
