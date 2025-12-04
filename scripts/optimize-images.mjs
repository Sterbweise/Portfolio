// Script to optimize images for web
import sharp from 'sharp';
import { existsSync } from 'fs';

const publicDir = 'd:/Repos/Website/Portfolio/public';
const imgDir = `${publicDir}/img`;

async function optimizeImages() {
    console.log('🖼️  Optimizing images...');

    // Optimize profile image
    const profileSrc = `${imgDir}/profile.jpg`;
    const profileWebp = `${imgDir}/profile.webp`;

    console.log(`Checking: ${profileSrc}`);

    if (existsSync(profileSrc)) {
        console.log('Found profile.jpg, converting...');
        await sharp(profileSrc)
            .resize(400, 400, { fit: 'cover' })
            .webp({ quality: 85 })
            .toFile(profileWebp);
        console.log('✅ Created profile.webp');
    } else {
        console.log('❌ profile.jpg not found');
    }

    // Create optimized versions of logo images
    const logoDirs = ['black', 'white'];
    for (const dir of logoDirs) {
        const logoDir = `${imgDir}/logo/${dir}`;
        if (existsSync(logoDir)) {
            const logos = ['astrumia', 'ausy', 'fives', 'michelin'];
            for (const logo of logos) {
                const suffix = dir === 'black' ? 'bk' : 'wt';
                const src = `${logoDir}/${logo}-${suffix}.png`;
                const dest = `${logoDir}/${logo}-${suffix}.webp`;
                if (existsSync(src)) {
                    await sharp(src)
                        .resize(120, 60, { fit: 'inside', withoutEnlargement: true })
                        .webp({ quality: 85 })
                        .toFile(dest);
                    console.log(`✅ Created ${logo}-${suffix}.webp`);
                }
            }
        }
    }

    console.log('🎉 Image optimization complete!');
}

optimizeImages().catch(console.error);
