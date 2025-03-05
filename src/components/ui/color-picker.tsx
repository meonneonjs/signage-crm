import * as React from "react"
import { HexColorPicker } from "react-colorful"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

interface ColorPickerProps {
  defaultValue?: string
  onChange?: (color: string) => void
}

export function ColorPicker({ defaultValue = "#000000", onChange }: ColorPickerProps) {
  const [color, setColor] = React.useState(defaultValue)

  const handleColorChange = (newColor: string) => {
    setColor(newColor)
    onChange?.(newColor)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-[80px] h-[35px] p-0"
          style={{ backgroundColor: color }}
        >
          <span className="sr-only">Pick a color</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-3">
        <HexColorPicker color={color} onChange={handleColorChange} />
      </PopoverContent>
    </Popover>
  )
} 