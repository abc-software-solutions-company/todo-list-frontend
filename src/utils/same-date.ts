export const isSameDate = (date1: Date, dateString: string): boolean => {
  const date2: Date = new Date(dateString);

  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
};
