"use client"

import * as React from "react"
import { addDays, format } from "date-fns"
import { CalendarIcon } from "lucide-react"

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
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal cursor-pointer",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {date ? format(date, "PPP") : <span className="text-[11px]">{label}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="flex text-[11px] w-auto flex-col space-y-2 p-2"
      >
        <div className="rounded-md border">
          <Calendar mode="single" selected={date} onSelect={setDate} />
        </div>
      </PopoverContent>
    </Popover>
  )
}
