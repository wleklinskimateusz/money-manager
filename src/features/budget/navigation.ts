import { Wallet, LineChart } from "lucide-react";

export const budgetNavigation = {
  overview: {
    path: "/budget",
    icon: Wallet,
  },
  incomes: {
    path: "/budget/incomes",
    icon: LineChart,
  },
} as const;
