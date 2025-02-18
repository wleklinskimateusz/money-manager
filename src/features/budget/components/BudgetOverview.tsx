"use client";

import type { BudgetTranslation } from "../locale/get-budget-translation";

export const BudgetOverview = ({
  translation,
}: {
  translation: BudgetTranslation;
}) => {
  return (
    <div className="grid gap-6">
      <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
        <h2 className="mb-4 text-xl font-semibold">{translation.overview}</h2>
        <p className="text-gray-600 dark:text-gray-300">
          {translation.description}
        </p>
      </div>
    </div>
  );
};
