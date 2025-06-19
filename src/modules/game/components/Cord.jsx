import { Line } from "react-konva";
import { useRef, useEffect, useState } from "react";

const Cord = ({ start, end, fromIndex }) => {
  const lineRef = useRef(null);
  const [drawn, setDrawn] = useState(false);

  const from = fromIndex === start.index ? start : end;
  const to = fromIndex === start.index ? end : start;

  useEffect(() => {
    if (lineRef.current && !drawn) {
      lineRef.current.points([from.x, from.y, from.x, from.y]);

      lineRef.current.to({
        points: [from.x, from.y, to.x, to.y],
        duration: 0.2,
        easing: Konva.Easings.EaseInOut,
      });

      setDrawn(true);
    }
  }, [from, to, drawn]);

  return (
    <Line ref={lineRef} stroke="#5c4936" strokeWidth={4} lineCap="round" />
  );
};

export default Cord;
