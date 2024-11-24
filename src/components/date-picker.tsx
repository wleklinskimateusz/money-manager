"use client";

import { cn } from "@/lib/style-utils";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import { Calendar } from "./ui/calendar";

export const DatePicker = ({
  name,
  required,
  id,
  placeholder,
  defaultValue,
  disabled,
}: {
  name: string;
  required: boolean;
  id: string;
  placeholder: string;
  defaultValue?: Date;
  disabled?: boolean;
}) => {
  const [date, setDate] = useState<Date | undefined>(
    defaultValue ? new Date(defaultValue) : new Date(),
  );
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            disabled={disabled}
            className={cn(
              "w-[280px] justify-start text-left font-normal",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>{placeholder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
            disabled={disabled}
          />
        </PopoverContent>
      </Popover>
      <input
        type="hidden"
        name={name}
        value={date?.toISOString()}
        required={required}
        id={id}
      />
    </>
  );
};
