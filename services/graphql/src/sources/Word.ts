import sql from '../data/sql.js'

class Word {
  async getWord(userId: string, wordId: number, workId: string) {
    const [word] = await sql`
      SELECT 
        word.id AS id, 
        word.info AS info, 
        COALESCE (user_word.excluded, false) AS excluded, 
        COALESCE (user_word.known, false) AS known 
      FROM word 
      LEFT JOIN user_word ON word.id = user_word.word_id
      LEFT JOIN word_work ON word.id = word_work.word_id
      WHERE user_word.user_id = ${userId}
      AND word_work.work_id = ${workId}
      AND word.id = ${wordId};
    `
    return word
  }
  async getWords() {}
}

export default Word
