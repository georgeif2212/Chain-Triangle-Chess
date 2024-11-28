import React, { useEffect, useState } from "react";
import { Stage, Layer, RegularPolygon } from "react-konva";
import Vertex from "./Vertex.jsx";
import VertexGrid from "./VertexGrid.jsx";
import Cord from "./Cord.jsx";

const GameBoard = () => {
  // * Generates the polygon
  const [stageWidth, setStageWidth] = useState(window.innerWidth);
  const [stageHeight, setStageHeight] = useState(window.innerHeight);
  const polygonX = stageWidth / 2;
  const polygonY = stageHeight / 2;
  const radius = window.innerWidth / 4;
  const vertexSpacing = window.innerWidth / 16;
  const rows = [4, 5, 6, 7, 6, 5, 4];

  useEffect(() => {
    const handleResize = () => {
      setStageWidth(window.innerWidth);
      setStageHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // * Generates the connections
  const [connections, setConnections] = useState([]);
  const [selectedVertex, setSelectedVertex] = useState(null); 

  const handleVertexClick = (vertex) => {
    if (selectedVertex) {
      // Verifica que ambos vértices estén en la misma fila y sean adyacentes
      const isSameRow = selectedVertex.row === vertex.row;
      const isSameC = selectedVertex.row === vertex.row;
      const isAdjacent = Math.abs(selectedVertex.col - vertex.col) === 1;
  
      if (isSameRow ) {
        setConnections([...connections, { start: selectedVertex, end: vertex }]);
        setSelectedVertex(null);
      } else {
        // Si no son adyacentes, deselecciona el vértice seleccionado
        setSelectedVertex(null);
      }
    } else {
      setSelectedVertex(vertex);
    }
  };
  
  
  // * Generates the coordinates for the vertices
  const vertices = VertexGrid({ polygonX, polygonY, vertexSpacing, rows });

  return (
    <Stage width={stageWidth} height={stageHeight}>
      {/*// * Layer for the hexagon */}
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

      {/* // *  Layer for the verticecs */}
      <Layer>
        {vertices.map((pos, index) => (
          <Vertex key={index} x={pos.x} y={pos.y} onClick={() => handleVertexClick(pos)} />
        ))}
      </Layer>

      {/* // * Layer for the connections */}
      <Layer>
        {connections.map((connection, index) => (
          <Cord key={index} start={connection.start} end={connection.end} />
        ))}
      </Layer>
    </Stage>
  );
};

export default GameBoard;
