import Cord from "./Cord.jsx";
import { Layer } from "react-konva";
const ConnectionLayer = ({ connections }) => (
  <Layer>
    {connections.map((connection, index) => (
      <Cord key={index} start={connection.start} end={connection.end} />
    ))}
  </Layer>
);

export default ConnectionLayer;
