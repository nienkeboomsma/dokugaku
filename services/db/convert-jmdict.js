const { StringDecoder } = require('node:string_decoder')
const jlptData = require('./jlpt.json')

const decoder = new StringDecoder('utf8')

async function main() {
  let originalJmdict = ''

  for await (const chunk of process.stdin) {
    originalJmdict += decoder.write(chunk)
  }

  const data = JSON.parse(originalJmdict)

  const csv = data.words.reduce((csv, word) => {
    const id = word.id
    const kanji = word.kanji.map((kanji) => kanji.text)
    const kana = word.kana.map((kana) => kana.text)
    const glosses = word.sense.map((sense) =>
      sense.gloss.map((gloss) => gloss.text)
    )
    const info = { kanji, kana, meaning: glosses }
    const jlptEntry = jlptData.find((item) => item.id === Number(id))
    const jlpt = jlptEntry ? jlptEntry.jlpt : ''
    return csv.concat(`${id}\t${JSON.stringify(info)}\t${jlpt}\n`)
  }, 'id\tinfo\tjlpt\n')

  process.stdout.write(csv)
}

main()
