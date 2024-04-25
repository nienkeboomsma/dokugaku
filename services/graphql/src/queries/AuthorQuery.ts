import sql from '../data/sql.js'
import { AuthorModel } from '../models/AuthorModel.js'

type ReturnSingle = {
  return: 'single'
  authorId: string
}

type ReturnMultiple = {
  return: 'multiple'
  authorIds: string[]
}

type ReturnAll = {
  return: 'all'
}

type QueryParams = ReturnSingle | ReturnMultiple | ReturnAll

class AuthorQuery {
  params: QueryParams

  constructor(params: QueryParams) {
    this.params = params
  }

  filterByAuthorkId() {
    switch (this.params.return) {
      case 'single':
        return sql`WHERE id = ${this.params.authorId}`
      case 'multiple':
        return sql`WHERE id IN ${sql(this.params.authorIds)}`
      case 'all':
        return sql``
    }
  }

  getQuery() {
    return sql<AuthorModel[]>`
      SELECT 
        id,
        author_name AS name 
      FROM author 
      ${this.filterByAuthorkId()} 
      ORDER BY author_name ASC;
    `
  }
}

export default AuthorQuery
