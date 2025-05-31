import React, { FC } from "react";
import { faClose } from "@fortawesome/free-solid-svg-icons";

import { useAppContext } from "../../context/AppContext";
import { IconButtonProps } from "../../types/uiTypes";

import { GeneralIconButton } from "./GeneralIconButton";

export const ClosePlanSelectorButton: FC<IconButtonProps> = ({ size }) => {
  const { setIsHeaderExpanded } = useAppContext();

  const handleClosePlanSelector = (): void => {
    setIsHeaderExpanded(false);
  };
  return (
    <GeneralIconButton
      onClick={handleClosePlanSelector}
      title="close plan selector"
      icon={faClose}
      size={size}
    />
  );
};
