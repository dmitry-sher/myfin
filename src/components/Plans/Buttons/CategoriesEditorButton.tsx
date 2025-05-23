import React, { FC } from "react";
import { faFolderTree } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { openModal } from "../../../slices/modalSlice";
import { useAppDispatch } from "../../../store";
import { ModalCode } from "../../../utils/const";

export const CategoriesEditorButton: FC = () => {
  const dispatch = useAppDispatch();

  const handleCreatePlan = (): void => {
    dispatch(openModal(ModalCode.categoryList));
  };

  return (
    <button
      className={"bg-green-500 text-white py-2 px-4 rounded mr-2 mb-2 sm:mb-0"}
      onClick={handleCreatePlan}
      title="Categories"
    >
      <div className="sm:hidden">Categories</div>
      <FontAwesomeIcon icon={faFolderTree} className="hidden sm:block" />
    </button>
  );
};
