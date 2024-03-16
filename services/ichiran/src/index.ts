import express, { type Express } from 'express'
import { getConjugations, getSegmentation, getWordIdList } from './utils'

async function main() {
  const conjugations = await getConjugations()

  const app: Express = express()

  app.use(express.json())

  app.post('/fullSegmentation', async (req, res) => {
    const jpString = req.body.string
    const segmentation = getSegmentation(jpString)
    res.status(200).json(segmentation)
  })

  app.post('/wordIdsOnly', async (req, res) => {
    const jpString = req.body.string
    const segmentation = getSegmentation(jpString)
    const idList = await getWordIdList(segmentation, conjugations)
    res.status(200).json(idList)
  })

  const port = process.env.ICHIRAN_PORT
  app.listen(port)
  console.log(`Listening on port ${port}`)
}

main()
