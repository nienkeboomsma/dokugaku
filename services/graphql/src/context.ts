import Author from './sources/Author.js'
import Series from './sources/Series.js'
import Word from './sources/Word.js'
import Work from './sources/Work.js'

export type GQL_Context = {
  dataSources: {
    author: Author
    series: Series
    word: Word
    work: Work
  }
}

export async function createContext(): Promise<GQL_Context> {
  return {
    dataSources: {
      author: new Author(),
      series: new Series(),
      word: new Word(),
      work: new Work(),
    },
  }
}
