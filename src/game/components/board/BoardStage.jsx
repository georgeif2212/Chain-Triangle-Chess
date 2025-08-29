import { Stage } from "react-konva";
import HexagonLayer from "./HexagonLayer.jsx";
import TriangleLayer from "./TriangleLayer.jsx";
import ConnectionLayer from "./ConnectionLayer.jsx";
import VertexLayer from "./VertexLayer.jsx";

const BoardStage = ({
  stageSize,
  triangles,
  connections,
  vertices,
  selectedVertexIndex,
  handleVertexClick,
}) => {
  if (stageSize.width === 0 || stageSize.height === 0) return null;

  return (
    <Stage width={stageSize.width} height={stageSize.height}>
      <HexagonLayer
        x={stageSize.width / 2}
        y={stageSize.height / 2}
        radius={Math.min(stageSize.width, stageSize.height) / 2}
      />
      <TriangleLayer triangles={triangles} />
      <ConnectionLayer connections={connections} />
      <VertexLayer
        vertices={vertices}
        selectedVertex={selectedVertexIndex}
        onVertexClick={handleVertexClick}
      />
    </Stage>
  );
};

export default BoardStage;
