"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { MonthlyIncome } from "../../types";

type IncomesListProps = {
  translation: {
    noData: string;
    table: {
      month: string;
      source: string;
      gross: string;
      net: string;
      tax: string;
      healthInsurance: string;
      socialSecurity: string;
      other: string;
    };
  };
  incomes: MonthlyIncome[];
};

export function IncomesList({ translation, incomes }: IncomesListProps) {
  if (!incomes?.length) {
    return <div className="text-center">{translation.noData}</div>;
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat(undefined, { month: "long" }).format(date);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{translation.table.month}</TableHead>
            <TableHead>{translation.table.source}</TableHead>
            <TableHead className="text-right">
              {translation.table.gross}
            </TableHead>
            <TableHead className="text-right">
              {translation.table.net}
            </TableHead>
            <TableHead className="text-right">
              {translation.table.tax}
            </TableHead>
            <TableHead className="text-right">
              {translation.table.healthInsurance}
            </TableHead>
            <TableHead className="text-right">
              {translation.table.socialSecurity}
            </TableHead>
            <TableHead className="text-right">
              {translation.table.other}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {incomes.map((income: MonthlyIncome) => (
            <TableRow key={income.id}>
              <TableCell>{formatDate(income.date)}</TableCell>
              <TableCell>{income.source}</TableCell>
              <TableCell className="text-right">{income.grossSalary}</TableCell>
              <TableCell className="text-right">{income.netSalary}</TableCell>
              <TableCell className="text-right">{income.incomeTax}</TableCell>
              <TableCell className="text-right">
                {income.healthInsurance}
              </TableCell>
              <TableCell className="text-right">
                {income.socialSecurity}
              </TableCell>
              <TableCell className="text-right">
                {income.otherDeductions}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
