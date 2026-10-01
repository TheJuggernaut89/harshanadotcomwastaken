import fs from 'node:fs/promises';
const root = 'https://harshanajothidotcomwastaken.netlify.app';
const html = await fs.readFile('dist/index.html', 'utf8');
await fs.mkdir('dist/ai', { recursive: true });
let ai = html.replaceAll('Harshana Jothi | Digital Marketing', 'Harshana Jothi | AI &amp; Automation')
  .replaceAll('Campaign design, video and content strategy by Harshana Jothi. Selected work, experience and direct contact in Kuala Lumpur.', 'Business automations, reviewed transcription workflows and prototypes by Harshana Jothi, founder of Axiom Labs in Kuala Lumpur.')
  .replaceAll(`${root}/"`, `${root}/ai/"`);
await fs.writeFile('dist/ai/index.html', ai);
await fs.writeFile('dist/robots.txt', `User-agent: *\nAllow: /\nSitemap: ${root}/sitemap.xml\n`);
await fs.writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${root}/</loc></url><url><loc>${root}/ai/</loc></url></urlset>`);
await fs.writeFile('dist/404.html', '<!doctype html><html lang="en"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Page not found | Harshana Jothi</title><body style="background:#f5f3ec;color:#252922;font:18px Arial;padding:10vw"><h1>This page has moved.</h1><p><a href="/">Digital Marketing</a> · <a href="/ai/">AI &amp; Automation</a></p><p><a href="mailto:jothiharshana188@gmail.com?subject=Resume%20request">Request my résumé by email</a></p></body></html>');
console.log('Built two directly linkable views with shared assets and correct metadata.');
