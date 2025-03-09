import type { Currency } from "@/drizzle/currency";

export type MonthlyIncome = {
  id: number;
  month: Date;
  source: string;
  grossSalary: number;
  incomeTax: number;
  healthInsurance: number;
  socialSecurity: number;
  otherDeductions: number;
  netSalary: number;
  currency: Currency;
};
