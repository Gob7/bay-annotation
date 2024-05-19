// react imports
import { useState } from "react";

export default function BoxBay({
  drawing,
  setDrawingData,
  annotating,
  boxProps,
  annotatingBayId,
  startPoint,
  setStartPoint,
  startPos,
  endPos,
}) {
  const [hoveredBoxId, setHoveredBoxId] = useState(null); // Stores the ID of the Hovered bay

  const handleMouseDownOnBay = (e, bayId) => {
    if (drawing || !annotating || bayId !== annotatingBayId) {
      return;
    }
    const offsetX = e.clientX;
    const offsetY = e.clientY;

    if (startPoint) {
      // Draw line if startPoint exists
      setDrawingData((prevData) => [
        ...prevData,
        { start: startPoint, end: { x: offsetX, y: offsetY } },
      ]);
      setStartPoint({ x: offsetX, y: offsetY });
    } else {
      // Set startPoint if it doesn't exist
      setStartPoint({ x: offsetX, y: offsetY });
    }
  };

  return (
    <>
      {boxProps.map((box) => (
        <div
          key={box.id}
          className={`absolute border-2 border-${
            box.id === annotatingBayId ? "green-500" : "white"
          } cursor-${annotatingBayId === box.id ? "pointer" : "not-allowed"} ${
            hoveredBoxId === box.id
              ? "border-lime-500 bg-lime-500 bg-opacity-[.3]"
              : ""
          }`}
          style={{
            left: box.x1,
            top: box.y1,
            width: box.width,
            height: box.height,
          }}
          onMouseDown={(e) => handleMouseDownOnBay(e, box.id)}
        >
          <span className="relative text-white -top-6 left-1">
            Bay {box.id}
          </span>
          <div className="absolute text-white -bottom-6 left-1">
            {box.brand}
          </div>
        </div>
      ))}

      {drawing && (
        <div
          className="absolute border-2 border-green-500"
          style={{
            left: Math.min(startPos.x, endPos.x),
            top: Math.min(startPos.y, endPos.y),
            width: Math.abs(endPos.x - startPos.x),
            height: Math.abs(endPos.y - startPos.y),
          }}
        />
      )}
    </>
  );
}
