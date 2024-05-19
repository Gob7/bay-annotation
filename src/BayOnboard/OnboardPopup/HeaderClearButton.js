// react-icons imports
import { MdOutlineCleaningServices } from "react-icons/md";
// project imports
import DynamicButton from "../components/DynamicButton";

export default function HeaderClearButton({
  boxProps,
  setBoxProps,
  setStartPoint,
  setDrawingData,
  setSavedPolygons,
  setAnnotating,
  setAnnotatingBayId,
}) {
  const handleClear = () => {
    setBoxProps([]);
    setStartPoint(null);
    setDrawingData([]);
    setSavedPolygons([]);
    setAnnotating(false);
    setAnnotatingBayId(null);
  };

  return (
    <>
      <DynamicButton
        title="Clear"
        icon={MdOutlineCleaningServices}
        type={boxProps.length > 0 ? null : "disabled"}
        onClick={handleClear}
        toolTip={boxProps.length > 0 ? "Undo last bay" : "No bays available"}
      />
    </>
  );
}
