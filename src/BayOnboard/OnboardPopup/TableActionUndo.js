// material-ui imports
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
// react-icons imports
import { GrUndo } from "react-icons/gr";

export default function TableActionUndo({
  box,
  drawingData,
  setDrawingData,
  setStartPoint,
  annotatingBayId,
}) {
  const handleUndoDrawing = () => {
    if (drawingData.length > 0) {
      // Remove the last drawn line segment
      setDrawingData((prevData) => prevData.slice(0, -1));

      // If there are points left, update the startPoint to the last drawn point
      if (drawingData.length > 1) {
        setStartPoint({
          x: drawingData[drawingData.length - 2].end.x,
          y: drawingData[drawingData.length - 2].end.y,
        });
      } else {
        // If no points left, reset startPoint to null
        setStartPoint(null);
      }
    }
  };

  return (
    <>
      {box.id === annotatingBayId && drawingData.length !== 0 ? (
        <Tooltip title={"Undo"}>
          <IconButton onClick={(e) => handleUndoDrawing(e)}>
            <GrUndo />
          </IconButton>
        </Tooltip>
      ) : null}
    </>
  );
}
