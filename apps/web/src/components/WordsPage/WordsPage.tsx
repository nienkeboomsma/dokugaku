'use client'

import VocabTable, {
  VocabTableMaxWidth,
  VocabTableType,
} from '../VocabTable/VocabTable'
import { type Word } from '../../types/Word'
import { useVocab } from '../../hooks/useVocab'
import PaperContainer from '../PaperContainer/PaperContainer'

export default function WordsPage({
  heading,
  type,
  initialVocab,
}: {
  heading: string
  type: VocabTableType
  initialVocab: Word[]
}) {
  const { actions, vocab } = useVocab(initialVocab)

  return (
    <PaperContainer heading={heading} maxWidth={VocabTableMaxWidth}>
      <VocabTable actions={actions} furigana type={type} vocab={vocab} />
    </PaperContainer>
  )
}
