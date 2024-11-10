import {
  bondSeries,
  bondTypes,
  CapitalisationPeriod,
  fixedBondParameters,
  LengthUnit,
  type BondKind,
} from "@/drizzle/schema";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import type { Client } from "pg";

const bondTypesData = await import("./bond_types.json").then(
  (module) => module.default,
);
const bondSeriesData = await import("./bond_series.json").then(
  (module) => module.default,
);

const fixedBondParametersData = await import(
  "./fixed_bond_parameters.json"
).then((module) => module.default);

export const populateBonds = async (
  db: NodePgDatabase<Record<string, never>> & {
    $client: Client;
  },
) => {
  console.log("Populating bond types");
  await db.insert(bondTypes).values(
    bondTypesData.map((item) => ({
      id: item.id,
      name: item.name,
      type: item.type as BondKind,
    })),
  );
  console.log("Populating bond series");
  await db.insert(bondSeries).values(
    bondSeriesData.map((data) => ({
      id: data.id,
      serialNumber: data.serial_number,
      issueDate: new Date(data.issue_date),
      initialValue: data.initial_value,
      costOfWithdrawal: data.cost_of_withdrawal,
    })),
  );

  console.log("Populating fixed bond parameters");
  await db.insert(fixedBondParameters).values(
    fixedBondParametersData.map((data) => ({
      id: data.id,
      bondSeriesId: data.bond_series_id,
      interestRate: data.interest_rate,
      capitalisationPeriod: data.capitalisation_period as CapitalisationPeriod,
      length: data.length,
      lengthUnit: data.length_unit as LengthUnit,
    })),
  );
};
