import React, { FC } from "react";
import { faEdit } from "@fortawesome/free-solid-svg-icons"; // Import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { usePlanSelectorContext } from "../../context/PlanSelectorContext";
import { setSelectedPlan } from "../../slices/appStateSlice";
import { closeModal, openModal } from "../../slices/modalSlice";
import { renamePlan } from "../../slices/plansSlice";
import { useAppDispatch, useAppSelector } from "../../store";
import { ModalCode } from "../../utils/const";
import { ModalComponent } from "../ModalComponent";
import { RenamePlanForm } from "../Plans/RenamePlanForm";

export const RenamePlanButton: FC = () => {
  const dispatch = useAppDispatch();
  const { selectedPlan, disableableButtonClass } = usePlanSelectorContext();
  const modalIsOpen = useAppSelector(
    (state) => state.modal.modalState[ModalCode.renamePlan]
  );

  const handleOpenRenameModal = (): void => {
    dispatch(openModal(ModalCode.renamePlan));
  };

  const handleRenamePlan = (newName: string): void => {
    if (selectedPlan) {
      dispatch(renamePlan({ planId: selectedPlan.id, newName }));
      dispatch(closeModal(ModalCode.renamePlan));
      dispatch(setSelectedPlan({
        ...selectedPlan,
        name: newName,
      }));
    }
  };

  return (
    <>
      <button
        className={`bg-green-500 ${disableableButtonClass}`}
        onClick={handleOpenRenameModal}
        disabled={!selectedPlan?.id}
        title="Rename"
      >
        <div className="sm:hidden">Rename</div>
        <FontAwesomeIcon icon={faEdit} className="hidden sm:block" />
      </button>
      {modalIsOpen && selectedPlan ? (
        <ModalComponent title="Rename Plan" code={ModalCode.renamePlan}>
          <RenamePlanForm
            currentName={selectedPlan.name}
            onSubmit={handleRenamePlan}
          />
        </ModalComponent>
      ) : null}
    </>
  );
};
