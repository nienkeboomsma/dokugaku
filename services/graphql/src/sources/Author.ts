import AuthorQuery from '../queries/AuthorQuery'

class Author {
  async getAuthor(input: { authorId: string }) {
    const authorQuery = new AuthorQuery({
      authorId: input.authorId,
      return: 'single',
    })
    const [author] = await authorQuery.getQuery()
    return author
  }

  async getAuthors(
    input: {
      authorIds?: string[]
    } = {}
  ) {
    if (input.authorIds && input.authorIds.length > 0) {
      const authorQuery = new AuthorQuery({
        authorIds: input.authorIds,
        return: 'multiple' as const,
      })
      return authorQuery.getQuery()
    }

    const authorQuery = new AuthorQuery({
      return: 'all' as const,
    })
    return authorQuery.getQuery()
  }
}

export default Author
