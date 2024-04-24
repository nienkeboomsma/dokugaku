import sql from '../data/sql.js'

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

const filterByAuthorkId = (params: QueryParams) => {
  switch (params.return) {
    case 'single':
      return sql`WHERE id = ${params.authorId}`
    case 'multiple':
      return sql`WHERE id IN ${sql(params.authorIds)}`
    case 'all':
      return sql``
  }
}

const getAuthorsQuery = (params: QueryParams) => {
  return sql`
    SELECT 
      id,
      author_name AS name 
    FROM author 
    ${filterByAuthorkId(params)} 
    ORDER BY author_name ASC;
  `
}

export default getAuthorsQuery
