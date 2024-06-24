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
