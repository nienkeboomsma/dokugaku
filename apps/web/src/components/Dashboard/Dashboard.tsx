'use client'

import { type CurrentWork } from '../../types/CurrentWork'
import CurrentWorks from './CurrentWorks'
import PaperContainer, {
  PaperContainerPadding,
} from '../PaperContainer/PaperContainer'
import VocabTable, {
  VocabTableMaxWidth,
  VocabTableType,
} from '../VocabTable/VocabTable'

export default function Dashboard({
  currentWorks,
}: {
  currentWorks?: CurrentWork[]
}) {
  return (
    <div
      style={{
        marginInline: 'auto',
        maxWidth: `calc(${VocabTableMaxWidth} + 2 * ${PaperContainerPadding} )`,
      }}
    >
      <CurrentWorks works={currentWorks} />
      <PaperContainer
        heading='Recommended vocab'
        maxContentWidth={VocabTableMaxWidth}
      >
        <VocabTable furigana type={VocabTableType.Recommended} />
      </PaperContainer>
    </div>
  )
}
