import { useReducer } from 'react'
import { Vocab } from '../types/Vocab'
import { WorkInfo } from '../types/WorkInfo'
import { SeriesInfo } from '../types/SeriesInfo'
import { isUndefined } from '../types/utility'

export type VocabAction =
  | {
      type: 'EXCLUDE_WORD'
      vocabId: Vocab['id']
    }
  | {
      type: 'IGNORE_WORD'
      isSeries: boolean
      seriesOrWorkId: WorkInfo['id'] | SeriesInfo['id']
      vocabId: Vocab['id']
    }
  | {
      type: 'MARK_WORD_AS_KNOWN'
      vocabId: Vocab['id']
    }
  | {
      type: 'MARK_WORD_AS_UNKNOWN'
      vocabId: Vocab['id']
    }
  | {
      type: 'UNEXCLUDE_WORD'
      vocabId: Vocab['id']
    }
  | {
      type: 'UNIGNORE_WORD'
      isSeries: boolean
      seriesOrWorkId: WorkInfo['id'] | SeriesInfo['id']
      vocabId: Vocab['id']
    }

const reducer = (prevState: Vocab[], action: VocabAction): Vocab[] => {
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
  initialState: Vocab[],
  options: {
    isSeries?: boolean
    seriesOrWorkId?: WorkInfo['id'] | SeriesInfo['id']
  } = {}
) {
  const [vocab, dispatch] = useReducer(reducer, initialState)

  const { isSeries, seriesOrWorkId } = options

  const excludeWordById = (vocabId: Vocab['id']) => {
    const action: VocabAction = {
      type: 'EXCLUDE_WORD',
      vocabId,
    }
    dispatch(action)
  }

  const ignoreWordById = (vocabId: Vocab['id']) => {
    if (isUndefined(isSeries) || isUndefined(seriesOrWorkId)) return

    const action: VocabAction = {
      type: 'IGNORE_WORD',
      isSeries,
      seriesOrWorkId,
      vocabId,
    }
    dispatch(action)
  }

  const markWordAsKnownById = (vocabId: Vocab['id']) => {
    const action: VocabAction = {
      type: 'MARK_WORD_AS_KNOWN',
      vocabId,
    }
    dispatch(action)
  }

  const markWordAsUnknownById = (vocabId: Vocab['id']) => {
    const action: VocabAction = {
      type: 'MARK_WORD_AS_UNKNOWN',
      vocabId,
    }
    dispatch(action)
  }

  const unExcludeWordById = (vocabId: Vocab['id']) => {
    const action: VocabAction = {
      type: 'UNEXCLUDE_WORD',
      vocabId,
    }
    dispatch(action)
  }

  const unignoreWordById = (vocabId: Vocab['id']) => {
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
