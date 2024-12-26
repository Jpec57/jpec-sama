const getComparableString = (str: string | null | undefined) => {
  if (!str) {
    return "";
  }
  return str
    .replaceAll(/\([^)]*\)/g, "")
    .trim()
    .toLowerCase();
};
export default getComparableString;
