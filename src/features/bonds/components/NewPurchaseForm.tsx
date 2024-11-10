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

export const NewPurchaseForm = ({
  availableTypes,
}: {
  availableTypes: { name: string; id: number }[];
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
        if (!bondSeriesId || !amount || !date) {
          toast.error("Invalid form data");
          return;
        }
        try {
          await createBondPurchase({
            bondSeriesId: Number(bondSeriesId),
            amount: Number(amount),
            date: new Date(date as string),
          });
          toast.success("Bond purchase created");
        } catch (error) {
          toast.error("Failed to create bond purchase", {
            description:
              error instanceof Error ? error.message : "Unknown error",
          });
        }
      }}
      className="flex w-full flex-col gap-4 p-4"
    >
      <FormField>
        <Label htmlFor="bondTypeId">Bond type</Label>
        <Select
          name="bondTypeId"
          required
          onValueChange={async (bondTypeId) => {
            const series = await getSeriesList(Number(bondTypeId));
            setSeriesList(series);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select bond type" />
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
        <Label htmlFor="seriesId">Series</Label>
        <Select required disabled={!seriesList} name="seriesId">
          <SelectTrigger>
            <SelectValue placeholder="Select series" />
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
        <Label htmlFor="amount">Amount</Label>
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
        <Label htmlFor="date">Date</Label>
        <DatePicker
          disabled={!seriesList}
          name="date"
          required
          id="date"
          placeholder="Pick a date"
        />
      </FormField>
      <SubmitButton loadingText="Creating..." disabled={!seriesList}>
        Create
      </SubmitButton>
    </Form>
  );
};
