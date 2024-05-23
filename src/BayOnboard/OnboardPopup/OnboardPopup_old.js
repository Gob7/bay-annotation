// react imports
import { React, useState, useEffect } from "react";
// material-ui imports
import { Dialog, DialogContent } from "@mui/material";
// react-icons imports
import { FaMapMarkedAlt } from "react-icons/fa";
// project imports
import HeaderContent from "./HeaderContent";
import AnnotationContent from "./AnnotationContent";
import TableContent from "./TableContent";
import SortContent from "./SortContent";

export default function OnboardPopup() {
  // UseState constants
  const [popupOpen, setPopupOpen] = useState(false); // Open main dialog
  const [realDimension, setRealDimension] = useState({
    width: 0,
    height: 0,
  }); // Real Image Dimensions
  const [plottedDimensions, setPlottedDimensions] = useState({
    width: 0,
    height: 0,
  }); // Plotted Image Dimensions
  const [imgOffset, setImgOffset] = useState({ x: 0, y: 0 }); // Img dist. from left wrt VP
  const [boxProps, setBoxProps] = useState([]); // Stores the data to print the annotations
  const [scaledBoxProps, setScaledBoxProps] = useState([]); // Stores the annotation data to be sent through the API call
  const [scaledSavedPolygons, setScaledSavedPolygons] = useState([]); // Stores the saved polygons data to be sent through the API call
  const [isAscendingOrder, setIsAscendingOrder] = useState(null);
  const [requiredSort, setRequiredSort] = useState(false);
  const [drawingData, setDrawingData] = useState([]); // stores drawing points for currently active bays anotation
  const [startPoint, setStartPoint] = useState(null); // anotation starts from this point
  const [savedPolygons, setSavedPolygons] = useState([]); // stores all anotated polygons data
  const [annotating, setAnnotating] = useState(false); // True when anotation button is pressed, indicates anotation is active within a bay
  const [annotatingBayId, setAnnotatingBayId] = useState(null); // Stores currently active bay's ID for anotation

  // Main dialog open/close function
  const handlePopupToggle = () => {
    setPopupOpen(!popupOpen);
  };

  const handleSort = () => {
    const sortedBoxProps = [...boxProps].sort((a, b) => a.id - b.id);
    setBoxProps(sortedBoxProps);
    setRequiredSort(false);
  };

  const checkAscendingOrder = (array) => {
    for (let i = 1; i < array.length; i++) {
      if (array[i].id < array[i - 1].id) {
        return false;
      }
    }
    return true;
  };

  const checkAndSort = (data) => {
    // Check if the array contains an object with id: 1 and it's not in the first index
    const hasId1NotInFirstIndex =
      data.some((item) => item.id === 1) && data[0].id !== 1;
    if (hasId1NotInFirstIndex) {
      // Sort the array based on the id property
      return true;
    }
    // Return the original array if the condition is not met
    return false;
  };

  //useEffects
  useEffect(() => {
    const ascendingResult = checkAscendingOrder(boxProps);
    setIsAscendingOrder(ascendingResult);
    const sortRequired = checkAndSort(boxProps);
    if (sortRequired) {
      handleSort();
    }
    const scale_factor_x = realDimension.width / plottedDimensions.width;
    const scale_factor_y = realDimension.height / plottedDimensions.height;
    const sortedBoxProps = [...boxProps].sort((a, b) => a.id - b.id);
    setScaledBoxProps(
      sortedBoxProps.map((boxProp) => {
        const { id, x1, x2, y1, y2, brand, left, right, top, bottom } = boxProp;
        const x1_scaled = Math.floor((x1 - imgOffset.x) * scale_factor_x);
        const x2_scaled = Math.ceil((x2 - imgOffset.x) * scale_factor_x);
        const y1_scaled = Math.floor((y1 - imgOffset.y) * scale_factor_y);
        const y2_scaled = Math.ceil((y2 - imgOffset.y) * scale_factor_y);
        return {
          id: id,
          x: x1_scaled,
          y: y1_scaled,
          width: x2_scaled - x1_scaled,
          height: y2_scaled - y1_scaled,
          configs: {
            brand: brand,
            left: left,
            right: right,
            top: top,
            bottom: bottom,
          },
        };
      })
    );
  }, [boxProps]);

  // Polygon Scaling
  useEffect(() => {
    const transormedPolyons = savedPolygons.map(
      ({ polygonData, ...polygon }) => {
        return {
          ...polygon,
          polygonData: transformArray([polygonData])[0],
        };
      }
    );
    setScaledSavedPolygons(
      transormedPolyons.map(({ polygonData, ...transormedPolyon }) => {
        const scaling_X = realDimension.width / plottedDimensions.width;
        const scaling_Y = realDimension.height / plottedDimensions.height;
        return {
          ...transormedPolyon,
          polygonData: polygonData.map((coord) => {
            return {
              x: (coord.x - Math.floor(imgOffset.x)) * scaling_X,
              y: (coord.y - Math.floor(imgOffset.y)) * scaling_Y,
            };
          }),
        };
      })
    );
  }, [savedPolygons]);

  useEffect(() => {
    if (annotatingBayId) {
      const polygonWithAnnotatingBayId = savedPolygons.filter(
        (polygon) => polygon.bayId === annotatingBayId
      );
      if (polygonWithAnnotatingBayId.length !== 0) {
        setStartPoint(polygonWithAnnotatingBayId[0].startPoint);
        setDrawingData(polygonWithAnnotatingBayId[0].polygonData.slice(0, -1));
        const updatedSavedPolygons = savedPolygons.filter(
          (polygon) => polygon.bayId !== annotatingBayId
        );
        setSavedPolygons(updatedSavedPolygons);
      }
    }
  }, [annotatingBayId]);

  const transformArray = (inputArray) => {
    return inputArray.map((subArray) => subArray.map(({ start }) => start));
  };

  return (
    <>
      {/* Map button */}
      <button className="text-3xl text-emerald-500" onClick={handlePopupToggle}>
        <FaMapMarkedAlt />
      </button>

      {/*Dialog Popup*/}
      <Dialog
        fullScreen
        open={popupOpen}
        onClose={handlePopupToggle}
        PaperProps={{
          sx: {
            boxShadow: "none",
          },
        }}
      >
        <DialogContent
          className="overflow-y-auto scrollbar"
          style={{
            paddingLeft: 0,
            paddingRight: 0,
            paddingTop: 0,
            paddingBottom: 0,
            overflow: "hidden",
          }}
        >
          {/*Dialog Content*/}
          <div className="w-full h-full flex flex-col">
            {/*Header Content*/}
            <HeaderContent
              boxProps={boxProps}
              setBoxProps={setBoxProps}
              setStartPoint={setStartPoint}
              setDrawingData={setDrawingData}
              savedPolygons={savedPolygons}
              setSavedPolygons={setSavedPolygons}
              scaledBoxProps={scaledBoxProps}
              setScaledBoxProps={setScaledBoxProps}
              scaledSavedPolygons={scaledSavedPolygons}
              setScaledSavedPolygons={setScaledSavedPolygons}
              setAnnotating={setAnnotating}
              setAnnotatingBayId={setAnnotatingBayId}
              popupOpen={popupOpen}
              setPopupOpen={setPopupOpen}
            />

            {/*Annotation Content*/}
            <div className="flex-grow flex">
              <AnnotationContent
                annotating={annotating}
                boxProps={boxProps}
                setBoxProps={setBoxProps}
                setRealDimension={setRealDimension}
                setPlottedDimensions={setPlottedDimensions}
                setImgOffset={setImgOffset}
                annotatingBayId={annotatingBayId}
                startPoint={startPoint}
                setStartPoint={setStartPoint}
                drawingData={drawingData}
                setDrawingData={setDrawingData}
                savedPolygons={savedPolygons}
              />

              {/*Table Content*/}
              <TableContent
                boxProps={boxProps}
                setBoxProps={setBoxProps}
                savedPolygons={savedPolygons}
                setSavedPolygons={setSavedPolygons}
                drawingData={drawingData}
                setDrawingData={setDrawingData}
                startPoint={startPoint}
                setStartPoint={setStartPoint}
                setAnnotating={setAnnotating}
                annotatingBayId={annotatingBayId}
                setAnnotatingBayId={setAnnotatingBayId}
                plottedDimensions={plottedDimensions}
                isAscendingOrder={isAscendingOrder}
                setRequiredSort={setRequiredSort}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={requiredSort}>
        <DialogContent className="">
          <div className="w-full h-full flex flex-col space-y-4 m-auto">
            <SortContent
              boxProps={boxProps}
              setBoxProps={setBoxProps}
              setRequiredSort={setRequiredSort}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
