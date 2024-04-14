import { Paper } from '@mantine/core'

import classes from './PaperContainer.module.css'
import SectionHeading from './SectionHeading'

const PADDING = 'var(--mantine-spacing-xl)'

export default function PaperContainer({
  children,
  component,
  heading,
  maxContentWidth,
  maxWidth,
}: {
  children: React.ReactNode
  component?: React.ElementType
  heading?: string
  maxContentWidth?: string
  maxWidth?: string
}) {
  return (
    <Paper<any>
      className={classes.container}
      component={component ?? 'div'}
      maw={
        maxContentWidth
          ? `calc(${maxContentWidth} + 2 * var(--padding))`
          : maxWidth
            ? maxWidth
            : 'max-content'
      }
      shadow='xs'
    >
      {heading && <SectionHeading>{heading}</SectionHeading>}
      {children}
    </Paper>
  )
}

export const PaperContainerPadding = PADDING
