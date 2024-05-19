// material-ui imports
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
// react-icons imports
import { IoSettingsSharp } from "react-icons/io5";

export default function TableActionConfigure({
  box,
  setPopoverData,
  setOpenConfigs,
}) {
  // open configs menu
  const openConfigsMenu = (event, boxData) => {
    setPopoverData(boxData);
    setOpenConfigs(event.currentTarget);
  };

  return (
    <>
      <Tooltip title={"Configuration"}>
        <IconButton onClick={(e) => openConfigsMenu(e, box)}>
          <IoSettingsSharp className="text-xl text-emerald-500" />
        </IconButton>
      </Tooltip>
    </>
  );
}
