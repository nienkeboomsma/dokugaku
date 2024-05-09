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

export default function DashboardPage({ works }: { works?: CurrentWork[] }) {
  return (
    <div
      style={{
        marginInline: 'auto',
        maxWidth: `calc(${VocabTableMaxWidth} + 2 * ${PaperContainerPadding} )`,
      }}
    >
      {
        // TODO: separate error display for !works
        !works || (works.length > 0 && <CurrentWorks works={works} />)
      }
      <PaperContainer
        heading='Recommended vocab'
        maxContentWidth={VocabTableMaxWidth}
      >
        <VocabTable furigana type={VocabTableType.Recommended} />
      </PaperContainer>
    </div>
  )
}
