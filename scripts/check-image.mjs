import sharp from 'sharp';

const metadata = await sharp('public/img/profile.jpg').metadata();
console.log(`Original dimensions: ${metadata.width}x${metadata.height}`);
console.log(`Format: ${metadata.format}`);
console.log(`Space: ${metadata.space}`);
