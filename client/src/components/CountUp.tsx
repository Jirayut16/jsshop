import CountUp from "react-countup";

export const MyCountUpMoney = ({
  data,
  className,
}: {
  data: number;
  className?: string;
}) => {
  return (
    <div className={className}>
      <CountUp end={data} prefix="฿" decimals={2} />
    </div>
  );
};
export const MyCountUpNumber = ({
  data,
  className,
  suffix,
}: {
  data: number;
  className?: string;
  suffix?: string;
}) => {
  return (
    <div className={className}>
      <CountUp end={data} suffix={suffix} />
    </div>
  );
};
