'use client'

import VocabTable, {
  VocabTableMaxWidth,
  VocabTableType,
} from '../VocabTable/VocabTable'
import { Vocab } from '../../types/Vocab'
import { useVocab } from '../../hooks/useVocab'
import PaperContainer from '../PaperContainer/PaperContainer'

export default function WordsPage({
  heading,
  type,
  initialVocab,
}: {
  heading: string
  type: VocabTableType
  initialVocab: Vocab[]
}) {
  const { actions, vocab } = useVocab(initialVocab)

  return (
    <PaperContainer heading={heading} maxWidth={VocabTableMaxWidth}>
      <VocabTable actions={actions} furigana type={type} vocab={vocab} />
    </PaperContainer>
  )
}
