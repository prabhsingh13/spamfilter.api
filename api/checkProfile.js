export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'https://pscheapsmm.com')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'GET')
    return res.status(405).json({ error: 'Method Not Allowed' })

  const { username } = req.query
  if (!username) return res.status(400).json({ error: 'Username is required' })
  console.log(`Received request for username: ${username}`)

  const apiKeys = [process.env.RAPIDAPI_KEY_1, process.env.RAPIDAPI_KEY_2]

  const url = `https://mediafy-api.p.rapidapi.com/v1/info?username_or_id_or_url=${username}`
    for (const key of apiKeys) {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'x-rapidapi-key': key,
          'x-rapidapi-host': 'instagram-scraper-api2.p.rapidapi.com',
        },
      })

      if (response.status === 429) continue
      if (!response.ok) throw new Error('API request failed')

      const data = await response.json()
      return res.status(200).json(data)
    } catch (error) {
      console.error(`API Key failed: ${error.message}`)
    }
  }

  return res.status(500).json({ error: 'All API keys failed' })
}
