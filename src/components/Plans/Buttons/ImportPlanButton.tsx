import React, { ChangeEvent, FC, useRef } from "react";
import { faFileImport } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { usePlanSelectorContext } from "../../../context/PlanSelectorContext";
import { importPlanTransactions } from "../../../slices/plansSlice";
import { useAppDispatch } from "../../../store";
import { savedPlan2Plan } from "../../../utils/savedPlanToPlan";

export const ImportPlanButton: FC = () => {
  const dispatch = useAppDispatch();
  const { selectedPlan, disableableButtonClass } = usePlanSelectorContext();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const triggerFileDialog = (): void => {
    fileInputRef.current?.click();
  };

  const handleImportPlan = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    const file = event.target.files?.[0];
    if (file && selectedPlan?.id) {
      const reader = new FileReader();
      reader.onload = (e): void => {
        try {
          const jsonContent = e.target?.result as string;
          const parsedTransactions = savedPlan2Plan(
            JSON.parse(jsonContent)
          ).transactions;
          dispatch(
            importPlanTransactions({
              planId: selectedPlan.id,
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
        className={`bg-gray-500 hidden sm:inline-block ${disableableButtonClass}`}
        onClick={triggerFileDialog}
        disabled={!selectedPlan?.id}
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
