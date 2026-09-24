export const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

// Atajos de teclado: A–E o 1–5 eligen una opción. Devuelve -1 si la tecla no es de respuesta.
export function answerIndexFromKey(key) {
  if (!key || key.length !== 1) return -1;
  const k = key.toLowerCase();
  const byNumber = '12345'.indexOf(k);
  return byNumber >= 0 ? byNumber : 'abcde'.indexOf(k);
}

// No reaccionar a combinaciones como Ctrl+C / Cmd+A ni a teclas escritas en campos de texto.
export function isShortcutToIgnore(e) {
  if (e.ctrlKey || e.metaKey || e.altKey) return true;
  const tag = e.target?.tagName;
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || !!e.target?.isContentEditable;
}

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
