import React, { useEffect, useState, useRef } from "react";
import { Stage, Layer, RegularPolygon, Line } from "react-konva";
import Vertex from "./Vertex.jsx";
import VertexGrid from "./VertexGrid.jsx";
import Cord from "./Cord.jsx";

import { checkNewTriangles } from "./Rules.jsx";

const GameBoard = () => {
  const [stageWidth, setStageWidth] = useState(0);
  const [stageHeight, setStageHeight] = useState(0);
  const [connections, setConnections] = useState([]);
  const [triangles, setTriangles] = useState([]);
  const [selectedVertex, setSelectedVertex] = useState(null);
  const containerRef = useRef(null);

  const polygonX = stageWidth / 2;
  const polygonY = stageHeight / 2;
  const radius = stageWidth / 4;
  const vertexSpacing = stageWidth / 10;
  const rows = [3, 4, 5, 4, 3];

  // Generar coordenadas para los vértices
  const vertices = VertexGrid({ polygonX, polygonY, vertexSpacing, rows });

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

  const handleVertexClick = (vertex) => {
    if (selectedVertex) {
      const vertex1 =
        selectedVertex.index < vertex.index ? selectedVertex : vertex;
      const vertex2 =
        selectedVertex.index > vertex.index ? selectedVertex : vertex;

      const onValidConnection = (index1, index2) => {
        setConnections((prevConnections) => [
          ...prevConnections,
          {
            start: { ...selectedVertex, index: index1 },
            end: { ...vertex, index: index2 },
          },
        ]);
      };

      const generateNewTriangle = (coordinates) => {
        setTriangles((prevTriangles) => [...prevTriangles, coordinates]);
        console.log("triangles: ", triangles);
        console.log("COORDENADAS: ", coordinates);
      };

      // Call function with onValidConnection Callback
      checkNewTriangles(
        vertex1,
        vertex2,
        onValidConnection,
        vertices,
        generateNewTriangle
      );

      setSelectedVertex(null);
    } else {
      setSelectedVertex(vertex);
    }
  };

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
          {triangles.map((triangle, index) => (
            <Line
              key={index}
              points={[
                triangle[0].x,
                triangle[0].y,
                triangle[1].x,
                triangle[1].y,
                triangle[2].x,
                triangle[2].y,
              ]}
              stroke="red"
              strokeWidth={2}
              fill="red"
              closed
            />
          ))}
        </Layer>

        <Layer>
          {connections.map((connection, index) => (
            <Cord key={index} start={connection.start} end={connection.end} />
          ))}
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
      </Stage>
    </div>
  );
};

export default GameBoard;
