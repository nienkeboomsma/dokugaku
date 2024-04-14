import BrowsePage from '../../components/BrowsePage/BrowsePage'
import { mockWorkCardInfo } from '../../fixtures/workCardInfo'

export default function Browse() {
  return <BrowsePage initialWorkCards={mockWorkCardInfo} />
}
