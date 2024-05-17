import NovelReaderPage from '../../../../components/NovelReaderPage/NovelReaderPage'
import type { NovelJSONContent } from '../../../../types/NovelJSONContent'

export default async function NovelReader({
  params,
}: {
  params: { workId: string }
}) {
  // TODO: get initialProgress from db
  const initialProgress = 35

  const res = await fetch(
    // TODO: env
    `http://localhost:3000/assets/${params.workId}/text.json`,
    { cache: 'no-store' }
  )
  const json = await res.json()
  const textNodes: NovelJSONContent[] = json.content

  return (
    <NovelReaderPage
      initialProgress={initialProgress}
      textNodes={textNodes}
      workId={params.workId}
    />
  )
}
