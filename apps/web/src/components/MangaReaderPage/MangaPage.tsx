import Image from 'next/image'

import type { Page } from '../../types/MangaPage'
import TextBlock from './TextBlock'

export default function MangaPage({ page }: { page?: Page }) {
  if (!page) return

  return (
    // TODO: clean up
    <div style={{ position: 'relative' }}>
      <Image
        alt={`Page ${page.pageNumber}`}
        height={page.textJson.img_height}
        priority
        src={page.imageSrc}
        width={page.textJson.img_width}
      />
      {page.textJson.blocks.map((textBlock, index) => (
        <TextBlock
          coordinates={textBlock.box}
          // fontSize={textBlock.font_size}
          key={index}
          lines={textBlock.lines}
          vertical={textBlock.vertical}
        />
      ))}
    </div>
  )
}
