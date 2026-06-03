const https = require('https');

const supabaseUrl = 'https://byujwlsvmahgyyjcssne.supabase.co';
const supabaseKey = 'sb_publishable_wkXJxy14f7R5M5VOHLl5hg_-eSL3Ecg';

function request(path) {
    return new Promise((resolve, reject) => {
        const url = `${supabaseUrl}/rest/v1/${path}?limit=1`;
        const options = {
            headers: {
                'apikey': supabaseKey,
                'Authorization': `Bearer ${supabaseKey}`
            }
        };
        https.get(url, options, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    resolve(data);
                }
            });
        }).on('error', reject);
    });
}

async function run() {
    try {
        console.log("Buscando momentos...");
        const m = await request('momentos');
        console.log("Momento:", m);

        console.log("\nBuscando textinhos...");
        const t = await request('textinhos');
        console.log("Textinho:", t);
    } catch (e) {
        console.error(e);
    }
}

run();
