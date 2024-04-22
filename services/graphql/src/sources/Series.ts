import getSeriesQuery from './seriesQuery'

class Series {
  async getSeries(input: { userId?: string; seriesId: string }) {
    const [work] = await getSeriesQuery({
      return: 'single',
      userId: input.userId,
      seriesId: input.seriesId,
    })
    return work
  }

  async getSeriesList(
    input: {
      userId?: string
      seriesIds?: string[]
    } = {}
  ) {
    if (input.seriesIds && input.seriesIds.length > 0) {
      return getSeriesQuery({
        return: 'multiple' as const,
        userId: input.userId,
        seriesIds: input.seriesIds,
      })
    }

    return getSeriesQuery({
      return: 'all' as const,
      userId: input.userId,
    })
  }
}

export default Series
