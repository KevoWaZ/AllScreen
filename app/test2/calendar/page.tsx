"use client"
import "react-day-picker/style.css"
import { useState } from "react"
import DateRangePicker from "@/components/test/DateRangePicker"
import type { DateRange } from "react-day-picker"

export default function Page() {
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>(undefined)

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <DateRangePicker selected={selectedRange} onSelect={setSelectedRange} />
      {selectedRange && (
        <div className="text-center">
          <h2 className="text-lg font-semibold">Dates sélectionnées :</h2>
          <p>
            Du : {selectedRange.from?.toLocaleDateString("fr-FR")}
            {selectedRange.to && ` au ${selectedRange.to.toLocaleDateString("fr-FR")}`}
          </p>
        </div>
      )}
    </div>
  )
}

