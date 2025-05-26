import { Plan, SavedPlan } from "../types/entities";

export const plan2SavedPlan = (plan: Plan): SavedPlan => ({
  ...plan,
  transactions: plan.transactions.map((tr) => ({
    ...tr,
    trueDate: tr.trueDate.toISOString(),
  })),
});
