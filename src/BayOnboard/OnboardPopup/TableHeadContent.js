// react imports
import { React } from "react";
// material-ui imports
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Tooltip from "@mui/material/Tooltip";
// react-icons imports
import { FaSortNumericDown } from "react-icons/fa";
import { BsDot } from "react-icons/bs";

export default function TableHeadContent({
  boxProps,
  setBoxProps,
  setRequiredSort,
  isAscendingOrder,
  savedPolygons,
}) {
  const handleSort = () => {
    const sortedBoxProps = [...boxProps].sort((a, b) => a.id - b.id);
    setBoxProps(sortedBoxProps);
    setRequiredSort(false);
  };

  return (
    <>
      <TableHead sx={{ "& th": { backgroundColor: "#f1f5f9" } }}>
        <TableRow>
          <TableCell align="center" className="w-[32.5%]">
            Bay No.
            {!isAscendingOrder && (
              <Tooltip title={"Sort"}>
                <button className="relative" onClick={handleSort}>
                  <FaSortNumericDown className="ml-1 text-emerald-600 hover:text-emerald-700 text-sm" />
                  <BsDot className="absolute -top-2 -right-3 text-lg text-emerald-500 animate-ping" />
                </button>
              </Tooltip>
            )}
          </TableCell>
          <TableCell align="center" className="w-[36%]">
            Brand
          </TableCell>
          {savedPolygons.length !== 0 && (
            <TableCell align="center" className="w-[36%]">
              {"Annotation area (in sq.ft)"}
            </TableCell>
          )}
          {
            <TableCell align="center" className="w-[32.5%]">
              Actions
            </TableCell>
          }
        </TableRow>
      </TableHead>
    </>
  );
}
