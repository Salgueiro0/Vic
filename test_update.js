const https = require('https');

const supabaseUrl = 'https://byujwlsvmahgyyjcssne.supabase.co';
const supabaseKey = 'sb_publishable_wkXJxy14f7R5M5VOHLl5hg_-eSL3Ecg';

function patchRequest(path, id, body) {
    return new Promise((resolve, reject) => {
        const url = `${supabaseUrl}/rest/v1/${path}?id=eq.${id}`;
        const dataStr = JSON.stringify(body);
        
        const urlObj = new URL(url);
        const options = {
            hostname: urlObj.hostname,
            path: urlObj.pathname + urlObj.search,
            method: 'PATCH',
            headers: {
                'apikey': supabaseKey,
                'Authorization': `Bearer ${supabaseKey}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=representation', // This will return the updated rows!
                'Content-Length': Buffer.byteLength(dataStr)
            }
        };

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                resolve({
                    statusCode: res.statusCode,
                    headers: res.headers,
                    body: data
                });
            });
        });
        
        req.on('error', reject);
        req.write(dataStr);
        req.end();
    });
}

async function run() {
    try {
        console.log("Tentando atualizar textinho com id 3 para 1 curtida...");
        const result = await patchRequest('textinhos', 3, { curtidas: 1 });
        console.log("Status Code:", result.statusCode);
        console.log("Response Body:", result.body);
    } catch (e) {
        console.error(e);
    }
}

run();
