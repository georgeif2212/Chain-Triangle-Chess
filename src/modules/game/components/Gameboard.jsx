import React, { useEffect, useState, useRef } from "react";
import { Stage, Layer, RegularPolygon } from "react-konva";
import VertexGrid from "./VertexGrid.jsx";
import TriangleLayer from "./TriangleLayer.jsx";
import ConnectionLayer from "./ConnectionLayer.jsx";
import VertexLayer from "./VertexLayer.jsx";
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
      };

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
        <TriangleLayer triangles={triangles} />
        <ConnectionLayer connections={connections} />
        <VertexLayer vertices={vertices} onVertexClick={handleVertexClick} />
      </Stage>
    </div>
  );
};

export default GameBoard;
