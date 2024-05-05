import classes from './CurrentWorks.module.css'
import { type CurrentWork } from '../../types/CurrentWork'
import PaperContainer from '../PaperContainer/PaperContainer'
import ScaleLink from '../ScaleLink'
import WorkCover from '../WorkCover'

export default function CurrentWorks({ works }: { works?: CurrentWork[] }) {
  // TODO: add a placeholder
  if (!works) return 'Oops'

  return (
    <PaperContainer heading='Currently reading' maxWidth='100%'>
      <div className={classes.worksContainer}>
        {works.map((work) => (
          <ScaleLink href={`/works/${work.id}`} key={work.id}>
            <WorkCover
              coverPath={`/works/${work.id}/cover.webp`}
              // maxProgress={work.maxProgress}
              // progress={work.progress}
              width='7.5rem'
            />
          </ScaleLink>
        ))}
      </div>
    </PaperContainer>
  )
}
