import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const RAW_DIR = path.resolve('public/images/raw');
const OUT_DIR = path.resolve('public/images');

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

async function processImage({ inputPath, outputPath, targetWidth, crop, initialQuality = 78 }) {
  let quality = initialQuality;
  let buffer;
  let finalWidth;
  let finalHeight;

  while (quality >= 20) {
    let pipeline = sharp(inputPath);
    if (crop) {
      pipeline = pipeline.extract(crop);
    }
    if (targetWidth) {
      pipeline = pipeline.resize(targetWidth);
    }

    // Strip metadata and convert to WebP
    pipeline = pipeline.webp({ quality, effort: 6 });
    buffer = await pipeline.toBuffer();

    const meta = await sharp(buffer).metadata();
    finalWidth = meta.width;
    finalHeight = meta.height;

    if (buffer.length <= 300 * 1024) {
      break;
    }
    quality -= 5;
  }

  await fs.promises.writeFile(outputPath, buffer);
  const sizeKb = (buffer.length / 1024).toFixed(2);
  console.log(`✓ ${path.basename(outputPath)}: ${finalWidth}x${finalHeight}px, ${sizeKb} KB (quality: ${quality})`);
  return { path: outputPath, width: finalWidth, height: finalHeight, sizeKb };
}

async function run() {
  console.log('--- Processing Images for AYUSHA SPA ---');

  // 1. Dual-Tone Liquid Glass Waves
  const dualTonePath = path.join(RAW_DIR, 'Dual-Tone_Liquid_Glass_Waves.png');
  const dualMeta = await sharp(dualTonePath).metadata();
  const seamY = 470;
  const trim = 6;
  const cropHeight = seamY - trim; // 464px

  // Top half = hero-bg-light.webp
  await processImage({
    inputPath: dualTonePath,
    outputPath: path.join(OUT_DIR, 'hero-bg-light.webp'),
    crop: { left: 0, top: 0, width: dualMeta.width, height: cropHeight },
    targetWidth: 2000,
  });

  // Bottom half = hero-bg-dark.webp
  await processImage({
    inputPath: dualTonePath,
    outputPath: path.join(OUT_DIR, 'hero-bg-dark.webp'),
    crop: { left: 0, top: seamY + trim, width: dualMeta.width, height: cropHeight },
    targetWidth: 2000,
  });

  // 2. Ethereal Aqua Aurora Waves -> waitlist-bg.webp
  await processImage({
    inputPath: path.join(RAW_DIR, 'Ethereal_Aqua_Aurora_Waves.png'),
    outputPath: path.join(OUT_DIR, 'waitlist-bg.webp'),
    targetWidth: 2000,
  });

  // 3. Frosted Glass Healthcare Shield Panel -> hero-passport.webp
  await processImage({
    inputPath: path.join(RAW_DIR, 'Frosted_Glass_Healthcare_Shield_Panel.png'),
    outputPath: path.join(OUT_DIR, 'hero-passport.webp'),
    targetWidth: 1400,
  });

  // 4. Futuristic Glassmorphic Health App -> how-phone.webp
  await processImage({
    inputPath: path.join(RAW_DIR, 'Futuristic_Glassmorphic_Health_App.png'),
    outputPath: path.join(OUT_DIR, 'how-phone.webp'),
    targetWidth: 1600,
  });

  // 5. Futuristic Path to a Glowing Earth -> roadmap-path.webp
  await processImage({
    inputPath: path.join(RAW_DIR, 'Futuristic_Path_to_a_Glowing_Earth.png'),
    outputPath: path.join(OUT_DIR, 'roadmap-path.webp'),
    targetWidth: 1600,
  });

  // 6. Glowing Cybersecurity Globe with Shield -> trust-network.webp
  await processImage({
    inputPath: path.join(RAW_DIR, 'Glowing_Cybersecurity_Globe_with_Shield.png'),
    outputPath: path.join(OUT_DIR, 'trust-network.webp'),
    targetWidth: 1600,
  });

  // 7. Split Globe Data Transfer -> problem-border.webp
  await processImage({
    inputPath: path.join(RAW_DIR, 'Split_Globe_Data_Transfer.png'),
    outputPath: path.join(OUT_DIR, 'problem-border.webp'),
    targetWidth: 1600,
  });

  console.log('--- All images processed successfully ---');
}

run().catch((err) => {
  console.error('Image processing failed:', err);
  process.exit(1);
});
