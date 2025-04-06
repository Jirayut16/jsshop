export const ValidateTextType = ({
  value,
  text,
}: {
  value: string;
  text: string;
}) => {
  return (
    <div className="mt-1">
      {value !== "" && (
        <span className="text-green-500">Product {text} is valid.</span>
      )}
      {value === "" && (
        <span className="text-red-500">Please enter a product {text}.</span>
      )}
    </div>
  );
};

export const ValidateNumberType = ({
  value,
  text,
}: {
  value: number;
  text: string;
}) => {
  return (
    <div className="mt-1">
      {value > 0 && (
        <span className="text-green-500">Product {text} is valid.</span>
      )}
      {value <= 0 && (
        <span className="text-red-500">Please enter a product {text}.</span>
      )}
    </div>
  );
};
export const ValidateNumberTypeForPercentage = ({
  value,
}: {
  value: number;
}) => {
  return (
    <div className="mt-1">
      {value > 0 && value <= 100 ? (
        <span className="text-green-500">Discount price is valid.</span>
      ) : (
        ""
      )}
      {value <= 0 || value >= 100 ? (
        <span className="text-red-500">
          Please enter discount percent (1-100 % only).
        </span>
      ) : (
        ""
      )}
    </div>
  );
};

export const ValidateArrayType = ({
  value,
  text,
}: {
  value: number;
  text: string;
}) => {
  return (
    <div className="mt-1">
      {value === 0 && (
        <span className="text-red-500">Please select a product {text}.</span>
      )}
    </div>
  );
};

export const ValidateRadioType = ({
  value,
  text,
}: {
  value: string;
  text: string;
}) => {
  return (
    <div className="mt-1">
      {value === "" && (
        <span className="text-red-500">Please select a product {text}.</span>
      )}
    </div>
  );
};
