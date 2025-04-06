import React from "react";

const CustomRadio = ({
  htmlFor,
  name,
  index,
  id,
  value,
  onChange,
  checkedValue,
  label,
}: {
  htmlFor: string;
  name: string;
  index: number;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checkedValue: boolean;
  label: string;
}) => {
  return (
    <label
      htmlFor={htmlFor}
      key={index}
      className="flex items-center space-x-2 cursor-pointer text-gray-700 group"
    >
      <input
        type="radio"
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        checked={checkedValue}
        className="hidden"
      />

      <div
        className={`w-4 h-4 lg:w-6 lg:h-6 flex items-center justify-center rounded-full border-2
                    ${
                      checkedValue
                        ? "bg-red-500 border-red-500"
                        : "bg-white border-gray-400"
                    }
                    transition-all duration-200 cursor-pointer`}
      >
        {checkedValue && (
          <span className="text-white text-xs lg:text-lg">✓</span>
        )}
      </div>
      <span
        className={
          checkedValue
            ? "text-red-500 font-semibold"
            : "text-gray-700 dark:text-white dark:hover:text-white font-light hover:text-black hover:font-semibold transition-all duration-300 ease-in-out"
        }
      >
        {label}
      </span>
    </label>
  );
};
export default CustomRadio;

export const CustomRadioBox = ({
  htmlFor,
  name,
  index,
  id,
  value,
  onChange,
  checkedValue,
  label,
}: {
  htmlFor: string;
  name: string;
  index: number;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checkedValue: boolean;
  label: string | React.ReactNode;
}) => {
  return (
    <label
      htmlFor={htmlFor}
      key={index}
      className="flex items-center space-x-2 cursor-pointer text-gray-700 group"
    >
      <input
        type="radio"
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        checked={checkedValue}
        className="hidden"
      />

      <span
        className={
          checkedValue
            ? "text-black dark:text-text-dark font-semibold bg-white dark:bg-soft-dark rounded-md border  md:border-3 border-red-500 px-2 md:px-4 py-1"
            : "text-black dark:text-text-dark font-light bg-white dark:bg-soft-dark border border-gray-400 rounded-md px-2 md:px-4 py-1 hover:font-semibold transition-all duration-300 ease-in-out"
        }
      >
        {label}
      </span>
    </label>
  );
};
