import getAuthorsQuery from '../queries/authorsQuery'

class Author {
  async getAuthor(input: { authorId: string }) {
    const [author] = await getAuthorsQuery({
      authorId: input.authorId,
      return: 'single',
    })
    return author
  }

  async getAuthors(
    input: {
      authorIds?: string[]
    } = {}
  ) {
    if (input.authorIds && input.authorIds.length > 0) {
      return getAuthorsQuery({
        authorIds: input.authorIds,
        return: 'multiple' as const,
      })
    }

    return getAuthorsQuery({
      return: 'all' as const,
    })
  }
}

export default Author
