"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type Status = {
  value: string
  label: string
}


const statuses: Status[] = [
  {
    value: "backlog",
    label: "Backlog",
  },
  {
    value: "todo",
    label: "Todo",
  },
  {
    value: "in progress",
    label: "In Progress",
  },
  {
    value: "done",
    label: "Done",
  },
  {
    value: "canceled",
    label: "Canceled",
  },
]

type comboboxProps = {
  placeholder?:string,
  className?:string,
  handler?:(value:string)=>void,
  values:{label:string, value:string}[]
}

export function ComboboxPopover({placeholder="Select", className, handler, values}:comboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [selectedStatus, setSelectedStatus] = React.useState<Status | null>(
    null
  )
  // React.useEffect(() => {
  //   const val:Status|null = selectedStatus
  //   if(selectedStatus !== null){
  //   }
  // }, [selectedStatus])
  
  return (
    <div className={`flex items-center space-x-1`}>
      
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild className="p-0! gap-0! h-[26px] rounded-xs w-[auto]">
          <Button variant="outline" className={`w-[150px] justify-center cursor-pointer text-[11px] ${className}`}>
            {selectedStatus ? <>{selectedStatus.label}</> : <> {placeholder}</>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="right" align="start">
          <Command>
            <CommandInput placeholder="Change status..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {values.map((status) => (
                  <CommandItem
                    key={status.value}
                    value={status.value}
                    onSelect={(value) => {
                      setSelectedStatus(
                        values.find((priority) => priority.value === value) ||
                          null
                      )
                      setOpen(false)
                      handler?.(status.value)
                    }}
                  >
                    {status.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
