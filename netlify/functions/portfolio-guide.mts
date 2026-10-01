import type { Config } from '@netlify/functions';

export function answerQuestion(message: string) {
  if (/r[eé]sum[eé]|\bcv\b/i.test(message)) return 'You can request Harshana’s current résumé by emailing jothiharshana188@gmail.com with the subject “Résumé request”. The portfolio does not offer a PDF download at present.';
  if (/price|cost|rate|contract|axiom|commission/i.test(message)) return 'For business automation services, scope and pricing, visit https://axiomlabs.my/. Axiom Labs is Harshana’s business. The service catalogue distinguishes concepts from live work, and project scope is agreed directly with him.';
  if (/obiter|legal|transcri/i.test(message)) return 'OBITER is a legal transcription pilot. A person reviews the draft and checks quoted material against the recording. Unclear passages stay flagged. Explore the project at https://obiter.my/ or ask Harshana about it by email.';
  if (/market|campaign|design|video/i.test(message)) return 'The Digital Marketing view shows selected Cream of Creams campaign work, JungleWalla media and visual concepts. Open a project to read Harshana’s contribution and inspect the work. Performance figures are not presented as independently verified results.';
  if (/ai|automat|n8n|workflow|tech/i.test(message)) return 'The AI & Automation view introduces Axiom Labs, the OBITER pilot and a front-desk prototype. Workflow diagrams are labelled demonstrations. Human checks, missing information and handover are part of the approach.';
  if (/contact|email|hire|job|avail|whatsapp/i.test(message)) return 'Contact Harshana directly at jothiharshana188@gmail.com or https://wa.me/601129649143. Ask him about current availability, a role or a project. This guide cannot make commitments on his behalf.';
  if (/where|location|based/i.test(message)) return 'Harshana is based in Kuala Lumpur, Malaysia.';
  return 'I am a portfolio guide with prepared answers, not a live AI assistant. I can help with marketing work, automation projects, Axiom Labs, OBITER, contact details or requesting a résumé. For a more specific question, email Harshana at jothiharshana188@gmail.com.';
}
export default async (req: Request) => {
  const headers = { 'Cache-Control': 'no-store', 'Content-Type': 'application/json; charset=utf-8' };
  if (req.method !== 'POST') return new Response(JSON.stringify({ error: 'Use POST.' }), { status: 405, headers: { ...headers, Allow: 'POST' } });
  if (!req.headers.get('content-type')?.includes('application/json')) return new Response(JSON.stringify({ error: 'JSON required.' }), { status: 415, headers });
  try {
    const body = await req.text();
    if (body.length > 2048) return new Response(JSON.stringify({ error: 'Question too long.' }), { status: 413, headers });
    const { message } = JSON.parse(body);
    if (typeof message !== 'string' || !message.trim() || message.length > 500) return new Response(JSON.stringify({ error: 'Enter a question of 1 to 500 characters.' }), { status: 400, headers });
    return new Response(JSON.stringify({ answer: answerQuestion(message), mode: 'prepared-answers' }), { headers });
  } catch { return new Response(JSON.stringify({ error: 'Invalid JSON.' }), { status: 400, headers }); }
};
export const config: Config = { path: '/api/portfolio-guide' };
