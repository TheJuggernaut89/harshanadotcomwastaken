import {spawnSync} from 'node:child_process';
import fs from 'node:fs/promises';
import ffmpeg from 'ffmpeg-static';
import sharp from 'sharp';
const files=['public/images/journey/cream-of-creams/videos/cream-new-1.mp4','public/images/journey/cream-of-creams/videos/Cream-video2.mp4','public/images/journey/junglewalla/videos/Jungle-video1.mp4','public/images/journey/junglewalla/videos/Jungle-video4.mp4','public/images/journey/cream-of-creams/videos/Cream-video4.mp4','public/images/journey/pserv-singapore/videos/Customer-video1.mp4'];
await fs.mkdir('review/video-check',{recursive:true});
const composites=[];
for(let i=0;i<files.length;i++){
 const out=`review/video-check/frame-${i}.jpg`;
 const r=spawnSync(ffmpeg,['-hide_banner','-loglevel','error','-ss','1','-i',files[i],'-frames:v','1','-vf','scale=480:270:force_original_aspect_ratio=decrease,pad=480:270:(ow-iw)/2:(oh-ih)/2','-y',out]);
 if(r.status!==0)throw Error(files[i]);
 composites.push({input:await sharp(out).toBuffer(),left:(i%3)*480,top:Math.floor(i/3)*270});
}
await sharp({create:{width:1440,height:540,channels:3,background:'#1a2626'}}).composite(composites).jpeg().toFile('review/video-check/contact.jpg');
console.log(files);
