const CustomCheckbox = ({
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
        type="checkbox"
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        checked={checkedValue}
        className="hidden"
      />

      <div
        className={`w-4 h-4 lg:w-6 lg:h-6 flex items-center justify-center rounded border-2
              ${
                checkedValue
                  ? "bg-red-500 border-red-500"
                  : "bg-white border-gray-400"
              }
              transition-all duration-200 cursor-pointer`}
      >
        {checkedValue && (
          <span className="text-white text-sm lg:text-lg">✓</span>
        )}
      </div>
      <span
        className={
          checkedValue
            ? "text-xs lg:text-base text-red-500 font-semibold"
            : "text-xs lg:text-base text-gray-700 dark:text-text-dark font-light hover:text-black dark:hover:text-white hover:font-semibold transition-all duration-300 ease-in-out"
        }
      >
        {label}
      </span>
    </label>
  );
};
export default CustomCheckbox;

export const CustomCheckboxBox = ({
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
        type="checkbox"
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
            ? "text-white font-light bg-main dark:bg-accent-dark rounded-md border-2 border-main dark:border-secondary-dark px-2 lg:px-4 py-1 text-sm lg:text-base"
            : "text-black font-light bg-white dark:bg-background-dark dark:text-white border-2 border-main dark:border-gray-400 rounded-md px-2 lg:px-4 py-1 hover:font-semibold transition-all duration-300 ease-in-out text-sm lg:text-base"
        }
      >
        {label}
      </span>
    </label>
  );
};
