import express, { type Express } from 'express'
import {
  getConjugations,
  getSegmentation,
  getWordListFromSegmentation,
} from './utils'

async function main() {
  const conjugations = await getConjugations()

  const app: Express = express()

  app.use(express.json())

  app.post('/originalSegmentation', async (req, res) => {
    const jpString = req.body.string
    const segmentation = getSegmentation(jpString)
    res.status(200).json(segmentation)
  })

  app.post('/processedSegmentation', async (req, res) => {
    const jpString = req.body.string
    const segmentation = getSegmentation(jpString)
    const processedSegmentation = getWordListFromSegmentation(
      segmentation,
      conjugations
    )
    res.status(200).json(processedSegmentation)
  })

  app.post('/idsOnly', async (req, res) => {
    const jpString = req.body.string
    const segmentation = getSegmentation(jpString)
    const processedSegmentation = getWordListFromSegmentation(
      segmentation,
      conjugations
    )
    const idList = processedSegmentation.map((word) => word.id)
    res.status(200).json(idList)
  })

  const port = process.env.ICHIRAN_PORT
  app.listen(port)
  console.log(`Listening on port ${port}`)
}

main()
