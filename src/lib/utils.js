export const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Toma `count` preguntas repartidas de forma proporcional entre temas.
export function sampleBalanced(questions, count) {
  const byTopic = {};
  for (const q of questions) (byTopic[q.topic] ||= []).push(q);
  const topics = Object.keys(byTopic);
  const picked = [];
  const pools = Object.fromEntries(topics.map((t) => [t, shuffle(byTopic[t])]));
  for (const t of topics) {
    const share = Math.round((byTopic[t].length / questions.length) * count);
    picked.push(...pools[t].splice(0, Math.max(1, share)));
  }
  const rest = shuffle(topics.flatMap((t) => pools[t]));
  while (picked.length < count && rest.length) picked.push(rest.pop());
  return shuffle(picked).slice(0, count);
}

export const pct = (n, d) => (d ? Math.round((n / d) * 100) : 0);

export function fmtTime(sec) {
  const s = Math.max(0, Math.floor(sec));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const r = s % 60;
  const mm = String(m).padStart(2, '0');
  const ss = String(r).padStart(2, '0');
  return h ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
}

export const todayKey = (d = new Date()) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

export function fmtDate(ts) {
  return new Date(ts).toLocaleDateString('es-PA', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
}

export const money = (n, dec = 2) =>
  Number.isFinite(n) ? n.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec }) : '—';

export const perc = (n, dec = 2) => (Number.isFinite(n) ? `${(n * 100).toFixed(dec)}%` : '—');
