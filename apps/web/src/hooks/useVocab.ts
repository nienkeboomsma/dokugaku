import { useReducer } from 'react'

import { type Word } from '../types/Word'
import { type WorkInfo } from '../types/WorkInfo'
import { type SeriesInfo } from '../types/SeriesInfo'
import { isUndefined } from '../types/utility'

export type VocabAction =
  | {
      type: 'EXCLUDE_WORD'
      vocabId: Word['id']
    }
  | {
      type: 'IGNORE_WORD'
      isSeries: boolean
      seriesOrWorkId: WorkInfo['id'] | SeriesInfo['id']
      vocabId: Word['id']
    }
  | {
      type: 'MARK_WORD_AS_KNOWN'
      vocabId: Word['id']
    }
  | {
      type: 'MARK_WORD_AS_UNKNOWN'
      vocabId: Word['id']
    }
  | {
      type: 'UNEXCLUDE_WORD'
      vocabId: Word['id']
    }
  | {
      type: 'UNIGNORE_WORD'
      isSeries: boolean
      seriesOrWorkId: WorkInfo['id'] | SeriesInfo['id']
      vocabId: Word['id']
    }

const reducer = (prevState: Word[], action: VocabAction): Word[] => {
  switch (action.type) {
    case 'EXCLUDE_WORD':
      // try/catch call to API
      return prevState.filter((vocab) => vocab.id !== action.vocabId)
    case 'IGNORE_WORD':
      // try/catch call to API
      return prevState.map((vocab) =>
        vocab.id === action.vocabId ? { ...vocab, ignored: true } : vocab
      )
    case 'MARK_WORD_AS_KNOWN':
      // try/catch call to API
      return prevState.filter((vocab) => vocab.id !== action.vocabId)
    case 'MARK_WORD_AS_UNKNOWN':
      // try/catch call to API
      return prevState.filter((vocab) => vocab.id !== action.vocabId)
    case 'UNEXCLUDE_WORD':
      // try/catch call to API
      return prevState.filter((vocab) => vocab.id !== action.vocabId)
    case 'UNIGNORE_WORD':
      // try/catch call to API
      return prevState.map((vocab) =>
        vocab.id === action.vocabId ? { ...vocab, ignored: false } : vocab
      )
    default:
      return prevState
  }
}

export function useVocab(
  initialState: Word[],
  options: {
    isSeries?: boolean
    seriesOrWorkId?: WorkInfo['id'] | SeriesInfo['id']
  } = {}
) {
  const [vocab, dispatch] = useReducer(reducer, initialState)

  const { isSeries, seriesOrWorkId } = options

  const excludeWordById = (vocabId: Word['id']) => {
    const action: VocabAction = {
      type: 'EXCLUDE_WORD',
      vocabId,
    }
    dispatch(action)
  }

  const ignoreWordById = (vocabId: Word['id']) => {
    if (isUndefined(isSeries) || isUndefined(seriesOrWorkId)) return

    const action: VocabAction = {
      type: 'IGNORE_WORD',
      isSeries,
      seriesOrWorkId,
      vocabId,
    }
    dispatch(action)
  }

  const markWordAsKnownById = (vocabId: Word['id']) => {
    const action: VocabAction = {
      type: 'MARK_WORD_AS_KNOWN',
      vocabId,
    }
    dispatch(action)
  }

  const markWordAsUnknownById = (vocabId: Word['id']) => {
    const action: VocabAction = {
      type: 'MARK_WORD_AS_UNKNOWN',
      vocabId,
    }
    dispatch(action)
  }

  const unExcludeWordById = (vocabId: Word['id']) => {
    const action: VocabAction = {
      type: 'UNEXCLUDE_WORD',
      vocabId,
    }
    dispatch(action)
  }

  const unignoreWordById = (vocabId: Word['id']) => {
    if (isUndefined(isSeries) || isUndefined(seriesOrWorkId)) return
    const action: VocabAction = {
      type: 'UNIGNORE_WORD',
      isSeries,
      seriesOrWorkId,
      vocabId,
    }
    dispatch(action)
  }

  return {
    actions: {
      onExcludeWord: excludeWordById,
      onIgnoreWord: ignoreWordById,
      onMarkWordAsKnown: markWordAsKnownById,
      onMarkWordAsUnknown: markWordAsUnknownById,
      onUnexcludeWord: unExcludeWordById,
      onUnignoreWord: unignoreWordById,
    },
    vocab,
  }
}
