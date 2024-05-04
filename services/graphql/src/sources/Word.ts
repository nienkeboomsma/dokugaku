import { getFrequencyList } from '../queries/getFrequencyList.js'
import { getGlossary } from '../queries/getGlossary.js'
import { getKnownOrExcludedWords } from '../queries/getKnownOrExcludedWords.js'
import { getLearnableWordCount } from '../queries/getLearnableWordCount.js'
import { getRecommendedWords } from '../queries/getRecommendedWords.js'
import {
  updateExcludedStatus,
  updateIgnoredStatus,
  updateKnownStatus,
} from '../queries/updateWord.js'

class Word {
  getFrequencyList(params: Parameters<typeof getFrequencyList>[0]) {
    return getFrequencyList(params)
  }

  getGlossary(params: Parameters<typeof getGlossary>[0]) {
    return getGlossary(params)
  }

  getKnownOrExcludedWords(
    params: Parameters<typeof getKnownOrExcludedWords>[0]
  ) {
    return getKnownOrExcludedWords(params)
  }

  async getLearnableWordCount(
    params: Parameters<typeof getLearnableWordCount>[0]
  ) {
    const [data] = await getLearnableWordCount(params)
    return data.count
  }

  getRecommendedWords(params: Parameters<typeof getRecommendedWords>[0]) {
    return getRecommendedWords(params)
  }

  updateExcludedStatus(params: Parameters<typeof updateExcludedStatus>[0]) {
    return updateExcludedStatus(params)
  }

  updateIgnoredStatus(params: Parameters<typeof updateIgnoredStatus>[0]) {
    return updateIgnoredStatus(params)
  }

  updateKnownStatus(params: Parameters<typeof updateKnownStatus>[0]) {
    return updateKnownStatus(params)
  }
}

export default Word
