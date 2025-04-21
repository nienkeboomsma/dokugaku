import getHost from './getHost'

export async function queryWorkProcessor(
  endpoint: 'knownWords' | 'searchCorpus',
  body: {}
) {
  const host = getHost()
  const port = process.env.NEXT_PUBLIC_WORK_PROCESSOR_PORT

  const res = await fetch(`http://${host}:${port}/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    // TODO: userId should be supplied via env variable and set in an auth header
    body: JSON.stringify({
      userId: '6e41e9fd-c813-40e9-91fd-c51e47efab42',
      ...body,
    }),
  })

  return res.json()
}
