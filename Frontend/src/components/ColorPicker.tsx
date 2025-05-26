"use strict";

import React, { FC, useState } from "react";
import { ColorChangeHandler, HuePicker } from "react-color";

import { PleasantLightness, PleasantSaturation } from "../utils/const";
import {
  hslToHex,
} from "../utils/generatePleasantColor";

type ColorPickerProps = {
  color: string;
  onAccept?: (newColor: string) => void;
};

export const ColorPicker: FC<ColorPickerProps> = ({ color, onAccept }) => {
  const [displayColor, setDisplayColor] = useState(color);
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const handleClick = (): void => {
    setDisplayColorPicker(true);
  };

  const handleChange: ColorChangeHandler = (newcolor) => {
    const newDisplayColor = hslToHex(
      newcolor.hsl.h,
      PleasantSaturation,
      PleasantLightness
    );
    setDisplayColor(newDisplayColor);
  };

  const handleAccept = (): void => {
    setDisplayColorPicker(false);
    onAccept?.(displayColor);
  };

  const handleCancel = (): void => {
    setDisplayColorPicker(false);
    setDisplayColor(color); // reset to original
  };

  return (
    <div>
      {displayColor ? (
        <div
          className="w-6 h-6 rounded cursor-pointer border"
          style={{ backgroundColor: color }}
          onClick={handleClick}
        />
      ) : (
        <div className="ml-1 cursor-pointer" onClick={handleClick}>
          --
        </div>
      )}
      {displayColorPicker ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-lg mx-auto mt-20">
            <HuePicker color={displayColor} onChange={handleChange} />
            <div className="mt-4 flex items-center">
              <div className="mr-2 text-sm">Preview:</div>
              <div
                className="w-6 h-6 rounded border inline-block ml-2"
                style={{ backgroundColor: displayColor }}
              />
            </div>
            <div className="mt-6 flex justify-end space-x-2">
              <button
                onClick={handleCancel}
                className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleAccept}
                className="px-3 py-1 rounded bg-blue-500 hover:bg-blue-600 text-white text-sm"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
