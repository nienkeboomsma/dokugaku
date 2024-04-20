async function main() {
  let originalJmdict = ''
  for await (const chunk of process.stdin) originalJmdict += chunk.toString()
  const data = JSON.parse(originalJmdict)

  const csv = data.words.reduce((csv, word) => {
    const id = word.id
    const kanji = word.kanji.map((kanji) => kanji.text)
    const kana = word.kana.map((kana) => kana.text)
    const glosses = word.sense.map((sense) =>
      sense.gloss.map((gloss) => gloss.text)
    )
    const info = { kanji, kana, meaning: glosses }
    return csv.concat(`${id}\t${JSON.stringify(info)}\n`)
  }, 'id\tinfo\n')

  process.stdout.write(csv)
}

main()
