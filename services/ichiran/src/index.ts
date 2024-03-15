import express, { type Express } from 'express'
import { execSync } from 'child_process'

const port = process.env.ICHIRAN_PORT

const app: Express = express()

app.use(express.json())

app.post('/segmentation', (req, res) => {
  const jpString = req.body.string

  try {
    const data = execSync(`ichiran-cli -f -- "${jpString}"`).toString()
    res.status(200).json(JSON.parse(data))
  } catch (error) {
    console.log(error)
    res.status(500).end()
  }
})

app.listen(port)
console.log(`Listening on port ${port}`)
