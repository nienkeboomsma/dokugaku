import NovelReaderPage from '../../../../components/NovelReaderPage/NovelReaderPage'
import { getWorkProgress } from '../../../../graphql/queries/getWorkProgress'
import type { NovelJSONContent } from '../../../../types/NovelJSONContent'

export default async function NovelReader({
  params,
}: {
  params: { workId: string }
}) {
  const initialProgress = await getWorkProgress(params.workId)

  try {
    const res = await fetch(
      // TODO: env
      `http://localhost:3000/assets/${params.workId}/text.json`,
      { cache: 'no-store' }
    )
    const json = await res.json()
    const textNodes: NovelJSONContent[] = json.content

    return (
      <NovelReaderPage
        initialProgress={initialProgress ?? 0}
        textNodes={textNodes}
        workId={params.workId}
      />
    )
  } catch {
    // TODO: add a proper error message
    return 'Oops'
  }
}
