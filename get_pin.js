const https = require('https');
const url = 'https://pin.it/6PTG0ftme';

https.get(url, (res) => {
    if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        https.get(res.headers.location, (res2) => {
            let data = '';
            res2.on('data', chunk => data += chunk);
            res2.on('end', () => {
                const match = data.match(/<meta\s+property="og:image"\s+content="([^"]+)"/i) || data.match(/<meta\s+name="og:image"\s+content="([^"]+)"/i);
                console.log(match ? match[1] : 'Not found');
            });
        });
    }
});
