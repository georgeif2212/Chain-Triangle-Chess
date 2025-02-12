import { useState, useEffect, useRef } from "react";

const useStageSize = () => {
  const [stageSize, setStageSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    const currentContainer = containerRef.current; // Guardar referencia actual

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setStageSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
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
  }, []); // No se necesita agregar dependencias

  return { stageSize, containerRef };
};

export default useStageSize;
