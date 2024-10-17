import React, { FC, useEffect } from "react";
import Select from "react-select";
import {
  faClose,
  faCopy,
  faEdit,
  faFolderPlus
} from "@fortawesome/free-solid-svg-icons"; // Import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { v4 as uuidv4 } from "uuid";

import { closeModal, openModal } from "../slices/modalSlice";
import {
  addPlan,
  copyPlan,
  removePlan,
  renamePlan
} from "../slices/plansSlice";
import { useAppDispatch, useAppSelector } from "../store";
import { Plan } from "../types/entities";

import ModalComponent from "./ModalComponent";
import RenamePlanForm from "./RenamePlanForm";

interface PlanSelectorProps {
  plans: Plan[];
  selectedPlanId: string | null;
  onSelectPlan: (planId: string) => void;
}

export const PlanSelector: FC<PlanSelectorProps> = ({
  plans,
  selectedPlanId,
  onSelectPlan
}) => {
  const dispatch = useAppDispatch();

  const modalIsOpen = useAppSelector((state) => state.modal.isOpen);

  const options = plans.map((plan) => ({
    value: plan.id,
    label: plan.name
  }));

  const selectedOption =
    options.find((option) => option.value === selectedPlanId) || null;

  const handleChange = (selectedOption: any) => {
    onSelectPlan(selectedOption ? selectedOption.value : null);
  };

  const handleDuplicatePlan = () => {
    const selectedPlan = plans.find((plan) => plan.id === selectedPlanId);
    if (selectedPlan) {
      const newPlanName = `${selectedPlan.name} copy`;
      const action = {
        planId: selectedPlanId!,
        newPlanName,
        newPlanId: uuidv4()
      };
      dispatch(copyPlan(action));

      onSelectPlan(action.newPlanId);
    }
  };

  const handleOpenRenameModal = () => {
    dispatch(openModal());
  };

  const handleRenamePlan = (newName: string) => {
    if (selectedPlanId) {
      dispatch(renamePlan({ planId: selectedPlanId, newName }));
      dispatch(closeModal());
    }
  };

  const handleCreatePlan = () => {
    const newPlanName = uuidv4().substring(0, 6);
    dispatch(
      addPlan({
        newPlanName,
        newPlanId: uuidv4()
      })
    );
  };

  const handleRemovePlan = () => {
    // eslint-disable-next-line no-restricted-globals
    if (selectedPlanId && confirm("Are you sure to delete plan?")) {
      dispatch(removePlan(selectedPlanId));
      onSelectPlan("");
    }
  };

  useEffect(() => {
    if (plans && plans.length === 1) {
      onSelectPlan(plans[0].id);
    }
  }, [plans, onSelectPlan]);

  return (
    <div className="mb-4 flex items-center space-x-4">
      <Select
        options={options}
        value={selectedOption}
        onChange={handleChange}
        placeholder="Select a plan..."
        isClearable
        className="flex-1"
      />
      <button
        className="bg-green-500 text-white py-2 px-4 rounded"
        onClick={handleCreatePlan}
      >
        <FontAwesomeIcon icon={faFolderPlus} />
      </button>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded"
        onClick={handleDuplicatePlan}
        disabled={!selectedPlanId}
      >
        <FontAwesomeIcon icon={faCopy} />
      </button>
      <button
        className="bg-green-500 text-white py-2 px-4 rounded"
        onClick={handleOpenRenameModal}
        disabled={!selectedPlanId}
      >
        <FontAwesomeIcon icon={faEdit} />
      </button>
      <button
        className="bg-red-500 text-white py-2 px-4 rounded"
        onClick={handleRemovePlan}
        disabled={!selectedPlanId}
      >
        <FontAwesomeIcon icon={faClose} />
      </button>

      {modalIsOpen && selectedPlanId ? (
        <ModalComponent title="Rename Plan">
          <RenamePlanForm
            currentName={
              plans.find((plan) => plan.id === selectedPlanId)?.name || ""
            }
            onSubmit={handleRenamePlan}
          />
        </ModalComponent>
      ) : null}
    </div>
  );
};

export default PlanSelector;
