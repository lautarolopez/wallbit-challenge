import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface RegularSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  id?: string;
  placeholder?: string;
  options: { value: number; label: string }[];
}

export const SelectInput: React.FC<RegularSelectProps> = ({
  id,
  placeholder = "Elegí una opción...",
  onChange,
  value,
  onFocus,
  onBlur,
  options,
  ...rest
}) => {
  const [focused, setFocused] = useState(false);
  const selectRef = useRef<HTMLSelectElement>(null);

  const hasContent = value !== undefined && value !== "";

  useEffect(() => {
    if (selectRef.current) {
      selectRef.current.value = value as string;
    }
  }, [value]);

  const handleFocus = (e: React.FocusEvent<HTMLSelectElement>) => {
    setFocused(true);
    if (onFocus) {
      onFocus(e);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLSelectElement>) => {
    setFocused(false);
    if (onBlur) {
      onBlur(e);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(e);
    }
  };

  const selectId =
    id || `regular-select-${Math.random().toString(36).substring(2, 9)}`;

  return (
    <div className="relative flex-1">
      <select
        ref={selectRef}
        id={selectId}
        className={`block h-16 w-full appearance-none rounded-lg border border-stone-300 px-2 pb-2 pt-6 text-lg font-semibold focus:outline-none focus:ring focus:ring-wallbitBlue dark:bg-containerBackground ${
          !hasContent ? "text-transparent" : ""
        }`}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        value={value}
        aria-label={placeholder}
        {...rest}
      >
        <option value="" disabled hidden>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <label
        htmlFor={selectId}
        className={`pointer-events-none absolute left-2 transition-all duration-200 ${
          focused || hasContent
            ? "top-1 text-sm font-normal text-stone-600"
            : "top-1/2 -translate-y-1/2 text-lg font-semibold text-stone-400"
        } dark:text-stone-400`}
      >
        {placeholder}
      </label>
      <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-6 w-6 -translate-y-1/2 transform text-stone-400" />
    </div>
  );
};
