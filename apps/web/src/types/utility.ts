export function isNumber(param: unknown): param is number {
  return typeof param === 'number'
}

export function isUndefined(param: unknown): param is undefined {
  return typeof param === 'undefined'
}
