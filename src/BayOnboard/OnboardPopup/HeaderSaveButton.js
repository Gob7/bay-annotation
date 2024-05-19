// project imports
import DynamicButton from "../components/DynamicButton";

export default function HeaderSaveButton({
  scaledBoxProps,
  scaledSavedPolygons,
}) {
  const handleClickSave = () => {
    console.log("saved scaled bays", scaledBoxProps);
    console.log("saved scaled Polygons", scaledSavedPolygons);
  };

  return (
    <>
      <DynamicButton
        title="Save"
        type="success"
        onClick={handleClickSave}
        toolTip="Save Changes"
      />
    </>
  );
}
