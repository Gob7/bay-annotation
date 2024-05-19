// material-ui imports
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
// react-icons imports
import { FaDrawPolygon } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa6";

export default function TableActionAnnotate({
  box,
  setSavedPolygons,
  drawingData,
  setDrawingData,
  startPoint,
  setStartPoint,
  setAnnotating,
  annotatingBayId,
  setAnnotatingBayId,
  plottedDimensions,
}) {
  const ACTUAL_FLOOR_AREA = 1500; // sq.ft

  // Image annotation
  const handleAnnotateBay = (event, id) => {
    if (id === annotatingBayId) {
      // if annotatingBayId is not null and anotating bay is same as seleceted bay, this means the selection is shifted without pressing done
      setAnnotating(false);
      setAnnotatingBayId(null);
    } else {
      setAnnotating(true);
      setAnnotatingBayId(id);
    }
    handleDone(event, id); // Whenever selected bay is to be changed, complete the polygon drawing and then change
  };

  const handleDone = (e, bayId) => {
    if (drawingData.length > 0) {
      // Include the last dot when clicking "Done"
      const completedPolygon = [
        ...drawingData,
        {
          start: drawingData[drawingData.length - 1].end,
          end: drawingData[0].start,
        },
      ];
      const plottedArea = calculateAreaOfPolygon(
        ...transformArray([completedPolygon])
      );
      const polygon = {
        bayId: bayId,
        polygonData: completedPolygon,
        startPoint: startPoint, // Todo: set startPoint to end point of completed polygon
        area: plottedArea, // area in terms of pixels
        actualArea:
          (ACTUAL_FLOOR_AREA /
            (plottedDimensions.width * plottedDimensions.height)) *
          plottedArea,
      };
      // Save the drawn polygon to the list of saved polygons
      setSavedPolygons((prevPolygons) => [...prevPolygons, polygon]);
    }
    // Reset drawingData and startPoint for a new polygon
    setDrawingData([]);
    setStartPoint(null);
  };

  const calculateAreaOfPolygon = (vertices) => {
    // accepts an array of objects representing vertices with coordinates of its vertices
    const n = vertices.length;
    const area = vertices.reduce((acc, vertex, index) => {
      const nextIndex = (index + 1) % n;
      const { x: x1, y: y1 } = vertex;
      const { x: x2, y: y2 } = vertices[nextIndex];
      return acc + (x1 * y2 - x2 * y1); // shoelace formula
    }, 0);
    return Math.abs(area) / 2;
  };

  const transformArray = (inputArray) => {
    return inputArray.map((subArray) => subArray.map(({ start }) => start));
  };

  return (
    <>
      <Tooltip title={box.id === annotatingBayId ? "Done" : "Annotate"}>
        <IconButton onClick={(e) => handleAnnotateBay(e, box.id)}>
          {annotatingBayId === box.id ? (
            <FaCheck color="#10b981" />
          ) : (
            <FaDrawPolygon />
          )}
        </IconButton>
      </Tooltip>
    </>
  );
}
