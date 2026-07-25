"use client";

import Form from "next/form"
import { addIncome } from "../../actions/add-income";
import { Currency, currency } from "@/drizzle/currency";
import { toast } from "sonner";
import { FormField } from "@/components/form-field";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/date-picker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const AddIncomeForm = ({ incomeSources, translation }: { incomeSources: { id: number; name: string }[]; translation: { addIcomeForm: { successMessage: string; errorMessage: string; unknownErrorMessage: string } } }) => {
    return (
        <Form action={async (formData) => {
            const date = formData.get("date")
            const source = formData.get("source")
            const grossSalary = formData.get("grossSalary")
            const incomeTax = formData.get("incomeTax")
            const healthInsurance = formData.get("healthInsurance")
            const socialSecurity = formData.get("socialSecurity")
            const otherDeductions = formData.get("otherDeductions")
            const currency = formData.get("currency")
            try {
                await addIncome({
                    date: new Date(date as string),
                    sourceId: Number(source),
                    grossSalary: Number(grossSalary),
                    incomeTax: Number(incomeTax),
                    healthInsurance: Number(healthInsurance),
                    socialSecurity: Number(socialSecurity),
                    otherDeductions: Number(otherDeductions),
                    currency: currency as Currency,
                })
                toast.success(translation.addIcomeForm.successMessage)
            } catch (error) {
                toast.error(translation.addIcomeForm.errorMessage, {
                    description: error instanceof Error ? error.message : translation.addIcomeForm.unknownErrorMessage,
                })
            }


        }}>

            <FormField>
                <Label htmlFor="date">Date</Label>
                <DatePicker placeholder="Select a date" id="name" name="date" required />
            </FormField>
            <FormField>
                <Label htmlFor="source">Income Source</Label>
                <Select name="source" required>
                    <SelectTrigger>
                        <SelectValue placeholder="Select an income source" />
                    </SelectTrigger>
                    <SelectContent>
                        {incomeSources.map((source) => (
                            <SelectItem key={source.id} value={source.id.toString()}>
                                {source.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </FormField>
            <FormField>
                <Label htmlFor="grossSalary">Gross Salary</Label>
                <Input required type="number" name="grossSalary" min="0" step="0.01" />
            </FormField>
            <FormField>
                <Label htmlFor="incomeTax">Income Tax</Label>
                <Input required type="number" name="incomeTax" min="0" step="0.01" />
            </FormField>
            <FormField>
                <Label htmlFor="healthInsurance">Health Insurance</Label>
                <Input required type="number" name="healthInsurance" min="0" step="0.01" />
            </FormField>
            <FormField>
                <Label htmlFor="socialSecurity">Social Security</Label>
                <Input required type="number" name="socialSecurity" min="0" step="0.01" />
            </FormField>
            <FormField>
                <Label htmlFor="otherDeductions">Other Deductions</Label>
                <Input required type="number" name="otherDeductions" min="0" step="0.01" />
            </FormField>
            <FormField>
                <Label htmlFor="currency">Currency</Label>
                <Select name="currency" required>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a currency" />
                    </SelectTrigger>
                    <SelectContent>
                        {Object.values(currency.enumValues).map((currency) => (
                            <SelectItem key={currency} value={currency}>
                                {currency}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </FormField>
            <button type="submit">Add Income</button>
        </Form>
    )
}