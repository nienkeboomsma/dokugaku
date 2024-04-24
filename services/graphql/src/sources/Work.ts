import WorkQuery from '../queries/WorkQuery'

class Work {
  async getWork(input: {
    excludeVolumesInSeries?: boolean
    userId?: string
    workId: string
  }) {
    const workQuery = new WorkQuery({
      excludeVolumesInSeries: input.excludeVolumesInSeries,
      return: 'single',
      userId: input.userId,
      workId: input.workId,
    })
    const [work] = await workQuery.getQuery()
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
      const workQuery = new WorkQuery({
        excludeVolumesInSeries: input.excludeVolumesInSeries,
        return: 'multiple' as const,
        userId: input.userId,
        workIds: input.workIds,
      })
      return workQuery.getQuery()
    }

    const workQuery = new WorkQuery({
      excludeVolumesInSeries: input.excludeVolumesInSeries,
      return: 'all' as const,
      userId: input.userId,
    })
    return workQuery.getQuery()
  }
}

export default Work
