import type { Currency } from "@/drizzle/currency";

export type MonthlyIncome = {
  id: number;
  date: Date;
  source: string;
  grossSalary: number;
  incomeTax: number;
  healthInsurance: number;
  socialSecurity: number;
  otherDeductions: number;
  currency: Currency;
};
