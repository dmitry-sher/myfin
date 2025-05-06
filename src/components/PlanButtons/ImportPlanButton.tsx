import React, { FC, useRef } from "react";
import { faFileImport } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { importPlanTransactions } from "../../slices/plansSlice";
import { useAppDispatch } from "../../store";
import { savedPlan2Plan } from "../../utils/savedPlanToPlan";

import { usePlanSelectorContext } from "./PlanSelectorContext";

export const ImportPlanButton: FC = () => {
  const dispatch = useAppDispatch();
  const { selectedPlanId, disableableButtonClass } = usePlanSelectorContext();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const triggerFileDialog = (): void => {
    fileInputRef.current?.click();
  };

  const handleImportPlan = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const file = event.target.files?.[0];
    if (file && selectedPlanId) {
      const reader = new FileReader();
      reader.onload = (e): void => {
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

  return (
    <>
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
    </>
  );
};
