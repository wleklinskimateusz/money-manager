import type { Bond } from "../drizzle/get-user-bonds";

const addMonths = (date: Date, months: number) => {
  const newDate = new Date(date);
  newDate.setMonth(newDate.getMonth() + months);
  return newDate;
};

const addYears = (date: Date, years: number) => {
  const newDate = new Date(date);
  newDate.setFullYear(newDate.getFullYear() + years);
  return newDate;
};

export const calculateBonds = async (bonds: Bond[]) => {
  return bonds.map((bond) => {
    const interestAmount = bond.amount * bond.interestRate;
    const costOfWithdrawal = Math.min(bond.costOfWithdrawal, interestAmount);
    return {
      seriesName: bond.seriesName,
      maturityDate:
        bond.lengthUnit === "months"
          ? addMonths(new Date(bond.purchaseDate), bond.length).getTime()
          : addYears(new Date(bond.purchaseDate), bond.length).getTime(),
      nominalValue: bond.amount,
      interestAmount,
      actualValue: bond.amount,
      interestRate: bond.interestRate,
      costOfWithdrawal,
      valueAfterCost: bond.amount - costOfWithdrawal,
    };
  });
};
