import { Metadata } from 'next'
import { getWorkProgress } from '../../../../graphql/queries/getWorkProgress'
import NovelReaderPage from '../../../../components/NovelReader/NovelReaderPage'

export const metadata: Metadata = {
  icons:
    'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📚</text></svg>',
}

export default async function NovelReader({
  params,
}: {
  params: { workId: string }
}) {
  const workProgress = await getWorkProgress(params.workId)

  return (
    <>
      {workProgress && <title>{workProgress.title}</title>}
      <NovelReaderPage workProgress={workProgress} />
    </>
  )
}
