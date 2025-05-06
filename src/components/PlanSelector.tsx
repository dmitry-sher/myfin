import React, { FC, useEffect } from "react";
import Select, { SingleValue } from "react-select";

import { useAppSelector } from "../store";
import { Plan } from "../types/entities";

import { AddPlanButton } from "./PlanButtons/AddPlanButton";
import { DuplicatePlanButton } from "./PlanButtons/DuplicatePlanButton";
import { ExportPlanButton } from "./PlanButtons/ExportPlanButton";
import { ImportPlanButton } from "./PlanButtons/ImportPlanButton";
import { PlanSelectorContext } from "./PlanButtons/PlanSelectorContext";
import { PrintPlanButton } from "./PlanButtons/PrintPlanButton";
import { RemovePlanButton } from "./PlanButtons/RemovePlanButton";
import { RenamePlanButton } from "./PlanButtons/RenamePlanButton";
import { SetDefaultPlanButton } from "./PlanButtons/SetDefaultPlanButton";

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
  const isHeaderSticky = useAppSelector((state): boolean => state.appSettings.isHeaderSticky);
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

  const selectedPlan = plans.find((p) => p.id === selectedPlanId) || null;

  const headerClass = isHeaderSticky ? "sticky top-0 z-10 bg-white border-b shadow-sm" : "";

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
          <div className="w-full sm:w-fit sm:block flex mb-2 sm:mb-0 flex-wrap">
            <AddPlanButton />
            <DuplicatePlanButton />
            <RenamePlanButton />
            <RemovePlanButton />
            <ExportPlanButton />
            <ImportPlanButton />
            <PrintPlanButton />
            <SetDefaultPlanButton />
          </div>
        </div>
      </PlanSelectorContext.Provider>
    </div>
  );
};
