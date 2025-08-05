import { checkNewTriangles, isValidConnection } from "@services/Rules.jsx";

class ClassicMoveStrategy {
  constructor({
    vertex1,
    vertex2,
    onValidConnection,
    vertices,
    generateNewTriangle,
    context,
    onInvalidConnection,
  }) {
    this.vertex1 = vertex1;
    this.vertex2 = vertex2;
    this.onValidConnection = onValidConnection;
    this.vertices = vertices;
    this.generateNewTriangle = generateNewTriangle;
    this.context = context;
    this.onInvalidConnection = onInvalidConnection;
  }

  execute() {
    const { dispatch } = this.context;

    if (isValidConnection(this.vertex1, this.vertex2)) {
      dispatch({ type: "NEXT_TEAM" });
    }
    checkNewTriangles(
      this.vertex1,
      this.vertex2,
      this.onValidConnection,
      this.vertices,
      this.generateNewTriangle,
      this.context,
      this.onInvalidConnection
    );
  }
}

export default ClassicMoveStrategy;
