'use client'

import VocabTable, {
  VocabTableMaxWidth,
  VocabTableType,
} from '../VocabTable/VocabTable'
import PaperContainer, {
  PaperContainerPadding,
} from '../PaperContainer/PaperContainer'

export default function WordsPage({
  heading,
  type,
}: {
  heading: string
  type: VocabTableType.Excluded | VocabTableType.Known
}) {
  return (
    <PaperContainer
      heading={heading}
      maxWidth={`calc(${VocabTableMaxWidth} + 2 * ${PaperContainerPadding})`}
    >
      <VocabTable furigana type={type} />
    </PaperContainer>
  )
}
