import { Layer } from "react-konva";
import Cord from "./Cord.jsx";

const ConnectionLayer = ({ connections }) => (
  <Layer>
    {connections.map((connection, index) => (
      <Cord key={index} start={connection.start} end={connection.end} />
    ))}
  </Layer>
);

export default ConnectionLayer;
