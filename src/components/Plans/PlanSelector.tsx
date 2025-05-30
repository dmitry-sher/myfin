import React, { FC, useEffect } from "react";
import Select, { SingleValue } from "react-select";

import { useAppContext } from "../../context/AppContext";
import { PlanSelectorContext } from "../../context/PlanSelectorContext";
import { OptionType, Plan } from "../../types/entities";
import { ClosePlanSelectorButton } from "../IconButton/ClosePlanSelectorButton";

import { AddPlanButton } from "./Buttons/AddPlanButton";
import { CategoriesEditorButton } from "./Buttons/CategoriesEditorButton";
import { DuplicatePlanButton } from "./Buttons/DuplicatePlanButton";
import { ExportPlanButton } from "./Buttons/ExportPlanButton";
import { ImportPlanButton } from "./Buttons/ImportPlanButton";
import { PrintPlanButton } from "./Buttons/PrintPlanButton";
import { RemovePlanButton } from "./Buttons/RemovePlanButton";
import { RenamePlanButton } from "./Buttons/RenamePlanButton";
import { SetDefaultPlanButton } from "./Buttons/SetDefaultPlanButton";

interface PlanSelectorProps {
  plans: Plan[];
  onSelectPlan: (planId: string) => void;
}

export const PlanSelector: FC<PlanSelectorProps> = ({
  plans,
  onSelectPlan,
}) => {
  const { selectedPlan, isHeaderSticky } = useAppContext();
  const selectedPlanId = selectedPlan?.id ?? "";
  const options: OptionType[] = plans.map((plan) => ({
    value: plan.id,
    label: plan.name,
  }));

  const selectedOption =
    options.find((option) => option.value === selectedPlanId) || null;

  const handleChange = (newSelectedOption: SingleValue<OptionType>): void => {
    onSelectPlan(newSelectedOption ? newSelectedOption.value : "");
  };

  useEffect((): void => {
    if (selectedPlanId) {
      return;
    }

    if (plans && plans.length === 1) {
      onSelectPlan(plans[0].id);
    }

    for (let i = 0; i < plans.length; i++) {
      const plan = plans[i];
      if (plan.isDefault) {
        onSelectPlan(plan.id);
        return;
      }
    }
  }, [plans, onSelectPlan, selectedPlanId]);

  const disableableButtonClass = `text-white py-2 px-4 rounded mr-2 mb-2 sm:mb-0 ${
    selectedPlanId ? "" : "opacity-50"
  }`;

  const headerClass = isHeaderSticky
    ? "sticky top-0 z-10 bg-white border-b shadow-sm"
    : "border-b shadow-sm";

  return (
    <div className={headerClass}>
      <PlanSelectorContext.Provider
        value={{
          plans,
          selectedPlanId,
          selectedPlan,
          onSelectPlan,
          disableableButtonClass,
        }}
      >
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
          <div className="w-full sm:block flex mb-2 sm:mb-0 flex-wrap">
            <AddPlanButton />
            <DuplicatePlanButton />
            <RenamePlanButton />
            <RemovePlanButton />
            <ExportPlanButton />
            <ImportPlanButton />
            <PrintPlanButton />
            <CategoriesEditorButton />
            <SetDefaultPlanButton />
          </div>
          <div className="w-full sm:w-1/12 text-right">
            <ClosePlanSelectorButton size="lg" />
          </div>
        </div>
      </PlanSelectorContext.Provider>
    </div>
  );
};
