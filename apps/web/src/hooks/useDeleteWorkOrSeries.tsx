import { useDisclosure } from '@mantine/hooks'
import { Button, Modal } from '@mantine/core'
import { useRouter } from 'next/navigation'
import { notifications } from '@mantine/notifications'
import type {
  GQL_DeleteSeriesMutation,
  GQL_DeleteWorkMutation,
} from '@repo/graphql-types'
import { useMutation } from '@apollo/client'

import classes from './useDeleteWorkOrSeries.module.css'
import {
  DELETE_SERIES,
  DELETE_WORK,
} from '../graphql/queries/updateWorkSeriesInfo'
import type { SeriesInfo } from '../types/SeriesInfo'
import type { WorkInfo } from '../types/WorkInfo'

export const useDeleteWorkOrSeries = (seriesOrWork: SeriesInfo | WorkInfo) => {
  const [opened, { open, close }] = useDisclosure(false)
  const router = useRouter()

  const [deleteSeries] = useMutation<GQL_DeleteSeriesMutation>(DELETE_SERIES, {
    variables: {
      input: {
        seriesId: seriesOrWork.id,
      },
    },
  })

  const [deleteWork] = useMutation<GQL_DeleteWorkMutation>(DELETE_WORK, {
    variables: {
      input: {
        workId: seriesOrWork.id,
      },
    },
  })

  const deleteHandler = async () => {
    try {
      if (seriesOrWork.isSeries) {
        const { data } = await deleteSeries()

        if (!data || !data.deleteSeries.success)
          throw Error('Something went wrong')
      }

      if (!seriesOrWork.isSeries) {
        const { data } = await deleteWork()

        if (!data || !data.deleteWork.success)
          throw Error('Something went wrong')
      }

      notifications.show({
        title: `Deleted ${seriesOrWork.title}`,
        message: 'Going back to the previous page',
      })
      router.back()
    } catch {
      close()
      notifications.show({
        title: `Unable to delete ${seriesOrWork.title}`,
        message: (
          <span>
            Are the <code>db</code> and <code>graphql</code>containers running?
          </span>
        ),
        color: 'red',
      })
    }
  }

  const ConfirmDeleteModal = () => {
    return (
      <Modal
        opened={opened}
        onClose={close}
        title={`Delete ${seriesOrWork.title}?`}
        centered
      >
        <div className={classes.container}>
          {`This will delete ${seriesOrWork.title} and any related data, including ${seriesOrWork.isSeries ? 'its volumes, ' : ''}reading progress and words marked ignored. This action cannot be undone.`}
          <div className={classes.buttonContainer}>
            <Button color='dark' variant='subtle' onClick={close}>
              Cancel
            </Button>
            <Button color='red' onClick={deleteHandler}>
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    )
  }

  return { ConfirmDeleteModal, open, close }
}
