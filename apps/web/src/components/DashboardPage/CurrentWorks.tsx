import classes from './CurrentWorks.module.css'
import { type CurrentWork } from '../../types/CurrentWork'
import PaperContainer from '../PaperContainer/PaperContainer'
import ScaleLink from '../ScaleLink'
import WorkCover from '../WorkCover'
import { ScrollArea } from '@mantine/core'

const MAX_WORKS_VISIBLE = 6

export default function CurrentWorks({ works }: { works?: CurrentWork[] }) {
  if (!works || !works.length) return

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
          {works.map((work, index) => (
            <ScaleLink href={`/works/${work.id}`} key={work.id}>
              <WorkCover
                coverPath={`/assets/${work.id}/cover.webp`}
                maxProgress={work.maxProgress}
                priority={index + 1 <= MAX_WORKS_VISIBLE}
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
