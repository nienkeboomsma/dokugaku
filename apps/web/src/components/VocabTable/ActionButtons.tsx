import { memo } from 'react'
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
import { VocabTableType } from './VocabTable'
import { type Word } from '../../types/Word'

type VocabAction = () => void

type ActionButtonsProps = {
  isPartOfSeries?: boolean
  isSeries?: boolean
  onExcludeWord: VocabAction
  onIgnoreWord: VocabAction
  onMarkWordAsKnown: VocabAction
  onMarkWordAsUnknown: VocabAction
  onUnexcludeWord: VocabAction
  onUnignoreWord: VocabAction
  vocabTableType: VocabTableType
  wordInRow: Word
}

function ActionButtons(props: ActionButtonsProps) {
  return (
    <div className={classes.container}>
      {(props.vocabTableType === VocabTableType.SeriesOrWork ||
        props.vocabTableType === VocabTableType.Recommended) && (
        <ActionButton
          icon={IconCheck}
          iconColor='green'
          onClick={props.onMarkWordAsKnown}
          tooltipLabel='Mark as known'
        />
      )}
      {props.vocabTableType === VocabTableType.Known && (
        <ActionButton
          icon={IconX}
          iconColor='red'
          onClick={props.onMarkWordAsUnknown}
          tooltipLabel='Mark as unknown'
        />
      )}
      {props.vocabTableType === VocabTableType.SeriesOrWork &&
        !props.wordInRow.ignored && (
          <ActionButton
            icon={IconEyeOff}
            iconColor='blue'
            onClick={props.onIgnoreWord}
            tooltipLabel={`Exclude from this ${props.isSeries || props.isPartOfSeries ? 'series' : 'work'}`}
          />
        )}
      {props.vocabTableType === VocabTableType.SeriesOrWork &&
        props.wordInRow.ignored && (
          <ActionButton
            icon={IconEye}
            iconColor='blue'
            onClick={props.onUnignoreWord}
            tooltipLabel={`Include in this ${props.isSeries || props.isPartOfSeries ? 'series' : 'work'}`}
          />
        )}
      {(props.vocabTableType === VocabTableType.SeriesOrWork ||
        props.vocabTableType === VocabTableType.Recommended) && (
        <ActionButton
          icon={IconTrash}
          iconColor='red'
          onClick={props.onExcludeWord}
          tooltipLabel='Exclude everywhere'
        />
      )}
      {props.vocabTableType === VocabTableType.Excluded && (
        <ActionButton
          icon={IconTrashOff}
          iconColor='green'
          onClick={props.onUnexcludeWord}
          tooltipLabel='Exclude nowhere'
        />
      )}
    </div>
  )
}

export default memo(ActionButtons)
