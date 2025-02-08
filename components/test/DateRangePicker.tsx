import { fr } from "date-fns/locale"
import { DayPicker, type DateRange } from "react-day-picker"
import "react-day-picker/style.css"

interface DateRangePickerProps {
  selected: DateRange | undefined
  onSelect: (range: DateRange | undefined) => void
}

export default function DateRangePicker({ selected, onSelect }: DateRangePickerProps) {
  return (
    <DayPicker
      mode="range"
      min={1}
      selected={selected}
      onSelect={onSelect}
      footer={
        selected?.from
          ? `Sélectionné : ${selected.from.toLocaleDateString()} ${
              selected.to ? `- ${selected.to.toLocaleDateString()}` : ""
            }`
          : "Choisissez une date."
      }
      showOutsideDays
      fixedWeeks
      locale={fr}
    />
  )
}

