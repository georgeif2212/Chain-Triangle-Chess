import { Layer, RegularPolygon } from "react-konva";

const HexagonLayer = ({ x, y, radius }) => (
  <Layer>
    <RegularPolygon
      x={x}
      y={y}
      sides={6}
      radius={radius}
      fillLinearGradientStartPoint={{ x: -radius, y: -radius }}
      fillLinearGradientEndPoint={{ x: radius, y: radius }}
      fillLinearGradientColorStops={[0, "#F5E9D5", 1, "#EAD8C0"]} 
      stroke="#8B6F4E" 
      strokeWidth={5}
      rotation={90}
      shadowColor="#A79277"
      shadowBlur={20}
      shadowOffset={{ x: 5, y: 5 }}
      shadowOpacity={0.25}
      perfectDrawEnabled={false}
    />
  </Layer>
);

export default HexagonLayer;
