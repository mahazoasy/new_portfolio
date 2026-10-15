import pngToIco from 'png-to-ico';
import { writeFileSync } from 'fs';

const buf = await pngToIco('fav32.png');
writeFileSync('app/favicon.ico', buf);
console.log('✅ favicon.ico créé');