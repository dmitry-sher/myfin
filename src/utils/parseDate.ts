export const parseDate = (dateStr: string): Date => {
  const [day, month] = dateStr.split("/").map(Number);
  return new Date(new Date().getFullYear(), month - 1, day);
};
