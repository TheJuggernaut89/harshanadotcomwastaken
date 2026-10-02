import fs from 'node:fs/promises';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import sharp from 'sharp';
import ffmpeg from 'ffmpeg-static';

const root = process.cwd();
const out = path.join(root, 'portfolio-public/media');
await fs.mkdir(out, { recursive: true });
const images = {
  cheesecake: 'public/Visionary/Viral Cheesecake Campaign.png',
  jungle: 'public/images/journey/junglewalla/images/Jungle-image1.jpg',
  portrait: 'public/portraits/harshana-with-cat.jpeg',
  'cream-social': 'public/images/journey/cream-of-creams/images/cream-2.png',
  'cream-ai': 'public/images/journey/cream-of-creams/images/cream-new-2.png',
};
for (const [name, source] of Object.entries(images)) {
  for (const width of [480, 960, 1440]) {
    await sharp(path.join(root, source)).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 80 }).toFile(path.join(out, `${name}-${width}.webp`));
  }
}
await sharp(path.join(root, images.cheesecake)).resize(1200, 630, { fit: 'contain', background: '#f5f3ec' }).jpeg({ quality: 85 }).toFile(path.join(out, 'share.jpg'));
const videos = {
  'cream-product': 'public/images/journey/cream-of-creams/videos/Cream-video1.mp4',
  'jungle-film': 'public/images/journey/junglewalla/videos/Jungle-video3.mp4',
};
for (const [name, source] of Object.entries(videos)) {
  const dest = path.join(out, `${name}.mp4`);
  try { await fs.access(dest); continue; } catch { /* First build encodes it. */ }
  const encoded = spawnSync(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-i', path.join(root, source), '-vf', "scale=w='min(960,iw)':h=-2", '-c:v', 'libx264', '-crf', '27', '-preset', 'fast', '-c:a', 'aac', '-b:a', '96k', '-movflags', '+faststart', '-y', dest], { encoding: 'utf8' });
  if (encoded.status !== 0) throw new Error(`Video encoding failed for ${name}: ${encoded.stderr}`);
}
const files = await fs.readdir(out);
const bytes = (await Promise.all(files.map(async file => (await fs.stat(path.join(out, file))).size))).reduce((a, b) => a + b, 0);
console.log(`Prepared ${files.length} optimised media files, ${(bytes / 1024 / 1024).toFixed(2)} MB total. Originals are excluded from deployment.`);
