import { ScrollArea, Skeleton } from '@mantine/core'

import sectionHeadingClasses from './../PaperContainer/SectionHeading.module.css'
import currentWorksClasses from './CurrentWorks.module.css'
import PaperContainer, {
  PaperContainerPadding,
} from '../PaperContainer/PaperContainer'
import VocabTable, {
  VocabTableMaxWidth,
  VocabTableType,
} from '../VocabTable/VocabTable'

export default function DashboardSkeleton() {
  return (
    <div
      style={{
        marginInline: 'auto',
        maxWidth: `calc(${VocabTableMaxWidth} + 2 * ${PaperContainerPadding} )`,
      }}
    >
      <PaperContainer maxWidth='100%'>
        <Skeleton
          className={sectionHeadingClasses.title}
          height={18}
          mb={18}
          mt={2}
          width={200}
        />
        <ScrollArea
          classNames={{
            root: currentWorksClasses.scrollArea,
            viewport: currentWorksClasses.scrollAreaViewport,
          }}
          offsetScrollbars
          scrollbarSize={8}
        >
          <div className={currentWorksClasses.worksContainer}>
            {Array(6)
              .fill(undefined)
              .map(() => (
                <Skeleton height={192} width={128} />
              ))}
          </div>
        </ScrollArea>
      </PaperContainer>

      <PaperContainer maxContentWidth={VocabTableMaxWidth}>
        <Skeleton
          className={sectionHeadingClasses.title}
          height={18}
          mb={18}
          mt={2}
          width={220}
        />
        <Skeleton visible>
          <VocabTable furigana type={VocabTableType.Recommended} />
        </Skeleton>
      </PaperContainer>
    </div>
  )
}
