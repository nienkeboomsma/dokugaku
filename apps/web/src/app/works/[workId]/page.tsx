import WorkPage from '../../../components/WorkPage/WorkPage'
import { getWorkInfo } from '../../../graphql/getWorkInfo'
import { getWorkVocab } from '../../../graphql/getWorkVocab'

export default async function Work({ params }: { params: { workId: string } }) {
  const workInfo = await getWorkInfo(params.workId)
  const vocab = await getWorkVocab(params.workId)

  return <WorkPage initialVocab={vocab} work={workInfo} />
}
