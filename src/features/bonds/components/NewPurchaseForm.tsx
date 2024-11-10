"use client";

import { FormField } from "@/components/form-field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Form from "next/form";
import { useState } from "react";
import { getSeriesList } from "../actions/get-series-list";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/submit-button";
import { DatePicker } from "@/components/date-picker";
import { createBondPurchase } from "../actions/createBondPurchase";
import { toast } from "sonner";
import { BondsTranslation } from "../locale/get-bonds-translation";

export const NewPurchaseForm = ({
  availableTypes,
  translation: {
    bondType,
    purchaseDate,
    amount,
    seriesName,
    purchaseForm: {
      selectBondType,
      selectSeries,
      purchaseDatePlaceholder,
      submit,
      successMessage,
      errorMessage,
      unknownErrorMessage,
      loadingText,
    },
  },
}: {
  availableTypes: { name: string; id: number }[];
  translation: BondsTranslation;
}) => {
  const [seriesList, setSeriesList] = useState<
    { serialNumber: string; id: number }[] | null
  >(null);
  return (
    <Form
      action={async (formData) => {
        const bondSeriesId = formData.get("seriesId");
        const amount = formData.get("amount");
        const date = formData.get("date");
        try {
          await createBondPurchase({
            bondSeriesId: Number(bondSeriesId),
            amount: Number(amount),
            date: new Date(date as string),
          });
          toast.success(successMessage);
        } catch (error) {
          toast.error(errorMessage, {
            description:
              error instanceof Error ? error.message : unknownErrorMessage,
          });
        }
      }}
      className="flex flex-col gap-4 p-4"
    >
      <FormField>
        <Label htmlFor="bondTypeId">{bondType}</Label>
        <Select
          name="bondTypeId"
          required
          onValueChange={async (bondTypeId) => {
            const series = await getSeriesList(Number(bondTypeId));
            setSeriesList(series);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder={selectBondType} />
          </SelectTrigger>
          <SelectContent>
            {availableTypes.map((type) => (
              <SelectItem key={type.id} value={type.id.toString()}>
                {type.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormField>

      <FormField>
        <Label htmlFor="seriesId">{seriesName}</Label>
        <Select required disabled={!seriesList} name="seriesId">
          <SelectTrigger>
            <SelectValue placeholder={selectSeries} />
          </SelectTrigger>
          <SelectContent>
            {seriesList?.map((series) => (
              <SelectItem key={series.id} value={series.id.toString()}>
                {series.serialNumber}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormField>
      <FormField>
        <Label htmlFor="amount">{amount}</Label>
        <Input
          disabled={!seriesList}
          required
          type="number"
          name="amount"
          id="amount"
          min={1}
        />
      </FormField>
      <FormField>
        <Label htmlFor="date">{purchaseDate}</Label>
        <DatePicker
          disabled={!seriesList}
          name="date"
          required
          id="date"
          placeholder={purchaseDatePlaceholder}
        />
      </FormField>
      <SubmitButton loadingText={loadingText} disabled={!seriesList}>
        {submit}
      </SubmitButton>
    </Form>
  );
};
