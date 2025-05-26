import { addDays, addMonths, addWeeks } from "date-fns";

export const processMouseClickForDate = (
  e: React.MouseEvent,
  date: Date,
  direction = 1
): Date => {
  const newDate = new Date(date);

  if (e.shiftKey) {
    return addMonths(newDate, direction);
  }

  if (e.metaKey) {
    return addWeeks(newDate, direction);
  }
  return addDays(newDate, direction);
};
