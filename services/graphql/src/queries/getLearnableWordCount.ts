import sql from '../data/sql'
import { LearnableWordCountModel } from '../models/LearnableWordCountModel'

// TODO: test JOIN vs NOT EXISTS

type GetLearnableWordCountParamsCommon = {
  userId: string
}

type GetLearnableWordCountParamsSeries = {
  isSeries: true
  seriesId: string
}

type GetLearnableWordCountParamsWorkInSeries = {
  isSeries: false
  isPartOfSeries: true
  seriesId: string
  workId: string
}

type GetLearnableWordCountParamsWorkNotInSeries = {
  isSeries: false
  isPartOfSeries: false
  workId: string
}

type GetLearnableWordCountParams = GetLearnableWordCountParamsCommon &
  (
    | GetLearnableWordCountParamsSeries
    | GetLearnableWordCountParamsWorkInSeries
    | GetLearnableWordCountParamsWorkNotInSeries
  )

export function getLearnableWordCount(params: GetLearnableWordCountParams) {
  return sql<[LearnableWordCountModel]>`
    SELECT
      COUNT(*) AS count
    
    ${
      params.isSeries
        ? sql`
          FROM series
          
          JOIN work
            ON work.series_id = series.id
            AND series.id = ${params.seriesId}
        `
        : sql`
          FROM work
        `
    }
    
    JOIN word_work 
      ON word_work.work_id = work.id
    
    ${
      params.isSeries || params.isPartOfSeries
        ? sql`
          LEFT JOIN ignored_in_series 
            ON ignored_in_series.word_id = word_work.word_id
            AND ignored_in_series.series_id = ${params.seriesId}
            AND ignored_in_series.user_id = ${params.userId}
            
        `
        : sql`
          LEFT JOIN ignored_in_work 
            ON ignored_in_work.word_id = word_work.word_id
            AND ignored_in_work.user_id = ${params.userId}
            AND ignored_in_work.work_id = ${params.workId}
            AND COALESCE(ignored_in_work.ignored, false) = false
        `
    }
    LEFT JOIN user_word
      ON user_word.word_id = word_work.word_id
      AND user_word.user_id = ${params.userId}

    WHERE COALESCE(user_word.known, false) = false
      AND COALESCE(user_word.excluded, false) = false
      ${
        params.isSeries || params.isPartOfSeries
          ? sql`
            AND COALESCE(ignored_in_series.ignored, false) = false
          `
          : sql`
            AND COALESCE(ignored_in_work.ignored, false) = false
          `
      }
      ${
        !params.isSeries
          ? sql`
            AND work.id = ${params.workId}
          `
          : sql``
      };
  `
}
