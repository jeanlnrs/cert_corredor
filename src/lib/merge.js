// Combina dos copias del progreso (este navegador y la nube) sin perder avance de ninguna.
export function mergeProgress(a, b) {
  if (!b) return a;
  if (!a) return b;

  // Preguntas: gana el intento más reciente; los contadores conservan el mayor.
  const q = { ...a.q };
  for (const [id, r] of Object.entries(b.q || {})) {
    const l = q[id];
    if (!l) q[id] = r;
    else {
      const newer = (r.t ?? 0) > (l.t ?? 0) ? r : l;
      q[id] = { ...newer, n: Math.max(l.n, r.n), c: Math.max(l.c, r.c) };
    }
  }

  // Tarjetas: gana la calificación más reciente (`u`); si no hay fecha, la caja más alta.
  const cards = { ...a.cards };
  for (const [id, r] of Object.entries(b.cards || {})) {
    const l = cards[id];
    if (!l) cards[id] = r;
    else if ((r.u ?? 0) !== (l.u ?? 0)) cards[id] = (r.u ?? 0) > (l.u ?? 0) ? r : l;
    else cards[id] = r.box > l.box ? r : l;
  }

  const lessons = { ...a.lessons };
  for (const [k, v] of Object.entries(b.lessons || {})) lessons[k] = lessons[k] || v;

  const byId = new Map([...(a.exams || []), ...(b.exams || [])].map((e) => [e.id, e]));
  const exams = [...byId.values()].sort((x, y) => x.date - y.date).slice(-100);

  const days = [...new Set([...(a.days || []), ...(b.days || [])])].sort().slice(-400);
  const flags = { ...(b.flags || {}), ...(a.flags || {}) };

  return { ...a, q, cards, lessons, exams, days, flags };
}
