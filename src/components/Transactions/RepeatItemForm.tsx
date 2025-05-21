import React, { ChangeEvent, FC, FormEvent, useState } from "react";

import { closeModal } from "../../slices/modalSlice";
import { useAppDispatch } from "../../store";
import { Transaction } from "../../types/entities";
import { ModalCode, RepeatType } from "../../utils/const";
import { printDate } from "../../utils/printDate";

interface RepeatItemFormProps {
  transaction?: Transaction;
  onSubmit: (
    transaction: Transaction,
    period: RepeatType,
    repeats: number
  ) => void;
}

const DEFAULT_WEEKLY_REPEATS = 4;
const DEFAULT_MONTHLY_REPEATS = 1;

export const RepeatItemForm: FC<RepeatItemFormProps> = ({ transaction, onSubmit }) => {
  const [repeatPeriod, setRepeatPeriod] = useState<RepeatType>(
    RepeatType.weekly
  );
  const [repeats, setRepeats] = useState<number>(4);
  const dispatch = useAppDispatch();

  if (!transaction) return null;

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();

    onSubmit(transaction, repeatPeriod, repeats);
    dispatch(closeModal(ModalCode.repeatItem));
  };

  const handlePeriodChange = (repeatType: RepeatType): void => {
    setRepeatPeriod(repeatType);
    if (
      repeatType === RepeatType.monthly &&
      repeats === DEFAULT_WEEKLY_REPEATS
    ) {
      setRepeats(DEFAULT_MONTHLY_REPEATS);
    }
    if (
      repeatType === RepeatType.weekly &&
      repeats === DEFAULT_MONTHLY_REPEATS
    ) {
      setRepeats(DEFAULT_WEEKLY_REPEATS);
    }
  };

  const handleRepeatsChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setRepeats(Number(e.target.value));
  };

  const weeklyProps: Record<string, string> = {};
  const monthlyProps: Record<string, string> = {};
  if (repeatPeriod === RepeatType.monthly) {
    monthlyProps.checked = "checked";
  }
  if (repeatPeriod === RepeatType.weekly) {
    weeklyProps.checked = "checked";
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <div>
        Item: {transaction.amount} for {transaction.description} at{" "}
        {printDate(transaction)}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          How often?
        </label>
        <input
          type="radio"
          name="period"
          value={RepeatType.weekly}
          id="period_weekly"
          onChange={(): void => handlePeriodChange(RepeatType.weekly)}
          {...weeklyProps}
        />
        <label htmlFor="period_weekly">Weekly</label>{" "}
        <input
          type="radio"
          name="period"
          value={RepeatType.monthly}
          id="period_monthly"
          onChange={(): void => handlePeriodChange(RepeatType.monthly)}
          {...monthlyProps}
        />
        <label htmlFor="period_monthly">Monthly</label>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Repeats
        </label>
        <input type="number" value={repeats} onChange={handleRepeatsChange} />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Repeat
      </button>
    </form>
  );
};
