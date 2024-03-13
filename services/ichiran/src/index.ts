import express, { type Express } from 'express'

const port = process.env.ICHIRAN_PORT
console.log(port)

const app: Express = express()

app.use(express.json())

app.post('/test', (req, res) => {
  res.status(200).send('Success!')
})

app.listen(port)
console.log(`Listening on port ${port}`)
