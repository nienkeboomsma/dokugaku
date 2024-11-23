import { Skeleton } from '@mantine/core'

import classes from './Work.module.css'
import sectionHeadingClasses from '../PaperContainer/SectionHeading.module.css'
import { coverWidth } from './Work'
import { WorkInfo } from '../../types/WorkInfo'
import PaperContainer, {
  PaperContainerPadding,
} from '../PaperContainer/PaperContainer'
import VocabTable, {
  VocabTableMaxWidth,
  VocabTableType,
} from '../VocabTable/VocabTable'

export default function WorkSkeleton() {
  const cssVariables = {
    '--cover-width': coverWidth,
    '--second-column-max-width': VocabTableMaxWidth,
    '--second-column-width': 'calc(100% - var(--cover-width) - var(--gap))',
  } as React.CSSProperties

  return (
    <PaperContainer
      maxWidth={`calc(${coverWidth} + ${VocabTableMaxWidth} + 3 * ${PaperContainerPadding})`}
    >
      <div className={classes.container} style={cssVariables}>
        <div className={classes.firstColumn}>
          <Skeleton
            height='calc(var(--cover-width) * 1.5)'
            width={coverWidth}
          />
          <Skeleton height={36} width={coverWidth} />
          <Skeleton height={36} width={coverWidth} />
        </div>

        <div className={classes.secondColumn}>
          <div className={classes.titleAndAuthors}>
            <span className={classes.titleContainer}>
              <Skeleton height={24} mb={6} width={250} />
            </span>
            <Skeleton height={16} width={100} />
          </div>
          <div>
            <Skeleton
              className={sectionHeadingClasses.title}
              height={18}
              mt={-3}
              width={70}
            />

            <Skeleton visible>
              <VocabTable
                furigana
                seriesOrWork={{} as WorkInfo}
                type={VocabTableType.SeriesOrWork}
              />
            </Skeleton>
          </div>
        </div>
      </div>
    </PaperContainer>
  )
}
