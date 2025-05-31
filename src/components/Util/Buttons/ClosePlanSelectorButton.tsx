import React, { FC } from "react";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useAppContext } from "../../../context/AppContext";
import { IconButtonProps } from "../../../types/uiTypes";

export const ClosePlanSelectorButton: FC<IconButtonProps> = ({ size }) => {
  const { setIsHeaderExpanded } = useAppContext();

  const handleClosePlanSelector = (): void => {
    setIsHeaderExpanded(false);
  };
  return (
    <span className="hidden sm:block">
      <button
        className={"text-black py-2 rounded mr-2 mb-2 sm:mb-0"}
        onClick={handleClosePlanSelector}
        title="totals"
      >
        <div className="sm:hidden">totals</div>
        <FontAwesomeIcon
          icon={faClose}
          className="hidden sm:block"
          size={size}
        />
      </button>
    </span>
  );
};
