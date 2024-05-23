// project imports
import DynamicButton from "../components/DynamicButton";

export default function HeaderMarkSection({}) {
  const handleClickMarkSection = () => {
    if (!markingSection) {
      setMarkingSection(true);
    } else {
      if (drawingData.length > 0) {
        // Include the last dot when clicking "Done"
        const completedPolygon = [
          ...drawingData,
          {
            start: drawingData[drawingData.length - 1].end,
            end: drawingData[0].start,
          },
        ];
        const plottedArea = calculateAreaOfPolygon(
          ...transformArray([completedPolygon])
        );
        const section = {
          sectionData: completedPolygon,
          startPoint: startPoint, // Todo: set startPoint to end point of completed polygon
          plottedArea: plottedArea, // area in terms of pixels
          actualArea: ACTUAL_BLUSHLACE_AREA,
        };
        setSectionProps(section);
      }
      setShowGrid(true);
      setDrawingData([]);
      setStartPoint(null);
      setMarkingSection(false);
    }
  };

  return (
    <>
      <DynamicButton
        title={markingSection ? "Done" : "MarkSection"}
        onClick={handleClickMarkSection}
        toolTip="Mark"
      />
    </>
  );
}
