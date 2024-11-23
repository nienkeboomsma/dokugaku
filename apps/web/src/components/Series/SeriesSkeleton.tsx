import { ScrollArea, Skeleton } from '@mantine/core'

import classes from './Series.module.css'
import sectionHeadingClasses from '../PaperContainer/SectionHeading.module.css'
import volumesClasses from './Volumes.module.css'
import volumeClasses from './Volume.module.css'
import PaperContainer, {
  PaperContainerPadding,
} from '../PaperContainer/PaperContainer'
import VocabTable, {
  VocabTableMaxWidth,
  VocabTableType,
} from '../VocabTable/VocabTable'
import { SeriesInfo } from '../../types/SeriesInfo'

export default function SeriesSkeleton() {
  return (
    <>
      <PaperContainer
        maxWidth={`calc(${VocabTableMaxWidth} + 2 * ${PaperContainerPadding})`}
      >
        <div className={classes.contentContainer}>
          <div className={classes.seriesInfo}>
            <div className={classes.titleAndAuthors}>
              <span className={classes.titleContainer}>
                <Skeleton height={24} mb={6} width={250} />
              </span>
              <Skeleton height={16} width={100} />
            </div>

            <div>
              <Skeleton height={36} width={144} />
            </div>
          </div>
          <div>
            <Skeleton
              className={sectionHeadingClasses.title}
              height={18}
              width={95}
            />

            <ScrollArea
              classNames={{
                root: volumesClasses.scrollArea,
                viewport: volumesClasses.scrollAreaViewport,
              }}
              offsetScrollbars
              scrollbarSize={8}
            >
              <div className={volumesClasses.volumesContainer}>
                {Array(8)
                  .fill(undefined)
                  .map(() => (
                    <div className={volumeClasses.container}>
                      <Skeleton height={195} width={126} />
                      <Skeleton
                        className={volumeClasses.statusBadge}
                        height={20}
                        width={75}
                      />
                    </div>
                  ))}
              </div>
            </ScrollArea>
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
                seriesOrWork={{} as SeriesInfo}
                type={VocabTableType.SeriesOrWork}
              />
            </Skeleton>
          </div>
        </div>
      </PaperContainer>
    </>
  )
}
