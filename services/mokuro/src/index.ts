import express, { type Express } from 'express'
import { execSync } from 'child_process'
import path from 'path'

const app: Express = express()

app.use(express.json())

app.post('/mokuro', async (req, res) => {
  const volumePath = '/dokugaku'
  const folderName = req.body.folderName

  try {
    // TODO: validate whether there are image files in the folder to begin with
    console.log(
      `Processing the image files in ${path.join(volumePath, folderName)}`
    )
    execSync(
      `mokuro ${path.join(volumePath, folderName)} --disable_confirmation ;
        mv ${path.join(volumePath, '_ocr', folderName, '*')} ${path.join(volumePath, folderName)} ;
        rm -rf ${path.join(volumePath, '_ocr')} ;
        rm ${path.join(volumePath, `${folderName}.html`)}`
    )
    return res.status(200).send(`Mokuro has successfully processed the files`)
  } catch (error) {
    return res.status(500).send(`Mokuro was unable to process the files`)
  }
})

app.use((err) => {
  console.log(err)
  process.exit(1)
})

const port = Number(process.env.MOKURO_PORT)
app.listen(port)
console.log(`Listening on port ${port}`)
