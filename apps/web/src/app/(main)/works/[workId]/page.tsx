import { Metadata } from 'next'
import WorkPage from '../../../../components/WorkPage/WorkPage'
import { getWorkInfo } from '../../../../graphql/queries/getWorkInfo'

export const metadata: Metadata = {
  icons:
    'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📋</text></svg>',
}

export default async function Work({ params }: { params: { workId: string } }) {
  const workInfo = await getWorkInfo(params.workId)

  return (
    <>
      {workInfo && <title>{workInfo.title}</title>}
      <WorkPage work={workInfo} />
    </>
  )
}
