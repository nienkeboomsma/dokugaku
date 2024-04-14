import { Spoiler, ActionIcon } from '@mantine/core'
import { IconChevronUp, IconChevronDown } from '@tabler/icons-react'

import classes from './Volumes.module.css'
import { VolumeInfo } from '../../types/SeriesInfo'
import SectionHeading from '../PaperContainer/SectionHeading'
import Volume, { VolumeMinWidth } from './Volume'

const controlSize = '1.9rem'
const indicatorSize = '1.4rem'

const cssVariables = {
  '--control-height': controlSize,
  '--indicator-size': indicatorSize,
  // 0.2rem extra to account for ScaleLink
  '--indicator-offset': `calc(var(--indicator-size) / 2 + 0.2rem)`,
  '--volume-min-width': VolumeMinWidth,
} as React.CSSProperties

export default function Volumes({ volumes }: { volumes: VolumeInfo[] }) {
  return (
    <div style={cssVariables}>
      <SectionHeading>Volumes</SectionHeading>
      <Spoiler
        classNames={{
          root: classes.spoilerRoot,
          control: classes.spoilerControl,
        }}
        maxHeight={288}
        hideLabel={
          <ActionIcon
            component='div'
            size={controlSize}
            variant='filled'
            radius='xl'
          >
            <IconChevronUp size={14} />
          </ActionIcon>
        }
        showLabel={
          <ActionIcon
            component='div'
            size={controlSize}
            variant='filled'
            radius='xl'
          >
            <IconChevronDown size={14} />
          </ActionIcon>
        }
      >
        <div className={classes.volumesContainer}>
          {volumes.map((volume) => (
            <Volume
              indicatorSize={indicatorSize}
              key={volume.id}
              volume={volume}
            />
          ))}
        </div>
      </Spoiler>
    </div>
  )
}
