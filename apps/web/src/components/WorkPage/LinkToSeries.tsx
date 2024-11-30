import { Anchor } from '@mantine/core'
import Link from 'next/link'

import TruncateToSingleLine from '../TruncateToSingleLine'

export default function LinkToSeries({
  seriesId,
  seriesTitle,
}: {
  seriesId: string
  seriesTitle: string
}) {
  return (
    <TruncateToSingleLine>
      <Link href={`/series/${seriesId}`}>
        <Anchor className='japanese' component='span' lh={1} underline='hover'>
          {seriesTitle}
        </Anchor>
      </Link>
    </TruncateToSingleLine>
  )
}
