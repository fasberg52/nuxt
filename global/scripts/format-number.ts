export const formatSalartyPersian = (value: number) => {
  return new Intl.NumberFormat("fa-IR").format(value);
};
