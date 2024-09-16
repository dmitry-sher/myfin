import React, { FC, useEffect } from "react";
import Select from "react-select";
import { Plan } from "../types/entities";

// Define the props for PlanSelector
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
  // Create options for react-select
  const options = plans.map((plan) => ({
    value: plan.id,
    label: plan.name,
  }));

  // Find the currently selected plan
  const selectedOption =
    options.find((option) => option.value === selectedPlanId) || null;

  // Handle selection change
  const handleChange = (selectedOption: any) => {
    onSelectPlan(selectedOption ? selectedOption.value : null);
  };

  useEffect(() => {
    if (plans && plans.length === 1) onSelectPlan(plans[0].id);
  }, plans);

  return (
    <div className="mb-4">
      <Select
        options={options}
        value={selectedOption}
        onChange={handleChange}
        placeholder="Select a plan..."
        isClearable
      />
    </div>
  );
};

export default PlanSelector;