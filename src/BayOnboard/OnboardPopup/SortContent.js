// material-ui imports
import Box from "@mui/material/Box";
// react-icons imports
import { AiOutlineExclamationCircle } from "react-icons/ai";

export default function SortContent({
  boxProps,
  setBoxProps,
  setRequiredSort,
}) {
  const handleSort = () => {
    const sortedBoxProps = [...boxProps].sort((a, b) => a.id - b.id);
    setBoxProps(sortedBoxProps);
    setRequiredSort(false);
  };

  return (
    <>
      <div className="m-auto text-5xl">
        <AiOutlineExclamationCircle className="text-amber-500" />
      </div>
      <div id="poppinsFont" className="m-auto flex flex-col space-y-3">
        <span className="text-xl text-wrap text-center self-center">
          {" "}
          Sorting the table is required <br /> before plotting bays further
        </span>
        <span className=" text-sm text-gray-600 self-center">
          (Please click sort to continue)
        </span>
      </div>
      <Box sx={{ "& button": { m: 1 } }}>
        <div className="w-full flex justify-center">
          <button
            id="poppinsFont"
            className="w-24 py-1 rounded-md shadow-md bg-amber-500 text-white"
            onClick={handleSort}
          >
            Sort
          </button>
        </div>
      </Box>
    </>
  );
}
