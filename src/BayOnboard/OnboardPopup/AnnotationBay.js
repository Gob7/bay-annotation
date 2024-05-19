export default function AnnotationBay({
  drawingData,
  savedPolygons,
  startPoint,
}) {
  const calculateHighlightPoints = () => {
    const points = drawingData.map((line) => [line.start.x, line.start.y]);

    if (points.length >= 3) {
      // Add the last line's end point to close the shape for highlighting
      points.push([
        drawingData[drawingData.length - 1].end.x,
        drawingData[drawingData.length - 1].end.y,
      ]);
    }

    return points;
  };

  return (
    <>
      {drawingData.map((line, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            top: line.start.y,
            left: line.start.x,
            width: Math.sqrt(
              Math.pow(line.end.x - line.start.x, 2) +
                Math.pow(line.end.y - line.start.y, 2)
            ),
            height: 2,
            backgroundColor: "red",
            transform: `rotate(${Math.atan2(
              line.end.y - line.start.y,
              line.end.x - line.start.x
            )}rad)`,
            transformOrigin: "0 0",
            pointerEvents: "none",
          }}
        />
      ))}
      {startPoint && (
        <div
          style={{
            position: "absolute",
            top: startPoint.y - 2,
            left: startPoint.x - 2,
            width: 4,
            height: 4,
            backgroundColor: "red",
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        />
      )}
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          pointerEvents: "none",
        }}
        width="100%"
        height="100%"
      >
        {savedPolygons.map(({ polygonData }, polyIndex) => (
          <polygon
            key={polyIndex}
            fill="rgba(0, 255, 0, 0.3)"
            points={polygonData
              .flatMap((point) => [point.start.x, point.start.y])
              .join(" ")}
          />
        ))}

        <polygon
          fill="rgba(0, 255, 0, 0.3)"
          points={calculateHighlightPoints().flat().join(" ")}
        />
      </svg>
    </>
  );
}
