import { GQL_WordCountType } from '@repo/graphql-types'

import sql from '../data/sql.js'
import { WordCountModel } from '../models/WordCountModel.js'

type QueryParams = {
  seriesOrWork: 'series' | 'work'
  seriesOrWorkId: string
  type: GQL_WordCountType
}

class WordCountQuery {
  params: QueryParams

  constructor(params: QueryParams) {
    this.params = params
  }

  getColumnName() {
    switch (this.params.type) {
      case GQL_WordCountType.Hapax:
        return sql`hapax_legomenon_count`
      case GQL_WordCountType.Total:
        return sql`total_word_count`
      case GQL_WordCountType.Unique:
        return sql`unique_word_count`
      default:
        return ''
    }
  }

  getQuery() {
    return sql<WordCountModel[]>`
      SELECT 
        ${this.getColumnName()} AS count
      FROM ${sql(this.params.seriesOrWork)}
      WHERE 
        ${sql(this.params.seriesOrWork + '.id')} = ${this.params.seriesOrWorkId};
    `
  }
}

export default WordCountQuery
