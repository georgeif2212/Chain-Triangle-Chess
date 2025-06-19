import { Circle, Text, Group } from "react-konva";
import { useEffect, useRef } from "react";

const Vertex = ({ x, y, isSelected, onClick, index }) => {
  const circleRef = useRef(null);

  // * Animación del círculo al seleccionarlo
  useEffect(() => {
    if (circleRef.current) {
      circleRef.current.to({
        radius: isSelected ? 16 : 12,
        fill: isSelected ? "#d4b68a" : "#A79277",
        stroke: isSelected ? "#8a6f4d" : "#5c4936",
        duration: 0.1,
      });
    }
  }, [isSelected]);

  return (
    <Group
      x={x}
      y={y}
      onClick={onClick}
      onMouseEnter={(e) => {
        e.target.getStage().container().style.cursor = "pointer";
      }}
      onMouseLeave={(e) => {
        e.target.getStage().container().style.cursor = "default";
      }}
    >
      <Circle
        ref={circleRef}
        radius={12}
        fill="#A79277"
        stroke="#5c4936"
        strokeWidth={2}
        shadowColor="black"
        shadowBlur={isSelected ? 8 : 3}
        shadowOffset={{ x: 0, y: 1 }}
        shadowOpacity={isSelected ? 0.4 : 0.2}
      />
      <Text
        text={String(index)}
        fontSize={11}
        fontFamily="sans-serif"
        fill="#ffffff" // tono marrón oscuro, combina con el stroke
        align="center"
        verticalAlign="middle"
        offsetX={4.5}
        offsetY={5}
        fontStyle="bold"
      />
    </Group>
  );
};

export default Vertex;
