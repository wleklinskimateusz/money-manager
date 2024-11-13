"use client";

import { DataTable } from "@/components/ui/data-table";
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
    },
    {
      accessorKey: "nominalValue",
      header: "Nominal Value",
      footer: ({ table }) => sumColumn(table, "nominalValue"),
    },
    {
      accessorKey: "interestAmount",
      header: "Interest Amount",
      footer: ({ table }) => sumColumn(table, "interestAmount"),
    },
    {
      accessorKey: "actualValue",
      header: "Actual Value",
      footer: ({ table }) => sumColumn(table, "actualValue"),
    },
    {
      accessorKey: "interestRate",
      header: "Interest Rate",
    },
    {
      accessorKey: "costOfWithdrawal",
      header: "Cost of Withdrawal",
    },
    {
      accessorKey: "valueAfterCost",
      header: "Value After Cost",
      footer: ({ table }) => sumColumn(table, "valueAfterCost"),
    },
  ] satisfies ColumnDef<BondsTableRow>[];

  return <DataTable columns={columns} data={rows} />;
};
