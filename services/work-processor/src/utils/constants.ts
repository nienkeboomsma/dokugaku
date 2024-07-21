// TODO: move this to a 'config' package so that web and mokuro can also use it

export const volumePath = '/dokugaku'

export const imageExtensions = [
  '.jpg',
  '.JPG',
  '.jpeg',
  '.JPEG',
  '.png',
  '.PNG',
  '.webp',
  '.WEBP',
]
export const mangaExtensions = [...imageExtensions, '.json', '.JSON']
export const novelTextExtensions = [
  '.html',
  '.HTML',
  '.md',
  '.MD',
  '.txt',
  '.TXT',
]
