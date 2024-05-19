// react imports
import { React, useState } from "react";
// material-ui imports
import TableCell from "@mui/material/TableCell";
// project imports
import TableActionAnnotate from "./TableActionAnnotate";
import TableActionUndo from "./TableActionUndo";
import TableActionConfigure from "./TableActionConfigure";
import TableActionDelete from "./TableActionDelete";
import TableActionPopover from "./TableActionPopover";

export default function TableBodyActions({
  box,
  boxProps,
  setBoxProps,
  savedPolygons,
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
  const [openConfigs, setOpenConfigs] = useState(null);
  const [popoverData, setPopoverData] = useState({});

  return (
    <>
      <TableCell align="center">
        <div className="flex justify-center space-x-3">
          <TableActionAnnotate
            box={box}
            setSavedPolygons={setSavedPolygons}
            drawingData={drawingData}
            setDrawingData={setDrawingData}
            startPoint={startPoint}
            setStartPoint={setStartPoint}
            setAnnotating={setAnnotating}
            annotatingBayId={annotatingBayId}
            setAnnotatingBayId={setAnnotatingBayId}
            plottedDimensions={plottedDimensions}
          />

          <TableActionUndo
            box={box}
            drawingData={drawingData}
            setDrawingData={setDrawingData}
            setStartPoint={setStartPoint}
            annotatingBayId={annotatingBayId}
          />

          <TableActionConfigure
            box={box}
            setPopoverData={setPopoverData}
            setOpenConfigs={setOpenConfigs}
          />

          <TableActionDelete
            box={box}
            boxProps={boxProps}
            setBoxProps={setBoxProps}
            savedPolygons={savedPolygons}
            setSavedPolygons={setSavedPolygons}
            setDrawingData={setDrawingData}
            setStartPoint={setStartPoint}
            setAnnotating={setAnnotating}
            setAnnotatingBayId={setAnnotatingBayId}
          />
        </div>

        <TableActionPopover
          popoverData={popoverData}
          setPopoverData={setPopoverData}
          openConfigs={openConfigs}
          setOpenConfigs={setOpenConfigs}
          setBoxProps={setBoxProps}
        />
      </TableCell>
    </>
  );
}
