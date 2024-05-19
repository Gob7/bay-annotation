// project imports
import DynamicButton from "../components/DynamicButton";

export default function HeaderCloseButton({ popupOpen, setPopupOpen }) {
  const handlePopupToggle = () => {
    setPopupOpen(!popupOpen);
  };

  return (
    <>
      <DynamicButton
        title="Close"
        type="error"
        onClick={handlePopupToggle}
        toolTip="Close"
      />
    </>
  );
}
