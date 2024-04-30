// TODO: move this to a 'config' package so that web and mokuro can also use it

export const volumePath = '/dokugaku'

export const mokuroExtensions = ['.png', '.jpg', '.jpeg']
export const mangaExtensions = [...mokuroExtensions, '.json']
export const imageExtensions = [...mokuroExtensions, '.webp']
export const novelTextExtensions = ['.html', '.md', '.txt']

// times in milliseconds
export const mokuroInitTime = 30 * 1000
export const mokuroTimePerPage = 25 * 1000
export const ichiranTimePerPage = 2.5 * 1000 // 2.8-3 for Shinchan
export const ichiranTimePer100Char = 1.1 * 1000
export const webpConversionPerImage = 0.25 * 1000
