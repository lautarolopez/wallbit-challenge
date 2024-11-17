import { useState, ChangeEvent } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

interface NumericInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  min?: number;
  max?: number;
  step?: number;
}

export const NumericInput: React.FC<NumericInputProps> = ({
  value,
  onChange,
  onKeyDown,
  min = 0,
  max = 100,
  step = 1,
  ...props
}) => {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<string>(
    props.defaultValue ? props.defaultValue.toString() : "",
  );

  const displayValue = isControlled ? value?.toString() || "" : internalValue;

  const handleValueChange = (newValue: string) => {
    let numericValue = parseFloat(newValue);

    if (isNaN(numericValue)) {
      numericValue = min;
    }

    numericValue = Math.max(min, Math.min(max, numericValue));

    if (onChange) {
      const syntheticEvent = {
        ...({} as ChangeEvent<HTMLInputElement>),
        target: {
          ...({} as HTMLInputElement),
          value: numericValue.toString(),
        },
      };
      onChange(syntheticEvent);
    }

    if (!isControlled) {
      setInternalValue(numericValue.toString());
    }
  };

  const increment = () => {
    const numericValue = parseFloat(displayValue) || 0;
    const newValue = Math.min(numericValue + step, max);
    handleValueChange(newValue.toString());
  };

  const decrement = () => {
    const numericValue = parseFloat(displayValue) || 0;
    const newValue = Math.max(numericValue - step, min);
    handleValueChange(newValue.toString());
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (inputValue === "" || /^\d*\.?\d*$/.test(inputValue)) {
      if (onChange) {
        onChange(e);
      }

      if (!isControlled) {
        setInternalValue(inputValue);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      increment();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      decrement();
    }

    if (onKeyDown) {
      onKeyDown(e);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <div className="relative">
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={displayValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="h-16 w-24 rounded-lg border border-stone-300 px-2 py-1 text-lg font-semibold focus:outline-none focus:ring focus:ring-wallbitBlue dark:bg-containerBackground"
          {...props}
        />
        <div className="absolute bottom-0 right-0 top-0 flex flex-col">
          <button
            type="button"
            onClick={increment}
            className="flex-1 rounded-tr-md bg-stone-300 px-2 hover:bg-stone-100 focus:outline-none"
          >
            <ChevronUp className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={decrement}
            className="flex-1 rounded-br-md bg-stone-300 px-2 hover:bg-stone-100 focus:outline-none"
          >
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
