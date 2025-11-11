"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DateTimePickerProps {
  date?: Date;
  setDate: (date: Date | undefined) => void;
}

export function DateTimePicker({ date, setDate }: DateTimePickerProps) {
  const [selectedDateTime, setSelectedDateTime] = React.useState<
    Date | undefined
  >(date);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      const newDateTime = new Date(selectedDate);
      if (selectedDateTime) {
        newDateTime.setHours(selectedDateTime.getHours());
        newDateTime.setMinutes(selectedDateTime.getMinutes());
      }
      setSelectedDateTime(newDateTime);
      setDate(newDateTime);
    }
  };

  const handleTimeChange = (type: "hour" | "minute", value: string) => {
    if (selectedDateTime) {
      const newDateTime = new Date(selectedDateTime);
      if (type === "hour") {
        newDateTime.setHours(parseInt(value));
      } else {
        newDateTime.setMinutes(parseInt(value));
      }
      setSelectedDateTime(newDateTime);
      setDate(newDateTime);
    } else {
      const newDateTime = new Date();
      if (type === "hour") {
        newDateTime.setHours(parseInt(value));
      } else {
        newDateTime.setMinutes(parseInt(value));
      }
      setSelectedDateTime(newDateTime);
      setDate(newDateTime);
    }
  };

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  if (!mounted) {
    return (
      <div className="flex flex-col sm:flex-row gap-2">
        <Button
          variant={"outline"}
          className="justify-start text-left font-normal flex-1 min-w-0"
          disabled
        >
          <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
          <span>Pick a date</span>
        </Button>
        <Button
          variant={"outline"}
          className="justify-start text-left font-normal sm:w-[140px] w-full shrink-0"
          disabled
        >
          <Clock className="mr-2 h-4 w-4 shrink-0" />
          <span>Pick time</span>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "justify-start text-left font-normal flex-1 min-w-0",
              !selectedDateTime && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
            <span className="truncate">
              {selectedDateTime
                ? format(selectedDateTime, "PPP")
                : "Pick a date"}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={selectedDateTime}
            onSelect={handleDateSelect}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "justify-start text-left font-normal sm:w-[140px] w-full shrink-0",
              !selectedDateTime && "text-muted-foreground"
            )}
          >
            <Clock className="mr-2 h-4 w-4 shrink-0" />
            <span className="truncate">
              {selectedDateTime
                ? format(selectedDateTime, "HH:mm")
                : "Pick time"}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-3">
          <div className="flex gap-2">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Hour</label>
              <Select
                value={selectedDateTime?.getHours().toString()}
                onValueChange={(value) => handleTimeChange("hour", value)}
              >
                <SelectTrigger className="w-[70px]">
                  <SelectValue placeholder="HH" />
                </SelectTrigger>
                <SelectContent>
                  {hours.map((hour) => (
                    <SelectItem key={hour} value={hour.toString()}>
                      {hour.toString().padStart(2, "0")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Minute</label>
              <Select
                value={selectedDateTime?.getMinutes().toString()}
                onValueChange={(value) => handleTimeChange("minute", value)}
              >
                <SelectTrigger className="w-[70px]">
                  <SelectValue placeholder="MM" />
                </SelectTrigger>
                <SelectContent>
                  {minutes.map((minute) => (
                    <SelectItem key={minute} value={minute.toString()}>
                      {minute.toString().padStart(2, "0")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
