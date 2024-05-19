// material-ui imports
import Popover from "@mui/material/Popover";
// react-icons imports
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
// options
const ITEM_HEIGHT = 48;

export default function TableActionPopover({
  popoverData,
  setPopoverData,
  openConfigs,
  setOpenConfigs,
  setBoxProps,
}) {
  // close configs menu
  const closeConfigsMenu = () => {
    setBoxProps((prevData) =>
      prevData.map((item) =>
        item.id === popoverData.id ? { ...item, ...popoverData } : item
      )
    );
    setOpenConfigs(null);
  };

  // change parts no.
  const handlePopoverInputChange = (key, value) => {
    setPopoverData((prevData) => ({
      ...prevData,
      [key]: value === "" ? 0 : parseInt(value),
    }));
  };

  const handlePopoverIncrement = (key) => {
    setPopoverData((prevData) => ({
      ...prevData,
      [key]: (prevData[key] || 0) + 1,
    }));
  };

  const handlePopoverDecrement = (key) => {
    setPopoverData((prevData) => ({
      ...prevData,
      [key]: Math.max((prevData[key] || 0) - 1, 0),
    }));
  };

  return (
    <>
      <Popover
        open={!!openConfigs}
        anchorEl={openConfigs}
        onClose={closeConfigsMenu}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 7,
            width: "23ch",
            paddingTop: "3px",
            paddingBottom: "4px",
          },
        }}
      >
        <div className="w-full flex">
          <div className="w-1/2 pt-2 pb-1">
            <span className="pl-3 font-semibold text-gray-500">Aisle</span>
          </div>
          <div className="w-1/2 py-2">
            <span className="pl-5 font-semibold text-gray-500">Shelves</span>
          </div>
        </div>
        <div className="w-full border border-gray-200"></div>
        <div className="w-full flex flex-col space-y-2 my-3 px-3">
          <div className="w-full flex">
            <span className="text-base w-1/2 self-center">Left</span>
            <div className="w-1/2 flex justify-center">
              <div className="flex w-[90px] h-full space-x-4 border border-gray-200 px-2 py-1 rounded">
                <FaMinus
                  onClick={(e) => handlePopoverDecrement("left")}
                  className="self-center cursor-pointer text-sm text-red-500"
                />
                <input
                  className="outline-none w-6 text-center h-5"
                  placeholder="0"
                  onChange={(e) =>
                    handlePopoverInputChange("left", e.target.value)
                  }
                  value={popoverData.left || ""}
                  type="number"
                />
                <FaPlus
                  onClick={(e) => handlePopoverIncrement("left")}
                  className="self-center cursor-pointer text-sm text-emerald-500"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col space-y-2 my-3 px-3">
          <div className="w-full flex">
            <span className="text-base w-1/2 self-center">Right</span>
            <div className="w-1/2 flex justify-center">
              <div className="flex w-[90px] h-full space-x-4 border border-gray-200 px-2 py-1 rounded">
                <FaMinus
                  onClick={(e) => handlePopoverDecrement("right")}
                  className="self-center cursor-pointer text-sm text-red-500"
                />
                <input
                  className="outline-none w-6 text-center h-5"
                  placeholder="0"
                  onChange={(e) =>
                    handlePopoverInputChange("right", e.target.value)
                  }
                  value={popoverData.right || ""}
                  type="number"
                />
                <FaPlus
                  onClick={(e) => handlePopoverIncrement("right")}
                  className="self-center cursor-pointer text-sm text-emerald-500"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col space-y-2 my-3 px-3">
          <div className="w-full flex">
            <span className="text-base w-1/2 self-center">Top</span>
            <div className="w-1/2 flex justify-center">
              <div className="flex w-[90px] h-full space-x-4 border border-gray-200 px-2 py-1 rounded">
                <FaMinus
                  onClick={(e) => handlePopoverDecrement("top")}
                  className="self-center cursor-pointer text-sm text-red-500"
                />
                <input
                  className="outline-none w-6 text-center h-5"
                  placeholder="0"
                  onChange={(e) =>
                    handlePopoverInputChange("top", e.target.value)
                  }
                  value={popoverData.top || ""}
                  type="number"
                />
                <FaPlus
                  onClick={(e) => handlePopoverIncrement("top")}
                  className="self-center cursor-pointer text-sm text-emerald-500"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col space-y-2 mt-3 mb-2 px-3">
          <div className="w-full flex">
            <span className="text-base w-1/2 self-center">Bottom</span>
            <div className="w-1/2 flex justify-center">
              <div className="flex w-[90px] h-full space-x-4 border border-gray-200 px-2 py-1 rounded">
                <FaMinus
                  onClick={(e) => handlePopoverDecrement("bottom")}
                  className="self-center cursor-pointer text-sm text-red-500"
                />
                <input
                  className="outline-none w-6 text-center h-5"
                  placeholder="0"
                  onChange={(e) =>
                    handlePopoverInputChange("bottom", e.target.value)
                  }
                  value={popoverData.bottom || ""}
                  type="number"
                />
                <FaPlus
                  onClick={(e) => handlePopoverIncrement("bottom")}
                  className="self-center cursor-pointer text-sm text-emerald-500"
                />
              </div>
            </div>
          </div>
        </div>
      </Popover>
    </>
  );
}
