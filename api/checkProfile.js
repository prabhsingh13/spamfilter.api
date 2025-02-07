export default async function handler(req, res) {
    const allowedOrigin = 'https://pscheapsmm.com';
    const requestOrigin = req.headers.origin || req.headers.referer;

    if (!requestOrigin || !requestOrigin.startsWith(allowedOrigin)) {
        return res.status(403).json({ error: 'Access Denied' });
    }

    // ✅ CORS Headers Allowing Only `pscheapsmm.com`
    res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // ✅ Handle OPTIONS Request (CORS Preflight)
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // ✅ Only Allow GET Method
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

    for (let i = 0; i < apiKeys.length; i++) {
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': apiKeys[i],
                    'x-rapidapi-host': 'instagram-scraper-api2.p.rapidapi.com',
                }
            });

            if (response.status === 429) continue; // Try next key if rate limited

            if (!response.ok) continue; // Skip to next key if request fails

            const data = await response.json();
            return res.status(200).json(data); // ✅ Success Response
        } catch (error) {
            console.error(`❌ API Key ${i + 1} failed: ${error.message}`);
        }
    }

    return res.status(500).json({ error: 'All API keys failed' });
}
