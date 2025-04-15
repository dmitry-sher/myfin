import React, { FC, useEffect, useRef } from "react";
import Select, { SingleValue } from "react-select";
import {
  faClose,
  faCopy,
  faDownload,
  faEdit,
  faFileImport,
  faFolderPlus,
} from "@fortawesome/free-solid-svg-icons"; // Import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { v4 as uuidv4 } from "uuid";

import { closeModal, openModal } from "../slices/modalSlice";
import {
  addPlan,
  copyPlan,
  exportPlan,
  importPlanTransactions,
  removePlan,
  renamePlan,
} from "../slices/plansSlice";
import { useAppDispatch, useAppSelector } from "../store";
import { Plan } from "../types/entities";
import { ModalCode } from "../utils/const";
import { savedPlan2Plan } from "../utils/savedPlanToPlan";

import ModalComponent from "./ModalComponent";
import RenamePlanForm from "./RenamePlanForm";

interface PlanSelectorProps {
  plans: Plan[];
  selectedPlanId: string | null;
  onSelectPlan: (planId: string) => void;
}

type OptionType = {
  value: string;
  label: string;
};

export const PlanSelector: FC<PlanSelectorProps> = ({
  plans,
  selectedPlanId,
  onSelectPlan,
}) => {
  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const modalIsOpen = useAppSelector((state) => state.modal.modalState[ModalCode.renamePlan]);

  const options: OptionType[] = plans.map((plan) => ({
    value: plan.id,
    label: plan.name,
  }));

  const selectedOption =
    options.find((option) => option.value === selectedPlanId) || null;

  const handleChange = (newSelectedOption: SingleValue<OptionType>) => {
    onSelectPlan(newSelectedOption ? newSelectedOption.value : "");
  };

  const handleDuplicatePlan = () => {
    const selectedPlan = plans.find((plan) => plan.id === selectedPlanId);
    if (selectedPlan) {
      const newPlanName = `${selectedPlan.name} copy`;
      const action = {
        planId: selectedPlanId || "",
        newPlanName,
        newPlanId: uuidv4(),
      };
      dispatch(copyPlan(action));

      onSelectPlan(action.newPlanId);
    }
  };

  const handleOpenRenameModal = () => {
    dispatch(openModal(ModalCode.renamePlan));
  };

  const handleRenamePlan = (newName: string) => {
    if (selectedPlanId) {
      dispatch(renamePlan({ planId: selectedPlanId, newName }));
      dispatch(closeModal(ModalCode.renamePlan));
    }
  };

  const handleCreatePlan = () => {
    const newPlanId = uuidv4();
    const newPlanName = newPlanId.substring(0, 6);
    dispatch(
      addPlan({
        newPlanName,
        newPlanId,
      })
    );
    setTimeout(() => onSelectPlan(newPlanId), 50);
  };

  const handleRemovePlan = () => {
    // eslint-disable-next-line no-restricted-globals
    if (selectedPlanId && confirm("Are you sure to delete plan?")) {
      dispatch(removePlan(selectedPlanId));
      onSelectPlan("");
    }
  };

  const handleExport = () => {
    if (!selectedPlanId) return;

    dispatch(exportPlan(selectedPlanId));
  };

  const triggerFileDialog = () => {
    fileInputRef.current?.click();
  };

  const handleImportPlan = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && selectedPlanId) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const jsonContent = e.target?.result as string;
          const parsedTransactions = savedPlan2Plan(
            JSON.parse(jsonContent)
          ).transactions;
          dispatch(
            importPlanTransactions({
              planId: selectedPlanId,
              transactions: parsedTransactions,
            })
          );
        }
        catch (error) {
          console.error("Invalid JSON file:", error);
        }
      };
      reader.readAsText(file);
    }
  };

  useEffect(() => {
    if (plans && plans.length === 1) {
      onSelectPlan(plans[0].id);
    }
  }, [plans, onSelectPlan]);

  const generalButtonClass = "text-white py-2 px-4 rounded mr-2 mb-2 sm:mb-0";
  const disableableButtonClass = `text-white py-2 px-4 rounded mr-2 mb-2 sm:mb-0 ${
    selectedPlanId ? "" : "opacity-50"
  }`;

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
      <div className="w-full sm:w-fit sm:block flex mb-2 sm:mb-0 flex-wrap">
        <button
          className={`bg-green-500 ${generalButtonClass}`}
          onClick={handleCreatePlan}
          title="Add plan"
        >
          <div className="sm:hidden">New</div>
          <FontAwesomeIcon icon={faFolderPlus} className="hidden sm:block" />
        </button>
        <button
          className={`bg-blue-500 ${disableableButtonClass}`}
          onClick={handleDuplicatePlan}
          disabled={!selectedPlanId}
          title="Duplicate"
        >
          <div className="sm:hidden">Copy</div>
          <FontAwesomeIcon icon={faCopy} className="hidden sm:block" />
        </button>
        <button
          className={`bg-green-500 ${disableableButtonClass}`}
          onClick={handleOpenRenameModal}
          disabled={!selectedPlanId}
          title="Rename"
        >
          <div className="sm:hidden">Rename</div>
          <FontAwesomeIcon icon={faEdit} className="hidden sm:block" />
        </button>
        <button
          className={`bg-red-500 ${disableableButtonClass}`}
          onClick={handleRemovePlan}
          disabled={!selectedPlanId}
          title="Remove"
        >
          <div className="sm:hidden">Remove</div>
          <FontAwesomeIcon icon={faClose} className="hidden sm:block" />
        </button>
        <button
          className={`bg-gray-500 ${disableableButtonClass}`}
          onClick={handleExport}
          disabled={!selectedPlanId}
          title="Export"
        >
          <div className="sm:hidden">Export</div>
          <FontAwesomeIcon icon={faDownload} className="hidden sm:block" />
        </button>
        <button
          className={`bg-gray-500 ${disableableButtonClass}`}
          onClick={triggerFileDialog}
          disabled={!selectedPlanId}
          title="Import"
        >
          <div className="sm:hidden">Import</div>
          <FontAwesomeIcon icon={faFileImport} className="hidden sm:block" />
        </button>
        {/* Hidden file input for importing */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImportPlan}
          accept=".json"
          style={{ display: "none" }}
        />
      </div>

      {modalIsOpen && selectedPlanId ? (
        <ModalComponent title="Rename Plan" code={ModalCode.renamePlan}>
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
