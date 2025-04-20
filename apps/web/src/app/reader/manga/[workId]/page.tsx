import { Metadata } from 'next'
import { getWorkProgress } from '../../../../graphql/queries/getWorkProgress'
import MangaReaderPage from '../../../../components/MangaReader/MangaReaderPage'

export const metadata: Metadata = {
  icons:
    'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📚</text></svg>',
}

export default async function MangaReader({
  params,
  searchParams,
}: {
  params: { workId: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const workProgress = await getWorkProgress(params.workId)
  const openAtPage = Array.isArray(searchParams.page)
    ? 0
    : Number(searchParams.page)

  return (
    <>
      {workProgress && <title>{workProgress.title}</title>}
      <MangaReaderPage openAtPage={openAtPage} workProgress={workProgress} />
    </>
  )
}
