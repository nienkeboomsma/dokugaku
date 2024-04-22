import getWorksQuery from './worksQuery.js'

class Work {
  async getWork(input: {
    excludeVolumesInSeries?: boolean
    userId?: string
    workId: string
  }) {
    const [work] = await getWorksQuery({
      excludeVolumesInSeries: input.excludeVolumesInSeries,
      return: 'single',
      userId: input.userId,
      workId: input.workId,
    })
    return work
  }

  async getWorks(
    input: {
      excludeVolumesInSeries?: boolean
      userId?: string
      workIds?: string[]
    } = {}
  ) {
    if (input.workIds && input.workIds.length > 0) {
      return getWorksQuery({
        excludeVolumesInSeries: input.excludeVolumesInSeries,
        return: 'multiple' as const,
        userId: input.userId,
        workIds: input.workIds,
      })
    }

    return getWorksQuery({
      excludeVolumesInSeries: input.excludeVolumesInSeries,
      return: 'all' as const,
      userId: input.userId,
    })
  }
}

export default Work
