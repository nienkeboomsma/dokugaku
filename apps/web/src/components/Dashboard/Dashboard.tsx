'use client'

import { type CurrentWork } from '../../types/CurrentWork'
import DashboardSkeleton from './DashboardSkeleton'
import CurrentWorks from './CurrentWorks'
import PaperContainer, {
  PaperContainerPadding,
} from '../PaperContainer/PaperContainer'
import VocabTable, {
  VocabTableMaxWidth,
  VocabTableType,
} from '../VocabTable/VocabTable'

export default function Dashboard({
  data,
  error,
  loading,
}: {
  data?: CurrentWork[]
  error?: Error
  loading: boolean
}) {
  if (error) return 'Oops'

  if (!data || loading) return <DashboardSkeleton />

  const works = data

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
        <VocabTable furigana type={VocabTableType.Recommended} />
      </PaperContainer>
    </div>
  )
}
