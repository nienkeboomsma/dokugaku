import { memo } from 'react'
import Image from 'next/image'

import classes from './MangaPage.module.css'
import type { Page } from '../../types/MangaPage'
import TextBox from './TextBox'

const MangaPage = memo(function MangaPage({ page }: { page?: Page }) {
  if (!page) return

  return (
    <div className={classes.container}>
      <Image
        alt={`Page ${page.pageNumber}`}
        height={page.textJson.img_height}
        priority
        src={page.imageSrc}
        width={page.textJson.img_width}
      />
      {page.textJson.blocks.map((textBox, index) => (
        <TextBox
          imageWidth={page.textJson.img_width}
          key={index}
          textBox={textBox}
        />
      ))}
    </div>
  )
})

export default MangaPage
