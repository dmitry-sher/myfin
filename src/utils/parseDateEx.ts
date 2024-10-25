import { isBefore, parse } from "date-fns";

export function parseDateEx(inputDate: string): Date {
  const today = new Date();
  const currentYear = today.getFullYear();
  const julyFirst = new Date(currentYear, 6, 1);
  const isBeforeJulyFirst = isBefore(today, julyFirst);

  const format1 = /^(\d{2})\/(\d{2})$/;
  const format2 = /^(\d{2})\/(\d{2})\/(\d{2})$/;
  const format3 = /^(\d{2})\/(\d{2})\/(\d{4})$/;

  if (format1.test(inputDate)) {
    // @ts-expect-error for sure it's defined here
    const [, day, month] = inputDate.match(format1);
    if (isBeforeJulyFirst) {
      return new Date(currentYear, month - 1, +day);
    }
    else {
      return month < 7
        ? new Date(currentYear + 1, month - 1, +day)
        : new Date(currentYear, month - 1, +day);
    }
  }

  if (format2.test(inputDate)) {
    return parse(inputDate, "dd/MM/yy", new Date());
  }

  if (format3.test(inputDate)) {
    return parse(inputDate, "dd/MM/yyyy", new Date());
  }

  throw new Error("Invalid date format");
}
