// material-ui imports
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
// project imports
import TableBayNumber from "./TableBayNumber";
import TableBrandSelect from "./TableBrandSelect";
import TableBodyActions from "./TableBodyActions";

export default function TableBodyContent({
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
  return (
    <>
      <TableBody>
        {boxProps.map((box, index) => (
          <TableRow key={index} className="hover:bg-slate-100">
            <TableBayNumber
              box={box}
              index={index}
              boxProps={boxProps}
              setBoxProps={setBoxProps}
            />

            <TableBrandSelect box={box} setBoxProps={setBoxProps} />

            {savedPolygons.length !== 0 && (
              <TableCell align="center">
                {savedPolygons
                  .find((polygon) => polygon.bayId === box.id)
                  ?.actualArea.toFixed(2) || "_"}
              </TableCell>
            )}

            <TableBodyActions
              box={box}
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
          </TableRow>
        ))}
      </TableBody>
    </>
  );
}
