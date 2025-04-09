'use client'
import { useRouter, useSearchParams } from "next/navigation";
import { startOfWeek, format, parseISO } from "date-fns";
import { useState } from "react";
import { CalendarIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { pl } from "date-fns/locale"

export default function WeekPicker() {
  const router = useRouter();
  const params = useSearchParams();
  const [date, setDate] = useState<Date | undefined>(
    params.get('week') ? parseISO(params.get('week')!) : new Date()
  );

  const selectDate = (selectedDate: Date | undefined) => {
    if (!selectedDate) return;
    setDate(selectedDate);
    router.push(`/?week=${format(selectedDate, "yyyy-MM-dd")}`);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="flex items-center">
          <CalendarIcon className="h-4 w-4  sm:mr-2 text-blue-500" />
          <span className="hidden sm:inline">
            {date
              ? `Tydzień od ${format(startOfWeek(date, { weekStartsOn: 1 }), "PPP", { locale: pl })}`
              : "Wybierz tydzień"}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={date} onSelect={selectDate} initialFocus weekStartsOn={1} locale={pl}/>
      </PopoverContent>
    </Popover>
  );
}
