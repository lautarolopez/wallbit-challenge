import { useState } from "react";

interface RegularInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
}

export const RegularInput: React.FC<RegularInputProps> = ({
  id,
  placeholder = "Escribir...",
  onChange,
  value,
  onFocus,
  onBlur,
  ...rest
}) => {
  const [focused, setFocused] = useState(false);

  const hasContent = value !== undefined && value !== "";

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(true);
    if (onFocus) {
      onFocus(e);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(false);
    if (onBlur) {
      onBlur(e);
    }
  };

  const inputId =
    id || `regular-input-${Math.random().toString(36).substring(2, 9)}`;

  return (
    <div className="relative flex-1">
      <input
        type="text"
        id={inputId}
        placeholder=""
        className="block h-16 w-full rounded-lg border border-stone-300 px-2 pb-2 pt-6 text-lg font-semibold focus:outline-none focus:ring focus:ring-wallbitBlue dark:bg-containerBackground"
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={value}
        onChange={onChange}
        {...rest}
      />
      <label
        htmlFor={inputId}
        className={`absolute left-2 cursor-text transition-all duration-200 dark:text-stone-400 ${
          focused || hasContent
            ? "top-1 text-sm font-normal"
            : "top-1/2 -translate-y-1/2 transform text-lg font-semibold"
        }`}
      >
        {placeholder}
      </label>
    </div>
  );
};
