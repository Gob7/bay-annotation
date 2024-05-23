import React from "react";
import PropTypes from "prop-types";
import { Tooltip } from "@mui/material";

function DynamicButton({
  title,
  icon: IconComponent,
  onClick,
  type,
  toolTip,
  iconSize,
}) {
  // Define color based on the type prop
  let buttonColorClass;
  switch (type) {
    case "disabled":
      buttonColorClass = "bg-slate-300 text-gray-400 cursor-not-allowed";
      break;
    case "success":
      buttonColorClass =
        "bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 text-white";
      break;
    case "error":
      buttonColorClass =
        "bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 text-white";
      break;
    default:
      buttonColorClass =
        "bg-gradient-to-r from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 text-gray-700";
  }

  let iconSizeClass;
  switch (iconSize) {
    case "lg":
      iconSizeClass = "text-lg";
      break;
    case "xl":
      iconSizeClass = "text-xl";
      break;
    case "2xl":
      iconSizeClass = "text-2xl";
      break;
    case "3xl":
      iconSizeClass = "text-3xl";
      break;
    default:
      iconSizeClass = "text-base";
  }

  return (
    <Tooltip title={toolTip}>
      <button
        onClick={onClick}
        className={`flex w-28 py-2 px-3 justify-center items-center rounded-full shadow-xl transform transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95 ${buttonColorClass}`}
      >
        {IconComponent && <IconComponent className={`mr-2 ${iconSizeClass}`} />}
        <span className="font-semibold">{title}</span>
      </button>
    </Tooltip>
  );
}

DynamicButton.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.oneOfType([PropTypes.elementType, PropTypes.func]),
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["disabled", "success", "error"]),
  toolTip: PropTypes.string,
  iconSize: PropTypes.string,
};

export default DynamicButton;
