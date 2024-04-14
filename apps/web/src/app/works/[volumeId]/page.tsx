import WorkPage from '../../../components/WorkPage/WorkPage'
import { mockWorkInfo } from '../../../fixtures/workInfo'

export default function Work({ params }: { params: { volumeId: string } }) {
  return <WorkPage work={mockWorkInfo} />
}
