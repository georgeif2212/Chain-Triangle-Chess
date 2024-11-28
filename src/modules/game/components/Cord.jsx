// Cord.jsx
import { Line } from "react-konva";

const Cord = ({ start, end }) => {
  return (
    <Line
      points={[start.x, start.y, end.x, end.y]} 
      stroke="blue" 
      strokeWidth={4} 
      lineCap="round"
    />
  );
};

export default Cord;
