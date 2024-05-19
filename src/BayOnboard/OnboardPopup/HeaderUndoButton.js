// react-icons imports
import { GrUndo } from "react-icons/gr";
// project imports
import DynamicButton from "../components/DynamicButton";

export default function HeaderUndoButton({
  boxProps,
  setBoxProps,
  scaledBoxProps,
  setScaledBoxProps,
  savedPolygons,
  setSavedPolygons,
  scaledSavedPolygons,
  setScaledSavedPolygons,
}) {
  const handleUndo = () => {
    if (boxProps.length > 0) {
      const newBoxProps = [...boxProps];
      const newScaledBoxProps = [...scaledBoxProps];
      const lastBox = newBoxProps.pop(); // Remove the last object
      newScaledBoxProps.pop(); // Remove the last object
      setBoxProps(newBoxProps);
      setScaledBoxProps(newScaledBoxProps);
      const updatedSavedPolygons = savedPolygons.filter(
        (polygon) => polygon.bayId !== lastBox.id
      ); // remove the corresponding polygon
      const updatedScaledSavedPolygons = scaledSavedPolygons.filter(
        (polygon) => polygon.bayId !== lastBox.id
      ); // remove the corresponding polygon
      setSavedPolygons(updatedSavedPolygons);
      setScaledSavedPolygons(updatedScaledSavedPolygons);
      // console.log(savedPolygons);
    }
  };

  return (
    <>
      <DynamicButton
        title="Undo"
        icon={GrUndo}
        type={boxProps.length > 0 ? null : "disabled"}
        onClick={handleUndo}
        toolTip={boxProps.length > 0 ? "Undo last bay" : "No bays available"}
      />
    </>
  );
}
