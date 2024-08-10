import classes from './CurrentWorks.module.css'
import { type CurrentWork } from '../../types/CurrentWork'
import PaperContainer from '../PaperContainer/PaperContainer'
import ScaleLink from '../ScaleLink'
import WorkCover from '../WorkCover'
import { ScrollArea } from '@mantine/core'

export default function CurrentWorks({ works }: { works?: CurrentWork[] }) {
  // TODO: add a placeholder
  if (!works) return 'Oops'

  return (
    <PaperContainer heading='Currently reading' maxWidth='100%'>
      <ScrollArea
        classNames={{
          root: classes.scrollArea,
          viewport: classes.scrollAreaViewport,
        }}
        offsetScrollbars
        scrollbarSize={8}
      >
        <div className={classes.worksContainer}>
          {works.map((work) => (
            <ScaleLink href={`/works/${work.id}`} key={work.id}>
              <WorkCover
                coverPath={`/assets/${work.id}/cover.webp`}
                maxProgress={work.maxProgress}
                progress={work.progress}
                width='8rem'
              />
            </ScaleLink>
          ))}
        </div>
      </ScrollArea>
    </PaperContainer>
  )
}
