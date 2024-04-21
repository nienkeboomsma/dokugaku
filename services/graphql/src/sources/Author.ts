import sql from '../data/sql.js'

class Author {
  async getAuthor(id: string) {
    const [author] =
      await sql`SELECT id, author_name AS name FROM author WHERE id = ${id}`
    return author
  }
  async getAuthors() {
    const authors = await sql`SELECT id, author_name AS name FROM author`
    return authors
  }
}

export default Author
