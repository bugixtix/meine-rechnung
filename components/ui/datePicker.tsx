"use client"

import * as React from "react"
import { addDays, format } from "date-fns"
// import { CalendarIcon } from "lucide-react"
import { SlCalender as CalendarIcon} from "react-icons/sl";

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function DatePickerWithPresets({label="Pick a date", handler}:{label?:string, handler?:(date:string)=>void}) {
  const [date, setDate] = React.useState<Date>()

  React.useEffect(()=>{
    if(date){
      const dateString:string = date?.toString()
      handler?.(dateString)
    }
  },[date])
  return (
    <Popover>
      <PopoverTrigger asChild className="px-1! py-2! gap-0.5 m-0 rounded-xs h-4">
        <Button
          variant={"outline"}
          className={cn(
            "text-[11px] w-[140px] p-0 justify-end text-right font-normal cursor-pointer",
            !date && "text-muted-foreground"
          )}
        >

          {date ? format(date, "PPP") : <span className="text-[11px] ">{label}</span>}
          <p className="text-2xl text-right">
            <CalendarIcon className="w-[12px]! h-[12px]!" />
          </p>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="flex text-[11px] w-auto flex-col "
      >
        <div className="rounded-[2px] border">
          <Calendar mode="single" selected={date} onSelect={setDate} />
        </div>
      </PopoverContent>
    </Popover>
  )
}
