import express, { type Express } from 'express'
import { getSegmentation, getWordListFromSegmentation } from './utils'

const app: Express = express()

app.use(express.json())

app.post('/originalSegmentation', async (req, res) => {
  req.setTimeout(600000)
  const jpString = req.body.string
  const segmentation = getSegmentation(jpString)
  res.status(200).json(segmentation)
})

app.post('/processedSegmentation', async (req, res) => {
  req.setTimeout(600000)
  const jpString = req.body.string
  const segmentation = getSegmentation(jpString)
  const processedSegmentation = await getWordListFromSegmentation(segmentation)
  res.status(200).json(processedSegmentation)
})

app.post('/idsOnly', async (req, res) => {
  req.setTimeout(600000)
  const jpString = req.body.string
  const segmentation = getSegmentation(jpString)
  const processedSegmentation = await getWordListFromSegmentation(segmentation)
  const idList = processedSegmentation.map((word) => word.id)
  res.status(200).json(idList)
})

app.use((err) => {
  console.log(err)
  process.exit(1)
})

const port = process.env.ICHIRAN_PORT
app.listen(port)
console.log(`Listening on port ${port}`)
