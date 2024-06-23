// TODO: move this to a 'config' package so that web and mokuro can also use it

export const volumePath = '/dokugaku'

export const mokuroExtensions = [
  '.jpg',
  '.JPG',
  '.jpeg',
  '.JPEG',
  '.png',
  '.PNG',
]
export const mangaExtensions = [...mokuroExtensions, '.json', '.JSON']
export const imageExtensions = [...mokuroExtensions, '.webp', '.WEBP']
export const novelTextExtensions = [
  '.html',
  '.HTML',
  '.md',
  '.MD',
  '.txt',
  '.TXT',
]

// times in milliseconds
export const mokuroInitTime = 30 * 1000
export const mokuroTimePerPage = 25 * 1000
export const ichiranTimePerPage = 2.5 * 1000
export const ichiranTimePer100Char = 1.1 * 1000
export const webpConversionPerImage = 0.25 * 1000
