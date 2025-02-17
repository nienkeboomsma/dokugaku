export function isNumber(param: any): param is number {
  return typeof param === 'number'
}

export function isUndefined(param: any): param is undefined {
  return typeof param === 'undefined'
}

export type ArrayToStringLiteral<T extends readonly string[]> = T[number]
