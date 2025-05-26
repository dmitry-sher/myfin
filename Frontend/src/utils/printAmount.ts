export const printAmount = (amount: number): string => {
  const sign = amount < 0 ? "" : "+";
  const formattedAmount = amount.toFixed(2);
  return `${sign}${formattedAmount}`;
};
