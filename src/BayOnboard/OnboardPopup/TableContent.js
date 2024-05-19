// react imports
import { React } from "react";
// material-ui imports
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
// project imports
import TableHeadContent from "./TableHeadContent";
import TableBodyContent from "./TableBodyContent";

export default function TableContent({
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
  isAscendingOrder,
  setRequiredSort,
}) {
  return (
    <>
      <Card className="flex-1">
        <div className="h-[90vh] overflow-y-auto scrollbar">
          <Table stickyHeader sx={{ width: "100%" }}>
            <TableHeadContent
              boxProps={boxProps}
              setBoxProps={setBoxProps}
              setRequiredSort={setRequiredSort}
              isAscendingOrder={isAscendingOrder}
              savedPolygons={savedPolygons}
            />

            <TableBodyContent
              boxProps={boxProps}
              setBoxProps={setBoxProps}
              savedPolygons={savedPolygons}
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
          </Table>
        </div>
      </Card>
    </>
  );
}
