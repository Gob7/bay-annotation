// project imports
import HeaderClearButton from "./HeaderClearButton";
import HeaderUndoButton from "./HeaderUndoButton";
import HeaderSaveButton from "./HeaderSaveButton";
import HeaderCloseButton from "./HeaderCloseButton";

export default function HeaderContent({
  boxProps,
  setBoxProps,
  setStartPoint,
  setDrawingData,
  savedPolygons,
  setSavedPolygons,
  scaledBoxProps,
  setScaledBoxProps,
  scaledSavedPolygons,
  setScaledSavedPolygons,
  setAnnotating,
  setAnnotatingBayId,
  popupOpen,
  setPopupOpen,
}) {
  return (
    <div className="w-full flex flex-row bg-stone-300 border-b border-gray-400 py-2.5 justify-between px-3">
      <div className="flex flex-col sm:flex-row space-y-1 space-x-0 sm:space-y-0 sm:space-x-4">
        <span id="rubikFont" className="text-xl self-start sm:self-center">
          Trends-NeoPhyte Test Store-Mumbai
        </span>
      </div>
      <div className="flex flex-col-reverse lg:flex-row gap-2">
        <HeaderClearButton
          boxProps={boxProps}
          setBoxProps={setBoxProps}
          setStartPoint={setStartPoint}
          setDrawingData={setDrawingData}
          setSavedPolygons={setSavedPolygons}
          setAnnotating={setAnnotating}
          setAnnotatingBayId={setAnnotatingBayId}
        />
        <HeaderUndoButton
          boxProps={boxProps}
          setBoxProps={setBoxProps}
          scaledBoxProps={scaledBoxProps}
          setScaledBoxProps={setScaledBoxProps}
          savedPolygons={savedPolygons}
          setSavedPolygons={setSavedPolygons}
          scaledSavedPolygons={scaledSavedPolygons}
          setScaledSavedPolygons={setScaledSavedPolygons}
        />
        <HeaderSaveButton
          scaledBoxProps={scaledBoxProps}
          scaledSavedPolygons={scaledSavedPolygons}
        />
        <HeaderCloseButton popupOpen={popupOpen} setPopupOpen={setPopupOpen} />
      </div>
    </div>
  );
}
