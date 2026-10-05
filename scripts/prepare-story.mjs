import fs from 'node:fs/promises';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import sharp from 'sharp';
import ffmpeg from 'ffmpeg-static';

const out = 'portfolio-public/media';
const exists = async p => fs.access(p).then(() => true, () => false);
function encode(args) {
  const r = spawnSync(ffmpeg, ['-hide_banner', '-loglevel', 'error', ...args], { encoding: 'utf8' });
  if (r.status !== 0) throw new Error(r.stderr);
}
async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  return (await Promise.all(entries.map(e => e.isDirectory() ? walk(path.join(dir,e.name)) : path.join(dir,e.name)))).flat();
}
const sources = [...(await walk('public/images')).sort(),...(await walk('public/Visionary')).sort()].filter(p => /\.(mp4|png|jpe?g|webp)$/i.test(p));
const media = [];
for (const [i, source] of sources.entries()) {
  const video = /\.mp4$/i.test(source);
  const id = `archive-${String(i).padStart(2,'0')}`;
  const group = source.includes('cream') ? 'Cream of Creams' : source.includes('jungle') ? 'JungleWalla' : source.includes('pserv') ? 'PServ' : source.includes('certis') ? 'Certis' : source.includes('Visionary') ? 'Visual concepts' : 'Personal & design';
  const title = `${group} / ${video ? 'Film' : 'Image'} ${media.filter(x => x.group === group && x.type === (video ? 'video' : 'image')).length + 1}`;
  const poster = `${out}/${id}.webp`;
  if (video) {
    if (!await exists(`${out}/${id}.mp4`)) encode(['-i',source,'-vf',"scale=w='min(720,iw)':h=-2",'-c:v','libx264','-crf','29','-preset','fast','-c:a','aac','-b:a','80k','-movflags','+faststart','-y',`${out}/${id}.mp4`]);
    if (!await exists(poster)) {
      encode(['-ss','0.3','-i',source,'-frames:v','1','-vf','scale=480:-2','-y',`${out}/${id}.jpg`]);
      await sharp(`${out}/${id}.jpg`).webp({quality:78}).toFile(poster);
      await fs.unlink(`${out}/${id}.jpg`);
    }
  } else if (!await exists(poster)) await sharp(source,{limitInputPixels:false}).rotate().resize({width:1200,height:1600,fit:'inside',withoutEnlargement:true}).webp({quality:80}).toFile(poster);
  media.push({id,group,title,type:video?'video':'image',poster:`/media/${id}.webp`,src:`/media/${id}.${video?'mp4':'webp'}`});
}
// Owner's media revision: preserve stable archive identifiers and film numbering.
const removedIndex=media.findIndex(item=>item.title==='Cream of Creams / Film 1');
if(removedIndex>=0){const [removed]=media.splice(removedIndex,1);await fs.rm('portfolio-public'+removed.src,{force:true});await fs.rm('portfolio-public'+removed.poster,{force:true});}
await fs.cp('public/video-updates',out,{recursive:true});
for(let i=4;i>=1;i--)media.unshift({id:'desaru-'+i,group:'JungleWalla Desaru',title:["Coastal wildlife, up close.","A day outdoors in Desaru.","Along the Lebam River.","Among the mangroves."][i-1],type:'video',poster:'/media/desaru-'+i+'.webp',src:'/media/desaru-'+i+'.mp4'});
for(let i=media.length-1;i>=0;i--)if(media[i].group==='Cream of Creams'&&media[i].type==='image')media.splice(i,1);
for(const [i,name] of ['cream-social','cream-festive','cheesecake','cream-ai'].entries())media.push({id:'cream-approved-'+i,group:'Cream of Creams',title:['Festive cheesecake batter creative','Biscoff cheesecake creative','Rose pistachio cheesecake','Sopapilla cheesecake'][i],type:'image',poster:'/media/'+name+'-960.webp',src:'/media/'+name+'-960.webp'});
await fs.writeFile(`${out}/archive.json`, JSON.stringify(media));
// Keep the original portrait framing. The desktop reel is three portrait edits alongside one another.
const clips = ['public/images/journey/cream-of-creams/videos/cream-new-1.mp4','public/images/journey/junglewalla/videos/Jungle-video1.mp4','public/images/journey/cream-of-creams/videos/Cream-video2.mp4'];
if (!await exists(`${out}/showreel.mp4`)) {
  const inputs = clips.flatMap(p => ['-stream_loop','-1','-i',p]);
  encode([...inputs,'-filter_complex','[0:v]scale=360:640:force_original_aspect_ratio=increase,crop=360:640,setsar=1,fps=24[a];[1:v]scale=360:640:force_original_aspect_ratio=increase,crop=360:640,setsar=1,fps=24[b];[2:v]scale=360:640:force_original_aspect_ratio=increase,crop=360:640,setsar=1,fps=24[c];[a][b][c]hstack=inputs=3[v]','-map','[v]','-t','12','-an','-c:v','libx264','-crf','27','-preset','fast','-movflags','+faststart','-y',`${out}/showreel.mp4`]);
  encode(['-i',`${out}/showreel.mp4`,'-frames:v','1','-y',`${out}/showreel.jpg`]);
}
if (!await exists(`${out}/showreel-phone.mp4`)) {
  const inputs = clips.flatMap(p => ['-i',p]);
  const filter = clips.map((_,i) => `[${i}:v]trim=duration=4,setpts=PTS-STARTPTS,scale=360:640:force_original_aspect_ratio=increase,crop=360:640,setsar=1,fps=24[v${i}]`).join(';')+';[v0][v1][v2]concat=n=3:v=1:a=0[v]';
  encode([...inputs,'-filter_complex',filter,'-map','[v]','-an','-c:v','libx264','-crf','27','-preset','fast','-movflags','+faststart','-y',`${out}/showreel-phone.mp4`]);
  encode(['-i',`${out}/showreel-phone.mp4`,'-frames:v','1','-y',`${out}/showreel-phone.jpg`]);
}
let intro = await fs.readFile('terminal-boot-source.html','utf8');
intro = intro.replace(/<button[^>]*data-mode="brutal"[\s\S]*?<\/button>/g,'')
  .replaceAll('PROFESSIONAL MODE','AI &amp; AUTOMATION').replaceAll('CREATIVE MODE','DIGITAL MARKETING')
  .replaceAll('Traditional CV, HR-friendly, corporate ready','Workflows, prototypes and Axiom Labs')
  .replaceAll('Interactive portfolio, full experience','Content strategy, design and video')
  .replaceAll('Redirecting to Creative Mode','Opening Digital Marketing')
  .replaceAll('modeInput.focus();','')
  .replaceAll(' autocomplete="off" autofocus',' autocomplete="off"')
  .replace('`LOADING ${mode.toUpperCase()} MODE...`', "`LOADING ${mode === 'professional' ? 'AI & AUTOMATION' : 'DIGITAL MARKETING'}...`")
  .replace(/window\.location\.href = url;/g, `const discipline = mode === 'professional' ? 'ai' : 'marketing';
    if (window.parent !== window) window.parent.postMessage({type:'portfolio-intro-complete',mode:discipline},location.origin);
    else location.href = (discipline === 'ai' ? '/ai/' : '/') + '?skipIntro=1';`)
  .replace(/function selectMode\(mode, url\) \{/, "function selectMode(mode, url) { if(mode === 'brutal' || window.introSelecting) return; window.introSelecting = true;")
  .replace(/function startAutoSelect\(\) \{/, "function startAutoSelect() { clearInterval(autoSelectTimer); autoSelectHint.firstChild.textContent = 'Opening ' + (new URLSearchParams(location.search).get('mode') === 'ai' ? 'AI & AUTOMATION' : 'DIGITAL MARKETING') + ' in ';")
  .replace(/\/\/ Keep input focused[\s\S]*?<\/script>/, '</script>')
  .replace('setTimeout(runBootSequence, 500);', "if (matchMedia('(prefers-reduced-motion: reduce)').matches) showModeSelector(); else setTimeout(runBootSequence, 500);")
  .replace(/id="mode-input"/g,'aria-label="Choose 1 for AI and automation or 2 for digital marketing" id="mode-input"')
  .replace(/selectMode\('creative', '\.\/creative\/index.html'\);/, "selectMode(new URLSearchParams(location.search).get('mode') === 'ai' ? 'professional' : 'creative', '/');");
intro = intro.replace('</head>', '<style>@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important;transition:none!important}} .skip-hint{display:none!important}</style></head>');
await fs.mkdir('portfolio-public/intro',{recursive:true});
await fs.writeFile('portfolio-public/intro/index.html', intro);
console.log(`Preserved ${media.filter(x=>x.type==='video').length} videos and ${media.filter(x=>x.type==='image').length} images; compiled portrait and triptych reels; restored original intro.`);

await fs.cp('public/selected-films','portfolio-public/selected-films',{recursive:true});

