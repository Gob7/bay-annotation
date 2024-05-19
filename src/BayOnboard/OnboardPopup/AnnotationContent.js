// react imports
import { useState, useRef } from "react";
// assets
import floorLayout from "../../assets/orionfloor.jpg";
import BoxBay from "./BoxBay";
import AnnotationBay from "./AnnotationBay";

export default function AnnotationContent({
  annotating,
  boxProps,
  setBoxProps,
  setRealDimension,
  setPlottedDimensions,
  setImgOffset,
  annotatingBayId,
  startPoint,
  setStartPoint,
  drawingData,
  setDrawingData,
  savedPolygons,
}) {
  const [imgSize, setImgSize] = useState({ width: 0, height: 0 }); // To Set the size of the Img parent div
  const [drawing, setDrawing] = useState(false); // Mouse left button is pressed
  const [startPos, setStartPos] = useState({ x: 0, y: 0 }); // Box starts drawing from
  const [endPos, setEndPos] = useState({ x: 0, y: 0 }); // Box stops drawing at
  // UseRefs
  const imageRef = useRef(null);

  //Annotation with mouse click functions
  const handleMouseDown = (event) => {
    if (annotating) {
      return;
    }
    event.preventDefault();
    setDrawing(true);
    const x = event.clientX;
    const y = event.clientY;
    setStartPos({ x: x, y: y });
    setEndPos({ x: x, y: y });
  };

  const handleMouseMove = (event) => {
    event.preventDefault();
    if (!drawing) {
      return;
    }

    let x = event.clientX;
    let y = event.clientY;

    if (drawing) {
      setEndPos({ x, y });
    }
  };

  const MINIMUM_AREA = 700;
  const handleMouseUp = () => {
    if (drawing) {
      const result = findMissingId(boxProps);
      setDrawing(false);
      const width = Math.abs(endPos.x - startPos.x);
      const height = Math.abs(endPos.y - startPos.y);

      // Check if the area is greater than the minimum area
      if (width * height < MINIMUM_AREA) {
        alert("Rectangle area is too small. Please draw a larger rectangle.");
        return;
      }
      const box = {
        id: result,
        x1: Math.min(startPos.x, endPos.x),
        x2: Math.max(startPos.x, endPos.x),
        y1: Math.min(startPos.y, endPos.y),
        y2: Math.max(startPos.y, endPos.y),
        brand: "",
        width: Math.abs(endPos.x - startPos.x),
        height: Math.abs(endPos.y - startPos.y),
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      };
      setBoxProps((prevBoxProps) => [...prevBoxProps, box]);
    }
  };

  //Find real, rendered dimensions & offset wrt VP of the image
  const findImgDimensions = (event) => {
    const { naturalWidth, naturalHeight } = event.target;
    const imgDiv = imageRef.current;
    const { width, height, left, top } = imgDiv.getBoundingClientRect();
    setImgSize({ ...imgSize, width: width, height: height });
    setRealDimension({ width: naturalWidth, height: naturalHeight });
    setPlottedDimensions({ width: width, height: height });
    setImgOffset({ x: left, y: top });
  };

  const findMissingId = (array) => {
    if (array.length === 0 || array[0].id !== 1) {
      return 1; // Return 1 if the array is empty or if the first id is not 1
    }

    const sortedIds = array.map((item) => item.id).sort((a, b) => a - b);
    for (let i = 1; i < sortedIds.length; i++) {
      if (sortedIds[i] - sortedIds[i - 1] !== 1) {
        return sortedIds[i - 1] + 1;
      }
    }
    // If no missing id found, return the next number after the last id
    return sortedIds[sortedIds.length - 1] + 1;
  };

  return (
    <div className="w-[70vw] px-2 py-2 flex justify-center">
      <div
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className={`self-center w-[${imgSize.width}] h-[${imgSize.height}]`}
      >
        <img
          ref={imageRef}
          onLoad={findImgDimensions}
          src={floorLayout}
          alt="img not found"
          className="max-h-[86vh]"
        />

        <BoxBay
          drawing={drawing}
          setDrawingData={setDrawingData}
          annotating={annotating}
          boxProps={boxProps}
          annotatingBayId={annotatingBayId}
          startPoint={startPoint}
          setStartPoint={setStartPoint}
          startPos={startPos}
          endPos={endPos}
        />

        <AnnotationBay
          drawingData={drawingData}
          savedPolygons={savedPolygons}
          startPoint={startPoint}
        />
      </div>
    </div>
  );
}
