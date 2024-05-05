import sql from '../data/sql'

type ExcludedParams = {
  excluded: boolean
  userId: string
  wordId: string
}

type KnownParams = {
  known: boolean
  userId: string
  wordId: string
}

type IgnoredParams = {
  ignored: boolean
  seriesIdInWhichIgnored?: string
  userId: string
  wordId: string
  workIdInWhichIgnored?: string
}
export const updateExcludedStatus = ({
  excluded,
  userId,
  wordId,
}: ExcludedParams) => {
  return sql`
    INSERT INTO user_word (excluded, user_id, word_id)
    VALUES (${excluded}, ${userId}, ${wordId})
    ON CONFLICT (word_id, user_id)
    DO UPDATE SET excluded = ${excluded};
  `
}

export const updateKnownStatus = ({ known, userId, wordId }: KnownParams) => {
  return sql`
    INSERT INTO user_word (known, user_id, word_id)
    VALUES (${known}, ${userId}, ${wordId})
    ON CONFLICT (word_id, user_id)
    DO UPDATE SET known = ${known};
  `
}

export const updateIgnoredStatus = (params: IgnoredParams) => {
  if (!params.seriesIdInWhichIgnored && !params.workIdInWhichIgnored) {
    throw new Error(
      'Must supply a value for either seriesIdInWhichIgnored or workIdInWhichIgnored'
    )
  }

  if (params.seriesIdInWhichIgnored) {
    return sql`
      INSERT INTO ignored_in_series (word_id, series_id, user_id, ignored)
      VALUES (${params.wordId}, ${params.seriesIdInWhichIgnored}, ${params.userId}, ${params.ignored})
      ON CONFLICT (word_id, series_id, user_id)
      DO UPDATE SET ignored = ${params.ignored};
    `
  }

  if (params.workIdInWhichIgnored) {
    return sql`
      INSERT INTO ignored_in_work (word_id, work_id, user_id, ignored)
      VALUES (${params.wordId}, ${params.workIdInWhichIgnored}, ${params.userId}, ${params.ignored})
      ON CONFLICT (word_id, work_id, user_id)
      DO UPDATE SET ignored = ${params.ignored};
    `
  }
}
