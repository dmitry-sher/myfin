import React, { FC } from "react";
import { SizeProp } from "@fortawesome/fontawesome-svg-core";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type GeneralIconButtonProps = {
  icon: IconDefinition;
  size?: SizeProp;
  onClick: () => void;
  title: string;
};

export const GeneralIconButton: FC<GeneralIconButtonProps> = ({
  size,
  icon,
  onClick,
  title,
}) => {
  return (
    <span className="hidden sm:block">
      <button
        className={"text-black py-2 rounded mr-2 mb-2 sm:mb-0"}
        onClick={onClick}
        title={title}
      >
        <div className="sm:hidden">{title}</div>
        <FontAwesomeIcon icon={icon} className="hidden sm:block" size={size} />
      </button>
    </span>
  );
};
