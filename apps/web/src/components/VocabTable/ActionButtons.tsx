import { ElementType } from 'react'
import {
  IconCheck,
  IconEye,
  IconEyeOff,
  IconTrash,
  IconTrashOff,
  IconX,
} from '@tabler/icons-react'

import classes from './ActionButtons.module.css'
import ActionButton from './ActionButton'

type VocabAction = () => void

type ActionButtonsProps =
  | {
      onExcludeWord: VocabAction
      onIgnoreWord: VocabAction
      onMarkWordAsKnown: VocabAction
      type: 'frequencyList'
    }
  | {
      onExcludeWord: VocabAction
      onMarkWordAsKnown: VocabAction
      type: 'recommendedVocab'
    }
  | {
      onMarkWordAsUnknown: VocabAction
      type: 'knownWords'
    }
  | {
      onExcludeWord: VocabAction
      onUnignoreWord: VocabAction
      type: 'excludedFromWork'
    }
  | {
      onUnexcludeWord: VocabAction
      type: 'excludedEverywhere'
    }

type ActionButtonProps = {
  icon: ElementType
  iconColor: string
  onClick: () => void
  tooltipLabel: string
}

export default function ActionButtons(props: ActionButtonsProps) {
  let actionButtons: ActionButtonProps[] = []

  switch (props.type) {
    case 'frequencyList':
      actionButtons = [
        {
          icon: IconCheck,
          iconColor: 'green',
          onClick: props.onMarkWordAsKnown,
          tooltipLabel: 'Mark as known',
        },
        {
          icon: IconEyeOff,
          iconColor: 'blue',
          onClick: props.onIgnoreWord,
          tooltipLabel: 'Exclude from this work',
        },
        {
          icon: IconTrash,
          iconColor: 'red',
          onClick: props.onExcludeWord,
          tooltipLabel: 'Exclude everywhere',
        },
      ]
      break
    case 'recommendedVocab':
      actionButtons = [
        {
          icon: IconCheck,
          iconColor: 'green',
          onClick: props.onMarkWordAsKnown,
          tooltipLabel: 'Mark as known',
        },
        {
          icon: IconTrash,
          iconColor: 'red',
          onClick: props.onExcludeWord,
          tooltipLabel: 'Exclude everywhere',
        },
      ]
      break
    case 'excludedFromWork':
      actionButtons = [
        {
          icon: IconEye,
          iconColor: 'blue',
          onClick: props.onUnignoreWord,
          tooltipLabel: 'Include in this work',
        },
        {
          icon: IconTrash,
          iconColor: 'red',
          onClick: props.onExcludeWord,
          tooltipLabel: 'Exclude everywhere',
        },
      ]
      break
    case 'knownWords':
      actionButtons = [
        {
          icon: IconX,
          iconColor: 'red',
          onClick: props.onMarkWordAsUnknown,
          tooltipLabel: 'Mark as not yet known',
        },
      ]
      break
    case 'excludedEverywhere':
      actionButtons = [
        {
          icon: IconTrashOff,
          iconColor: 'green',
          onClick: props.onUnexcludeWord,
          tooltipLabel: 'Include everywhere',
        },
      ]
      break
  }

  return (
    <div className={classes.container}>
      {actionButtons.map((actionButton) => (
        <ActionButton
          icon={actionButton.icon}
          iconColor={actionButton.iconColor}
          key={actionButton.tooltipLabel}
          onClick={actionButton.onClick}
          tooltipLabel={actionButton.tooltipLabel}
        />
      ))}
    </div>
  )
}
