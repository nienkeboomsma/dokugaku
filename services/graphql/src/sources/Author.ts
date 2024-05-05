import AuthorQuery from '../queries/AuthorQuery'

class Author {
  async getAuthor(input: { authorId: string }) {
    const authorQuery = new AuthorQuery({
      authorId: input.authorId,
      return: 'single',
    })
    const [author] = await authorQuery.runQuery()
    return author ?? null
  }

  async getAuthors(
    input: {
      authorIds?: string[]
    } | null = {}
  ) {
    if (input && input.authorIds && input.authorIds.length > 0) {
      const authorQuery = new AuthorQuery({
        authorIds: input.authorIds,
        return: 'multiple' as const,
      })
      const authors = await authorQuery.runQuery()
      return authors ?? []
    }

    const authorQuery = new AuthorQuery({
      return: 'all' as const,
    })
    const authors = await authorQuery.runQuery()
    return authors ?? []
  }
}

export default Author
