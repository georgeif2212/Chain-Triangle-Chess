import React from "react";
import { matrixValidEdges } from "../../../utils/createArrays.jsx";
import { matrixAssociatedVertices } from "../../../utils/createArrays.jsx";

const Matrix = () => {
  // console.log(matrixValidEdges);
  console.log(matrixAssociatedVertices);

  return (
    <div>
      <h3>Matriz 20x20 con datos personalizados</h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(20, 20px)",
          gap: "2px",
        }}>
        {matrixAssociatedVertices.flat().map((cell, index) => (
          <div
            key={index}
            style={{
              width: "20px",
              height: "20px",
              backgroundColor: cell === 0 ? "#fff" : "#ccc",
              border: "1px solid #000",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
            {cell !== 0 ? cell : ""}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Matrix;
