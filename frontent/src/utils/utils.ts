export const isDefined = <T>(value?: T): value is T => value !== undefined

/**
 * @param price string with template 100 000 zł
 * @description parse string price to number
 */
export const clearPrice = (price: string) => Number(price.split("zł")[0].replace(" ", ""))

export const sortNewestFirst = <T>(items: { timestamp: number }[]): T =>
  items?.sort((a, b) => b.timestamp - a.timestamp) as T
