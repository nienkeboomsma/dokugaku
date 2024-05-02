import { getFrequencyList } from '../queries/getFrequencyList.js'
import { getGlossary } from '../queries/getGlossary.js'
import { getKnownOrExcludedWords } from '../queries/getKnownOrExcludedWords.js'
import { getLearnableWordCount } from '../queries/getLearnableWordCount.js'
import { getRecommendedWords } from '../queries/getRecommendedWords.js'

class Word {
  async getFrequencyList(params: Parameters<typeof getFrequencyList>[0]) {
    return getFrequencyList(params)
  }

  async getGlossary(params: Parameters<typeof getGlossary>[0]) {
    return getGlossary(params)
  }

  async getKnownOrExcludedWords(
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

  async getRecommendedWords(params: Parameters<typeof getRecommendedWords>[0]) {
    return getRecommendedWords(params)
  }
}

export default Word
