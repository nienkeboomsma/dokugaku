import SeriesQuery from '../queries/seriesQuery'

class Series {
  async getSeries(input: { userId?: string; seriesId: string }) {
    const seriesQuery = new SeriesQuery({
      return: 'single',
      userId: input.userId,
      seriesId: input.seriesId,
    })
    const [series] = await seriesQuery.getQuery()
    return series
  }

  async getSeriesList(
    input: {
      userId?: string
      seriesIds?: string[]
    } = {}
  ) {
    if (input.seriesIds && input.seriesIds.length > 0) {
      const seriesQuery = new SeriesQuery({
        return: 'multiple' as const,
        userId: input.userId,
        seriesIds: input.seriesIds,
      })
      return seriesQuery.getQuery()
    }

    const seriesQuery = new SeriesQuery({
      return: 'all' as const,
      userId: input.userId,
    })
    return seriesQuery.getQuery()
  }
}

export default Series
