import React, { useEffect, useState } from "react";
import { Stage, Layer, RegularPolygon } from "react-konva";
import Vertex from "./Vertex.jsx";
import VertexGrid from "./VertexGrid.jsx";

const GameBoard = () => {
  const [stageWidth, setStageWidth] = useState(window.innerWidth);
  const [stageHeight, setStageHeight] = useState(window.innerHeight);

  const polygonX = stageWidth / 2;                  // * X axis of the hexagon
  const polygonY = stageHeight / 2;                 // * Y axis of the hexagon
  const radius = window.innerWidth / 4;             // * Radius of the hexagon
  const vertexSpacing = window.innerWidth / 16;     // * Spacing between vertices
  const rows = [4, 5, 6, 7, 6, 5, 4];               // * Number of vertices in each row

  useEffect(() => {
    const handleResize = () => {
      setStageWidth(window.innerWidth);
      setStageHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // * Generates the coordinates of the vertices
  const vertices = VertexGrid({ polygonX, polygonY, vertexSpacing, rows });

  return (
    <Stage width={stageWidth} height={stageHeight}>
      <Layer>
        <RegularPolygon
          x={polygonX}
          y={polygonY}
          sides={6}
          radius={radius}
          fill="grey"
          stroke="grey"
          strokeWidth={1}
          rotation={90}
        />
      </Layer>
      <Layer>
        {vertices.map((pos, index) => (
          <Vertex key={index} x={pos.x} y={pos.y} />
        ))}
      </Layer>
    </Stage>
  );
};

export default GameBoard;
