import PaperContainer from '../PaperContainer/PaperContainer'
import KnownWordsUploadForm from './KnownWordsUploadForm'

export default function SettingsPage() {
  return (
    <PaperContainer heading='Settings'>
      <KnownWordsUploadForm />
    </PaperContainer>
  )
}
