import WorkPage from '../../../components/WorkPage/WorkPage'
import { getWorkInfo } from '../../../graphql/getWorkInfo'

export default async function Work({ params }: { params: { workId: string } }) {
  const workInfo = await getWorkInfo(params.workId)

  return <WorkPage work={workInfo} />
}
