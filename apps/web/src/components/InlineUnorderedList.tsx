import React from 'react'
import classes from './InlineUnorderedList.module.css'

export default function InlineUnorderedList({
  classNames,
  listItems,
  listItemWrapper: ListItemWrapper,
}: {
  classNames?: { listItem?: string }
  listItems: string[]
  listItemWrapper?: React.ElementType<{ children: React.ReactNode }>
}) {
  return (
    <ul className={classes.unorderedList}>
      {listItems.map((listItem, index) => (
        <li className={classes.listItem} key={index}>
          {ListItemWrapper ? (
            <ListItemWrapper className={classNames?.listItem}>
              {listItem}
            </ListItemWrapper>
          ) : (
            listItem
          )}
        </li>
      ))}
    </ul>
  )
}
