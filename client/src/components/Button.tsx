export const ButtonPrimary = ({
  type,
  children,
}: {
  type: "submit" | "reset" | "button";
  children: React.ReactNode;
}) => (
  <button
    type={type}
    className="mt-4 bg-red-500 shadow-lg border-2 border-red-800 text-white w-full rounded-md py-2  text-xl font-semibold cursor-pointer hover:bg-red-600 transition duration-300 ease-in-out"
  >
    {children}
  </button>
);

export const ButtonLoading = ({
  type,
  children,
}: {
  type: "submit" | "reset" | "button";
  children: React.ReactNode;
}) => (
  <button
    type={type}
    disabled
    className="mt-4 bg-red-200 text-white w-full rounded-md py-2  text-xl font-semibold cursor-disabled"
  >
    {children}
  </button>
);

export const ButtonSecondary = ({
  type,
  children,
}: {
  type: "submit" | "reset" | "button";
  children: React.ReactNode;
}) => (
  <button
    type={type}
    className="mt-4 bg-green-500 shadow-lg border-2 border-green-800 text-white w-full rounded-md py-2  text-xl font-semibold cursor-pointer hover:bg-green-600 transition duration-300 ease-in-out"
  >
    {children}
  </button>
);

export const ButtonLoadingSecondary = ({
  type,
  children,
}: {
  type: "submit" | "reset" | "button";
  children: React.ReactNode;
}) => (
  <button
    type={type}
    disabled
    className="mt-4 bg-green-200 shadow-lg text-white w-full rounded-md py-2  text-xl font-semibold cursor-disabled"
  >
    {children}
  </button>
);
