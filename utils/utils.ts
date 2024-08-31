export const groupBy = <T extends object>(data: T[], key: keyof T) =>
  Object.groupBy(data, (item) => `${item[key]}`)
