import { ALL_QUESTIONS, FLASHCARDS, PASS_MARK, TOPICS, questionsForTopic } from '../data/index.js';
import { mastery, streak, useProgress } from '../lib/progress.jsx';
import { fmtDate, pct } from '../lib/utils.js';
import Icon from '../components/Icon.jsx';
import Ring from '../components/Ring.jsx';

export default function Dashboard({ go }) {
  const { state } = useProgress();
  const overall = mastery(state, ALL_QUESTIONS);
  const answeredTotal = Object.values(state.q).reduce((s, r) => s + r.n, 0);
  const correctTotal = Object.values(state.q).reduce((s, r) => s + r.c, 0);
  const dueCards = FLASHCARDS.filter((c) => (state.cards[c.id]?.due ?? 0) <= Date.now()).length;
  const lastExams = [...state.exams].reverse().slice(0, 4);
  const avgExam = state.exams.length ? state.exams.reduce((s, e) => s + e.pct, 0) / state.exams.length : null;
  const wrongCount = Object.values(state.q).filter((r) => r.last === false).length;

  const topicStats = TOPICS.map((t) => ({ t, m: mastery(state, questionsForTopic(t.id)) }));
  const weakest = topicStats
    .filter((x) => x.m.total)
    .sort((a, b) => a.m.ratio - b.m.ratio)
    .slice(0, 3);

  // Preparación: 60% dominio del banco + 40% promedio de simulacros (si hay).
  const readiness = avgExam == null ? overall.ratio : overall.ratio * 0.6 + (avgExam / 100) * 0.4;

  return (
    <div className="container">
      <div className="card hero">
        <div className="row between" style={{ alignItems: 'center', gap: 24 }}>
          <div className="stack" style={{ maxWidth: 560 }}>
            <span className="tiny" style={{ fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.85 }}>
              Examen General Básico · SMV Panamá
            </span>
            <h1 style={{ color: '#fff' }}>Licencia de Corredor de Valores y Analista</h1>
            <p className="muted">
              12 secciones (A–L). Se aprueba con 70%. Estudia cada sección, practica con retroalimentación y mide tu avance con simulacros cronometrados.
            </p>
            <div className="row" style={{ marginTop: 6 }}>
              <button className="btn" onClick={() => go('practicar')}><Icon name="play" /> Practicar ahora</button>
              <button className="btn ghost" onClick={() => go('examen')}><Icon name="clock" /> Hacer un simulacro</button>
            </div>
          </div>
          <Ring
            value={readiness}
            size={150}
            stroke={13}
            color="#fff"
            label={`${Math.round(readiness * 100)}%`}
            sub={<span style={{ color: 'rgba(255,255,255,.85)' }}>preparación</span>}
          />
        </div>
      </div>

      <div className="grid grid-4 mt">
        <div className="card stat">
          <span className="v">{overall.answered}<span className="muted small"> / {overall.total}</span></span>
          <span className="l">Preguntas vistas</span>
        </div>
        <div className="card stat">
          <span className="v">{answeredTotal ? `${pct(correctTotal, answeredTotal)}%` : '—'}</span>
          <span className="l">Acierto histórico</span>
        </div>
        <div className="card stat">
          <span className="v row" style={{ gap: 6 }}>
            <Icon name="fire" size={22} /> {streak(state.days)}
          </span>
          <span className="l">Días seguidos estudiando</span>
        </div>
        <div className="card stat">
          <span className="v">{avgExam == null ? '—' : `${Math.round(avgExam)}%`}</span>
          <span className="l">Promedio de simulacros</span>
        </div>
      </div>

      <div className="grid grid-2 mt">
        <div className="card">
          <div className="row between">
            <h2>Avance por sección</h2>
            <button className="btn sm ghost" onClick={() => go('estudiar')}>Ver temario <Icon name="arrowRight" /></button>
          </div>
          <div className="stack mt">
            {topicStats.map(({ t, m }) => (
              <button
                key={t.id}
                className="row"
                onClick={() => go('estudiar', t.id)}
                style={{ border: 0, background: 'none', padding: 0, textAlign: 'left', gap: 12 }}
              >
                <span className="badge-letter" style={{ background: t.color, width: 30, height: 30, borderRadius: 8, fontSize: '0.8rem' }}>{t.letter}</span>
                <span style={{ flex: 1, minWidth: 0 }}>
                  <span className="row between small" style={{ gap: 6 }}>
                    <span style={{ fontWeight: 600 }}>{t.short}</span>
                    <span className="faint tiny">{m.correct}/{m.total}</span>
                  </span>
                  <span className="bar" style={{ display: 'block', marginTop: 5 }}>
                    <span style={{ width: `${m.ratio * 100}%`, background: t.color }} />
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="stack">
          <div className="card">
            <h2>Siguiente paso recomendado</h2>
            <div className="stack mt">
              {dueCards > 0 && (
                <button className="btn" style={{ justifyContent: 'space-between' }} onClick={() => go('tarjetas')}>
                  <span className="row"><Icon name="cards" /> Repasar {dueCards} tarjetas pendientes</span>
                  <Icon name="arrowRight" />
                </button>
              )}
              {wrongCount > 0 && (
                <button className="btn" style={{ justifyContent: 'space-between' }} onClick={() => go('repaso')}>
                  <span className="row"><Icon name="refresh" /> Corregir {wrongCount} preguntas falladas</span>
                  <Icon name="arrowRight" />
                </button>
              )}
              {weakest.map(({ t, m }) => (
                <button key={t.id} className="btn" style={{ justifyContent: 'space-between' }} onClick={() => go('practicar', t.id)}>
                  <span className="row">
                    <span className="badge-letter" style={{ background: t.color, width: 22, height: 22, borderRadius: 6, fontSize: '0.7rem' }}>{t.letter}</span>
                    Reforzar {t.short} ({Math.round(m.ratio * 100)}%)
                  </span>
                  <Icon name="arrowRight" />
                </button>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="row between">
              <h2>Últimos simulacros</h2>
              <button className="btn sm ghost" onClick={() => go('examen')}>Nuevo <Icon name="arrowRight" /></button>
            </div>
            {lastExams.length === 0 ? (
              <p className="muted small mt">Aún no has hecho simulacros. Cuando termines uno verás aquí tu puntaje.</p>
            ) : (
              <div className="stack mt">
                {lastExams.map((e) => (
                  <div key={e.id} className="row between small">
                    <span>
                      <strong>{e.title}</strong>
                      <span className="faint tiny" style={{ display: 'block' }}>{fmtDate(e.date)} · {e.score}/{e.total}</span>
                    </span>
                    <span className={`chip ${e.pct >= PASS_MARK * 100 ? 'success' : 'danger'}`}>{e.pct}%</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
