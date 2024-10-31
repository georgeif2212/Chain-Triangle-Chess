import { Circle } from "react-konva";

const Vertex = ({ x, y }) => {

  return (
    <Circle
      x={x}
      y={y}
      radius={10} // Tamaño del vértice
      fill="black" // Color de los vértices
      stroke="black" // Color del borde
      strokeWidth={1}
      onMouseEnter={(e) => {
        // Cambia el cursor a "pointer" al pasar el mouse
        const container = e.target.getStage().container();
        container.style.cursor = "pointer";
      }}
      onMouseLeave={(e) => {
        // Vuelve el cursor a su estilo predeterminado al salir
        const container = e.target.getStage().container();
        container.style.cursor = "default";
      }}
    />
  );
};

export default Vertex;
