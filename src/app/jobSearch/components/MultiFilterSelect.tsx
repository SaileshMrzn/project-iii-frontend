"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Filter } from "lucide-react";

interface FilterOption {
  value: string;
  label: string;
}

interface MultiFilterSelectProps {
  options: FilterOption[];
  placeholder?: string;
  onChange?: (selectedFilters: string[]) => void;
  setSelectedFilters: React.Dispatch<React.SetStateAction<string[]>>;
  selectedFilters: string[];
}

export function MultiFilterSelect({
  options,
  placeholder = "Filter options...",
  onChange,
  setSelectedFilters,
  selectedFilters,
}: MultiFilterSelectProps) {
  // const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  const handleSelect = (value: string, checked: boolean) => {
    let newValues: string[];
    if (checked) {
      newValues = [...selectedFilters, value];
    } else {
      newValues = selectedFilters.filter((v) => v !== value);
    }
    setSelectedFilters(newValues);
    onChange?.(newValues);
  };

  const handleRemove = (value: string) => {
    const newValues = selectedFilters.filter((v) => v !== value);
    setSelectedFilters(newValues);
    onChange?.(newValues);
  };

  return (
    <div className="space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-36 justify-between">
            <span>
              {selectedFilters?.length > 0
                ? `${selectedFilters?.length} selected`
                : placeholder}
            </span>
            <Filter className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-36">
          <div className="space-y-2">
            {options.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <Checkbox
                  id={option.value}
                  checked={selectedFilters.includes(option.value)}
                  onCheckedChange={(checked) =>
                    handleSelect(option.value, checked as boolean)
                  }
                />
                <Label htmlFor={option.value}>{option.label}</Label>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
      {/* <div className="flex flex-wrap gap-2">
        {selectedFilters.map((value) => {
          const option = options.find((o) => o.value === value);
          return (
            <Badge
              key={value}
              variant="secondary"
              className="flex items-center gap-1"
            >
              {option?.label}
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0"
                onClick={() => handleRemove(value)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          );
        })}
      </div> */}
    </div>
  );
}
