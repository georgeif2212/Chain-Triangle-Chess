import React, { useEffect, useState, useRef } from "react";
import { Stage, Layer, RegularPolygon } from "react-konva";
import Vertex from "./Vertex.jsx";
import VertexGrid from "./VertexGrid.jsx";
import Cord from "./Cord.jsx";

import { checkNewTriangles } from "./Rules.jsx";

const GameBoard = () => {
  const containerRef = useRef(null);
  const [stageWidth, setStageWidth] = useState(0);
  const [stageHeight, setStageHeight] = useState(0);

  useEffect(() => {
    const currentContainer = containerRef.current;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setStageWidth(entry.contentRect.width);
        setStageHeight(entry.contentRect.height);
      }
    });

    if (currentContainer) {
      resizeObserver.observe(currentContainer);
    }

    return () => {
      if (currentContainer) {
        resizeObserver.unobserve(currentContainer);
      }
    };
  }, []);

  const polygonX = stageWidth / 2;
  const polygonY = stageHeight / 2;
  const radius = stageWidth / 4;
  const vertexSpacing = stageWidth / 10;
  const rows = [3, 4, 5, 4, 3];

  const [connections, setConnections] = useState([]);
  const [selectedVertex, setSelectedVertex] = useState(null);

  
  const handleVertexClick = (vertex) => {
    if (selectedVertex) {
      const p1 = selectedVertex.index < vertex.index ? selectedVertex.index : vertex.index;
      const p2 = selectedVertex.index > vertex.index ? selectedVertex.index : vertex.index;
      
      checkNewTriangles(p1, p2);
    
      setConnections([...connections, { start: selectedVertex, end: vertex }]);
      setSelectedVertex(null);
    } else {
      setSelectedVertex(vertex);
    }
  };

  // Generar coordenadas para los vértices
  const vertices = VertexGrid({ polygonX, polygonY, vertexSpacing, rows });

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%" }}>
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
            <Vertex
              key={index}
              x={pos.x}
              y={pos.y}
              onClick={() => handleVertexClick(pos)}
            />
          ))}
        </Layer>

        <Layer>
          {connections.map((connection, index) => (
            <Cord key={index} start={connection.start} end={connection.end} />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default GameBoard;
