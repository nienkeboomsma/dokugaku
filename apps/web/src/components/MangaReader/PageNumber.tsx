import {
  type Dispatch,
  type KeyboardEvent,
  type SetStateAction,
  useEffect,
  useState,
} from 'react'
import { NumberInput, TextInput } from '@mantine/core'

import classes from './PageNumber.module.css'

export default function PageNumber({
  currentPageNumber,
  maxPageNumber,
  setCurrentPageNumber,
  showTwoPages,
  twoPageLayout,
}: {
  currentPageNumber: number
  maxPageNumber: number
  setCurrentPageNumber: Dispatch<SetStateAction<number>>
  showTwoPages: boolean
  twoPageLayout: boolean
}) {
  const [inputValue, setInputValue] = useState<string | number>(
    currentPageNumber
  )
  const [inputError, setInputError] = useState(false)

  useEffect(() => {
    setInputValue(currentPageNumber)
  }, [currentPageNumber])

  const handleChange = (value: string | number) => {
    if (!value) return

    const valueAsNumber = Number(value)

    if (valueAsNumber < 1 || valueAsNumber > maxPageNumber) {
      return setInputError(true)
    }

    setInputError(false)
    setInputValue(value)
  }

  const setDisplayVisibility = (visibility: 'show' | 'hide') => {
    const pageNumberDisplay = document.querySelector('#pageNumberDisplay')

    if (!pageNumberDisplay || !(pageNumberDisplay instanceof HTMLInputElement))
      return

    if (visibility === 'hide') {
      pageNumberDisplay.style.opacity = '0'
    }
    if (visibility === 'show') {
      pageNumberDisplay.style.opacity = '1'
    }
  }

  const setSelectorFocus = (focus: 'focus' | 'blur') => {
    const pageNumberSelector = document.querySelector('#pageNumberSelector')

    if (
      !pageNumberSelector ||
      !(pageNumberSelector instanceof HTMLInputElement)
    )
      return

    if (focus === 'focus') {
      pageNumberSelector.focus()
    }
    if (focus === 'blur') {
      pageNumberSelector.blur()
    }
  }

  const handleSubmit = (event: KeyboardEvent) => {
    if (inputError) return
    if (!(event.target instanceof HTMLInputElement)) return
    if (!event.target.value) {
      setSelectorFocus('blur')
      setDisplayVisibility('show')
    }

    const valueAsNumber = Number(event.target.value)
    const valueIsSecondPageOfSpread =
      twoPageLayout && valueAsNumber > 1 && valueAsNumber % 2 === 1

    setCurrentPageNumber(
      valueIsSecondPageOfSpread ? valueAsNumber - 1 : valueAsNumber
    )
    setSelectorFocus('blur')
  }

  return (
    <div className={classes.container}>
      <NumberInput
        classNames={{
          input: classes.pageNumberInput,
        }}
        error={inputError}
        hideControls
        id='pageNumberSelector'
        max={maxPageNumber}
        min={1}
        onBlur={(event) => {
          event.target.value = currentPageNumber.toString()
          setInputValue(currentPageNumber)
          setDisplayVisibility('show')
        }}
        onChange={handleChange}
        onFocus={(event) => {
          event.target.value = ''
          setInputValue('')
          setDisplayVisibility('hide')
        }}
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            setSelectorFocus('blur')
          }
          if (event.key === 'Enter') {
            handleSubmit(event)
          }
        }}
        size='xs'
        value={inputValue}
      />
      <TextInput
        classNames={{
          input: classes.pageNumberInput,
          root: classes.pageNumberDisplay,
        }}
        id='pageNumberDisplay'
        onFocus={() => {
          setSelectorFocus('focus')
          setDisplayVisibility('hide')
        }}
        readOnly
        size='xs'
        tabIndex={-1}
        value={
          showTwoPages
            ? `${Number(currentPageNumber) + 1}, ${currentPageNumber}`
            : currentPageNumber
        }
      />
    </div>
  )
}
