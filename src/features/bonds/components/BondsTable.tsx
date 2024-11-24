"use client";

import { DataTable } from "@/components/ui/data-table";
import { currencyFormatter } from "@/lib/currency-format";
import { ColumnDef, Table } from "@tanstack/react-table";

export type BondsTableRow = {
  seriesName: string;
  maturityDate: number;
  nominalValue: number;
  interestAmount: number;
  actualValue: number;
  interestRate: number;
  costOfWithdrawal: number;
  valueAfterCost: number;
};

type NumericKeys<T> = keyof {
  [key in keyof T as T[key] extends number ? key : never]: T[key];
};

type BondsTableProps = {
  rows: BondsTableRow[];
};

const sumColumn = (
  table: Table<BondsTableRow>,
  accessorKey: NumericKeys<BondsTableRow> & string,
) => {
  return table
    .getRowModel()
    .rows.reduce((acc, row) => acc + row.original[accessorKey], 0);
};

export const BondsTable = ({ rows }: BondsTableProps) => {
  const columns = [
    {
      accessorKey: "seriesName",
      header: "Series Name",
    },
    {
      accessorKey: "maturityDate",
      header: "Maturity Date",
      cell: ({ row }) =>
        Intl.DateTimeFormat("pl").format(row.original.maturityDate),
    },
    {
      accessorKey: "nominalValue",
      header: "Nominal Value",
      cell: ({ row }) => currencyFormatter(row.original.nominalValue),
      footer: ({ table }) =>
        currencyFormatter(sumColumn(table, "nominalValue")),
    },
    {
      accessorKey: "interestAmount",
      header: "Interest Amount",
      cell: ({ row }) => currencyFormatter(row.original.interestAmount),
      footer: ({ table }) =>
        currencyFormatter(sumColumn(table, "interestAmount")),
    },
    {
      accessorKey: "actualValue",
      header: "Actual Value",
      cell: ({ row }) => currencyFormatter(row.original.actualValue),
      footer: ({ table }) => currencyFormatter(sumColumn(table, "actualValue")),
    },
    {
      accessorKey: "interestRate",
      header: "Interest Rate",
      cell: ({ row }) => `${row.original.interestRate}%`,
    },
    {
      accessorKey: "costOfWithdrawal",
      header: "Cost of Withdrawal",
      cell: ({ row }) => currencyFormatter(row.original.costOfWithdrawal),
    },
    {
      accessorKey: "valueAfterCost",
      header: "Value After Cost",
      cell: ({ row }) => currencyFormatter(row.original.valueAfterCost),
      footer: ({ table }) =>
        currencyFormatter(sumColumn(table, "valueAfterCost")),
    },
  ] satisfies ColumnDef<BondsTableRow>[];

  return <DataTable columns={columns} data={rows} />;
};
