export default async function handler(req, res) {
    // ✅ CORS Headers Allowing Frontend Requests
    res.setHeader('Access-Control-Allow-Origin', '*'); // या 'https://pscheapsmm.com' सिर्फ उसी के लिए
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // ✅ OPTIONS Request का Handle (CORS Preflight)
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // ✅ केवल GET Method Allow करें
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
            console.log(`🔑 Trying API Key ${i + 1}...`);

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': apiKeys[i],
                    'x-rapidapi-host': 'instagram-scraper-api2.p.rapidapi.com',
                }
            });

            if (response.status === 429) {
                console.warn(`⚠️ API Key ${i + 1} rate limit exceeded! Trying next key...`);
                continue; // Next API Key Try करें
            }

            if (!response.ok) {
                console.error(`❌ API Key ${i + 1} failed: ${response.statusText}`);
                continue;
            }

            const data = await response.json();
            return res.status(200).json(data); // ✅ Success Response
        } catch (error) {
            console.error(`❌ API Key ${i + 1} failed: ${error.message}`);
        }
    }

    return res.status(500).json({ error: 'All API keys failed' });
}
