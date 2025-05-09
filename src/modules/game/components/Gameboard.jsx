import React, { useState, useEffect } from "react";
import { Stage } from "react-konva";
import HexagonLayer from "./HexagonLayer.jsx";
import TriangleLayer from "./TriangleLayer.jsx";
import ConnectionLayer from "./ConnectionLayer.jsx";
import VertexLayer from "./VertexLayer.jsx";
import VertexGrid from "./VertexGrid.jsx";
import useVertexSelection from "../hooks/useVertexSelection";
import "../styles/components/Gameboard.css";
import InvalidMoveAlert from "../../core/design/Alert.jsx";

const GameBoard = () => {
  const [stageSize, setStageSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [invalidMoveAlert, setInvalidMoveAlert] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setStageSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [connections, setConnections] = useState([]);
  const [triangles, setTriangles] = useState([]);

  const polygonX = stageSize.width / 2;
  const polygonY = stageSize.height / 2;
  const radius = stageSize.width / 4;
  const vertexSpacing = stageSize.width / 10;
  const rows = [3, 4, 5, 4, 3];

  const vertices = VertexGrid({ polygonX, polygonY, vertexSpacing, rows });
  const handleVertexClick = useVertexSelection(
    vertices,
    setConnections,
    setTriangles,
    setInvalidMoveAlert
  );

  return (
    <div className="board-container">
      <Stage width={stageSize.width} height={stageSize.height}>
        <HexagonLayer x={polygonX} y={polygonY} radius={radius} />
        <TriangleLayer triangles={triangles} />
        <ConnectionLayer connections={connections} />
        <VertexLayer vertices={vertices} onVertexClick={handleVertexClick} />
      </Stage>
      <InvalidMoveAlert
        open={invalidMoveAlert}
        onClose={() => setInvalidMoveAlert(false)}
      />
    </div>
  );
};

export default GameBoard;
