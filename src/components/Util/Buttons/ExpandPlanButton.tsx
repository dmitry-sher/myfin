import React, { FC } from "react";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useAppContext } from "../../../context/AppContext";
import { IconButtonProps } from "../../../types/uiTypes";

export const ExpandPlanButton: FC<IconButtonProps> = ({ size }) => {
  const { isHeaderExpanded, setIsHeaderExpanded } = useAppContext();

  const handleExpandPlan = (): void => {
    setIsHeaderExpanded(!isHeaderExpanded);
  };
  return (
    <span className="hidden sm:block">
      <button
        className={"text-black py-2 rounded mr-2 mb-2 sm:mb-0"}
        onClick={handleExpandPlan}
        title="show plan selector"
      >
        <div className="sm:hidden">totals</div>
        <FontAwesomeIcon
          icon={faBars}
          className="hidden sm:block"
          size={size}
        />
      </button>
    </span>
  );
};
