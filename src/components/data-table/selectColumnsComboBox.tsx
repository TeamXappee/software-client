"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Dot } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function SselectedColumnComboBox({
  selectedOptions,
  onTagsChange,
  options,
}: {
  selectedOptions: string[];
  onTagsChange: any;
  options: string[];
}) {
  const [open, setOpen] = React.useState(false);

  const handleSelect = (value: string) => {
    const newOptions = selectedOptions.includes(value)
      ? selectedOptions.filter((tag) => tag !== value)
      : [...selectedOptions, value];
    onTagsChange(newOptions);
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className=" flex justify-between items-center min h-fit"
        >
          <p className=" justify-start flex flex-wrap gap-2">
            Select Columns...
          </p>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-full p-0 z-[1000]">
        <Command>
          <CommandInput placeholder="Search tags..." />
          <CommandEmpty>No option.</CommandEmpty>
          <CommandGroup className="max-h-[70vh] overflow-y-auto">
            {options&& options.map((option) => (
              <CommandItem
                key={option}
                value={option}
                onSelect={() => {
                  handleSelect(option);
                }}
              >
                <Check
                  className={
                    selectedOptions.includes(option)
                      ? "mr-2 h-4 w-4 opacity-100"
                      : "mr-2 h-4 w-4 opacity-0"
                  }
                />

                {option}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
