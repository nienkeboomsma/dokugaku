import React from 'react'

export function rtl(Story: () => React.ReactNode) {
  return (
    <div style={{ direction: 'rtl' }}>
      <Story />
    </div>
  )
}
