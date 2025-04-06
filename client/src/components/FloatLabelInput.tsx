import { useState } from "react";

const FloatLabelInput = ({
  label,
  type,
  id,
  required,
  name,
}: {
  label: string;
  type: string;
  id: string;
  required: boolean;
  name: string;
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState("");
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);

  const labelClasses = `absolute left-3 bottom-3 transition-all duration-200 pointer-events-none
          ${
            isFocused || value
              ? "-translate-y-5 text-sm text-blue-600 bg-white dark:bg-background px-1"
              : "translate-y-1 text-gray-500"
          }`;

  return (
    <div className="relative mt-6 w-full">
      <input
        type={type}
        id={id}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent peer"
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        value={value}
        required={required}
        name={name}
      />

      <label htmlFor={id} className={labelClasses}>
        {label}
        <span className="text-red-500 ms-1 absolute bottom-1">*</span>
      </label>
    </div>
  );
};
export default FloatLabelInput;
