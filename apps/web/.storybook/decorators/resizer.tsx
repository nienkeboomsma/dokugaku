type Options = {
  contentMaxWidth?: string
  contentMinWidth?: string
  contentWidth?: string
  maxWidth?: string
  minWidth?: string
  padding?: string
  width?: string
}

function contentWidthPlusPadding(contentWidth: string, padding: string) {
  return `calc(2 * ${padding} + ${contentWidth})`
}

function getWidths(options: Options) {
  const widths = {} as Options
  const defaultWidth = '15rem'

  if (options.contentWidth && options.padding) {
    widths.width = contentWidthPlusPadding(
      options.contentWidth,
      options.padding
    )
  } else {
    widths.width = options.width ?? defaultWidth
  }

  if (options.contentMaxWidth && options.padding) {
    widths.maxWidth = contentWidthPlusPadding(
      options.contentMaxWidth,
      options.padding
    )
  }

  if (options.contentMinWidth && options.padding) {
    widths.minWidth = contentWidthPlusPadding(
      options.contentMinWidth,
      options.padding
    )
  }

  return widths
}

export function resizer(options: Options = {}) {
  return (Story: () => React.ReactNode) => {
    return (
      <div
        style={{
          containerType: 'inline-size',
          minHeight: 'fit-content',
          overflow: 'auto',
          padding: options.padding,
          resize: 'horizontal',
          ...getWidths(options),
        }}
      >
        <Story />
      </div>
    )
  }
}
