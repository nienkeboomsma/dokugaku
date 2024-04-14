import classes from './TruncateToSingleLine.module.css'

export default function TruncateToSingleLine({
  children,
  dotColor,
}: {
  children: React.ReactNode
  dotColor?: string
}) {
  return (
    <div
      className={classes.truncate}
      style={{ '--dot-color': dotColor } as React.CSSProperties}
    >
      {children}
    </div>
  )
}
