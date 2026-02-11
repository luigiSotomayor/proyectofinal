export const parseDate = (date) => {
  if (!date) return null;

  const [day, month, year] = date.split("/");
  return new Date(`${year}-${month}-${day}`);
};