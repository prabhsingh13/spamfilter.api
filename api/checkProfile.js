export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { username } = req.query;
    if (!username) {
        return res.status(400).json({ error: 'Username is required' });
    }

    const apiKeys = [
        'b364a3b7bcmsh8682e33cffcf8b1p1bec05jsnfa78871c081a',
        '9a4048e1d9msh8136af2c691900ep147e73jsn07756c58537d'
    ];
    
    const url = `https://instagram-scraper-api2.p.rapidapi.com/v1/info?username_or_id_or_url=${username}`;

    for (let key of apiKeys) {
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': key,
                    'x-rapidapi-host': 'instagram-scraper-api2.p.rapidapi.com',
                }
            });

            if (response.status === 429) continue; // Try next key if rate limited

            if (!response.ok) throw new Error('API request failed');

            const data = await response.json();
            return res.status(200).json(data);
        } catch (error) {
            console.error(`API Key failed: ${error.message}`);
        }
    }

    res.status(500).json({ error: 'All API keys failed' });
}
