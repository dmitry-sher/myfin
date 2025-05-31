import React, { FC } from "react";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import { useAppContext } from "../../context/AppContext";
import { IconButtonProps } from "../../types/uiTypes";

import { GeneralIconButton } from "./GeneralIconButton";

export const ExpandPlanButton: FC<IconButtonProps> = ({ size }) => {
  const { isHeaderExpanded, setIsHeaderExpanded } = useAppContext();

  const handleExpandPlan = (): void => {
    setIsHeaderExpanded(!isHeaderExpanded);
  };
  return (
    <GeneralIconButton
      onClick={handleExpandPlan}
      title="show plan selector"
      icon={faBars}
      size={size}
    />
  );
};
