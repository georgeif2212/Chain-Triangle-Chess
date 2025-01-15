import Cord from "./Cord.jsx";

const ConnectionLayer = ({ connections }) => (
  <>
    {connections.map((connection, index) => (
      <Cord key={index} start={connection.start} end={connection.end} />
    ))}
  </>
);

export default ConnectionLayer;
