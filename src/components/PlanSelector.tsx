import React, { FC, useEffect } from "react";
import Select from "react-select";
import {
  faClose,
  faCopy,
  faEdit,
  faFolderPlus,
} from "@fortawesome/free-solid-svg-icons"; // Import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { v4 as uuidv4 } from "uuid";

import { closeModal, openModal } from "../slices/modalSlice";
import {
  addPlan,
  copyPlan,
  removePlan,
  renamePlan,
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
  onSelectPlan,
}) => {
  const dispatch = useAppDispatch();

  const modalIsOpen = useAppSelector((state) => state.modal.isOpen);

  const options = plans.map((plan) => ({
    value: plan.id,
    label: plan.name,
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
        newPlanId: uuidv4(),
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
        newPlanId: uuidv4(),
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
    <div className="mb-4 flex flex-col-reverse sm:flex-row items-center sm:space-x-4">
      <div className="w-full sm:w-1/2">
        <Select
          options={options}
          value={selectedOption}
          onChange={handleChange}
          placeholder="Select a plan..."
          isClearable
          className="flex-1"
        />
      </div>
      <div className="w-full sm:w-fit sm:block flex justify-between mb-2 sm:mb-0">
        <button
          className="bg-green-500 text-white py-2 px-4 rounded sm:mr-2"
          onClick={handleCreatePlan}
        >
          <div className="sm:hidden">New</div>
          <FontAwesomeIcon icon={faFolderPlus} title="Add plan" className="hidden sm:block" />
        </button>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded sm:mr-2"
          onClick={handleDuplicatePlan}
          disabled={!selectedPlanId}
        >
          <div className="sm:hidden">Copy</div>
          <FontAwesomeIcon icon={faCopy} title="Duplicate" className="hidden sm:block" />
        </button>
        <button
          className="bg-green-500 text-white py-2 px-4 rounded sm:mr-2"
          onClick={handleOpenRenameModal}
          disabled={!selectedPlanId}
        >
          <div className="sm:hidden">Rename</div>
          <FontAwesomeIcon icon={faEdit} title="Rename" className="hidden sm:block" />
        </button>
        <button
          className="bg-red-500 text-white py-2 px-4 rounded sm:mr-2"
          onClick={handleRemovePlan}
          disabled={!selectedPlanId}
        >
          <div className="sm:hidden">Remove</div>
          <FontAwesomeIcon icon={faClose} title="Remove" className="hidden sm:block" />
        </button>
      </div>

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
