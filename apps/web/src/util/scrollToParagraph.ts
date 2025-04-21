export function scrollToParagraph(paragraph: number, setOutline: boolean) {
  const paragraphElement = document.body.querySelector(
    `*:has(> span > button#bookmark-${paragraph})`
  ) as HTMLElement | undefined

  if (!paragraphElement) return

  if (setOutline) {
    const paragraphs = document.querySelectorAll(
      `*:has(> span > button[id|='bookmark'])`
    ) as NodeListOf<HTMLElement>

    for (const paragraph of paragraphs) {
      paragraph.style.outlineColor = 'transparent'
    }

    paragraphElement.style.outlineColor = 'var(--highlight-color)'
  }

  paragraphElement.scrollIntoView({ block: 'center' })
}
