import sql from '../sql.js'

export async function insertKnownWordsIntoDatabase(
  wordIds: Set<number>,
  userId: string
) {
  const columns = ['known', 'user_id', 'word_id']
  const wordIdValues = [...wordIds]
  const userIdValues = new Array(wordIdValues.length).fill(userId)
  // use an integer instead of a boolean due to issue #471
  // https://github.com/porsager/postgres/issues/471
  const knownValues = new Array(wordIdValues.length).fill(1)

  // Ichiran parses some words into place names, which do not appear in the
  // 'word' table. It is safe to skip these words; they are mostly spurious.
  await sql`
    INSERT INTO user_word (${sql(columns)})
    SELECT * FROM UNNEST (
      ${knownValues}::int[]::boolean[],
      ${userIdValues}::uuid[],
      ${wordIdValues}::int[]
    ) AS data (${sql(columns)})
    WHERE EXISTS (
      SELECT 1 FROM word 
      WHERE word.id = data.word_id
    )
    ON CONFLICT (user_id, word_id) DO UPDATE
    SET known = true;
  `

  console.log('Known words ・ ✅ Known words successfully updated ✅')
}
