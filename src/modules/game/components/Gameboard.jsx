import React, { useState } from "react";
import { Stage } from "react-konva";
import useStageSize from "../hooks/useStageSize";
import useVertexSelection from "../hooks/useVertexSelection";
import VertexGrid from "./VertexGrid.jsx";
import TriangleLayer from "./TriangleLayer.jsx";
import ConnectionLayer from "./ConnectionLayer.jsx";
import VertexLayer from "./VertexLayer.jsx";
import HexagonLayer from "./HexagonLayer.jsx";

const GameBoard = () => {
  const { stageSize, containerRef } = useStageSize();
  const [connections, setConnections] = useState([]);
  const [triangles, setTriangles] = useState([]);

  const polygonX = stageSize.width / 2;
  const polygonY = stageSize.height / 2;
  const radius = stageSize.width / 4;
  const vertexSpacing = stageSize.width / 10;
  const rows = [3, 4, 5, 4, 3];

  const vertices = VertexGrid({ polygonX, polygonY, vertexSpacing, rows });
  const handleVertexClick = useVertexSelection(vertices, setConnections, setTriangles);

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%" }}>
      <Stage width={stageSize.width} height={stageSize.height}>
        <HexagonLayer x={polygonX} y={polygonY} radius={radius} />
        <TriangleLayer triangles={triangles} />
        <ConnectionLayer connections={connections} />
        <VertexLayer vertices={vertices} onVertexClick={handleVertexClick} />
      </Stage>
    </div>
  );
};

export default GameBoard;
