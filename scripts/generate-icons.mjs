import sharp from 'sharp';
import { readFileSync, copyFileSync } from 'fs';

const svg = readFileSync('icon-source.svg');

await sharp(svg).resize(512, 512).png().toFile('app/icon.png');
await sharp(svg).resize(180, 180).png().toFile('app/apple-icon.png');
await sharp(svg).resize(32, 32).png().toFile('fav32.png');

// Copie le SVG aussi dans app/
copyFileSync('icon-source.svg', 'app/icon.svg');

console.log('✅ icon.png (512x512) créé');
console.log('✅ apple-icon.png (180x180) créé');
console.log('✅ fav32.png (32x32) créé');
console.log('✅ icon.svg copié dans app/');
console.log('');
console.log('⚠️  Il reste à créer favicon.ico depuis fav32.png');