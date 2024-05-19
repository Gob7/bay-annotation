// material-ui imports
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
// react-icons imports
import { MdDelete } from "react-icons/md";

export default function TableActionDelete({
  box,
  boxProps,
  setBoxProps,
  savedPolygons,
  setSavedPolygons,
  setDrawingData,
  setStartPoint,
  setAnnotating,
  setAnnotatingBayId,
}) {
  // delete a plotted bay
  const handleDelete = (id) => {
    const updatedBoxProps = boxProps.filter((box) => box.id !== id);
    const updatedSavedPolygons = savedPolygons.filter(
      (polygon) => polygon.bayId !== id
    );
    // setBayId(id - 1);
    setBoxProps(updatedBoxProps);
    setSavedPolygons(updatedSavedPolygons);
    setStartPoint(null);
    setDrawingData([]);
    setAnnotating(false);
    setAnnotatingBayId(null);
  };

  return (
    <>
      <Tooltip title={"Delete"}>
        <IconButton onClick={() => handleDelete(box.id)}>
          <MdDelete className="text-2xl text-red-500" />
        </IconButton>
      </Tooltip>
    </>
  );
}
