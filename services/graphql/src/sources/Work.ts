import { GQL_ReadStatus } from '@repo/graphql-types'

import sql from '../data/sql'
import WorkQuery from '../queries/WorkQuery'

class Work {
  async getWork(input: {
    excludeVolumesInSeries?: boolean
    status?: GQL_ReadStatus
    userId: string
    workId: string
  }) {
    const workQuery = new WorkQuery({
      ...input,
      return: 'single',
    })
    const [work] = await workQuery.runQuery()
    return work
  }

  async getWorks(input: {
    excludeVolumesInSeries?: boolean
    status?: GQL_ReadStatus
    userId: string
    workIds?: string[]
  }) {
    if (input.workIds && input.workIds.length > 0) {
      const workQuery = new WorkQuery({
        ...input,
        return: 'multiple' as const,
        workIds: input.workIds,
      })
      const works = await workQuery.runQuery()
      return works ?? []
    }

    const workQuery = new WorkQuery({
      ...input,
      return: 'all' as const,
    })
    const works = await workQuery.runQuery()
    return works ?? []
  }

  async updateWorkProgress(input: {
    progress: number
    userId: string
    workId: string
  }) {
    return sql<[{ progress: number }]>`
      UPDATE user_work
      SET current_progress = ${input.progress}
      WHERE user_id = ${input.userId} 
        AND work_id = ${input.workId}
      RETURNING current_progress AS progress;
    `
  }

  async updateWorkReadStatus(input: {
    status: GQL_ReadStatus
    userId: string
    workId: string
  }) {
    return sql<[{ status: GQL_ReadStatus }]>`
      UPDATE user_work
      SET status = ${input.status}
      WHERE user_id = ${input.userId} 
        AND work_id = ${input.workId}
      RETURNING status;
    `
  }
}

export default Work
