import { execSync } from 'child_process'
import express, { type Express } from 'express'

async function main() {
  const app: Express = express()

  app.use(express.json())

  app.post('/mokuro', async (req, res) => {
    const workPath = req.body.path
    try {
      execSync(
        `mokuro /dokugaku/${workPath} --disable_confirmation && \ 
        mv /dokugaku/_ocr/${workPath}/* /dokugaku/${workPath}/ && \
        rm -rf /dokugaku/_ocr && \
        rm /dokugaku/${workPath}.html`
      )
      return res.status(200).send(`Mokuro has successfully processed the files`)
    } catch (error) {
      return res.status(500).send(`Mokuro was unable to process the files`)
    }
  })

  const port = process.env.MOKURO_PORT
  app.listen(port)
  console.log(`Listening on port ${port}`)
}

main()
