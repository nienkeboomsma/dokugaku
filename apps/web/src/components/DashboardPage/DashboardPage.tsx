'use client'

import { type CurrentWork } from '../../types/CurrentWork'
import { type Word } from '../../types/Word'
import { useVocab } from '../../hooks/useVocab'
import CurrentWorks from './CurrentWorks'
import PaperContainer, {
  PaperContainerPadding,
} from '../PaperContainer/PaperContainer'
import VocabTable, { VocabTableMaxWidth } from '../VocabTable/VocabTable'

export default function DashboardPage({
  works,
  initialVocab,
}: {
  works: CurrentWork[]
  initialVocab: Word[]
}) {
  const { actions, vocab } = useVocab(initialVocab)

  return (
    <div
      style={{
        marginInline: 'auto',
        maxWidth: `calc(${VocabTableMaxWidth} + 2 * ${PaperContainerPadding} )`,
      }}
    >
      <CurrentWorks works={works} />
      <PaperContainer
        heading='Recommended vocab'
        maxContentWidth={VocabTableMaxWidth}
      >
        <VocabTable
          actions={actions}
          furigana
          type='recommendedVocab'
          vocab={vocab}
        />
      </PaperContainer>
    </div>
  )
}
