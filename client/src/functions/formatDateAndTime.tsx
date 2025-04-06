export function formatDateTime(isoString: string): string {
  const date = new Date(isoString);

  //  formatter สำหรับวัน/เดือน/ปี
  const dateFormatter = new Intl.DateTimeFormat("th", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  // formatter สำหรับเวลา
  const timeFormatter = new Intl.DateTimeFormat("th", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const formattedDate = dateFormatter.format(date);
  const formattedTime = timeFormatter.format(date);

  return `${formattedDate} ${formattedTime}`;
}

export function formatCurrency(amount: number): string {
  const formatter = new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
  });
  return formatter.format(amount);
}
