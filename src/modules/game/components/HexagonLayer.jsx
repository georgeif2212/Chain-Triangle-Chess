import { Layer, RegularPolygon } from "react-konva";

const HexagonLayer = ({ x, y, radius }) => (
  <Layer>
    <RegularPolygon
      x={x}
      y={y}
      sides={6}
      radius={radius}
      fill="#EAD8C0"
      stroke="#A79277"
      strokeWidth={4}
      rotation={90}
    />
  </Layer>
);

export default HexagonLayer;
