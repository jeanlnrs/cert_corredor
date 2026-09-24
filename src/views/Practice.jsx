import { useCallback, useEffect, useMemo, useState } from 'react';
import { ALL_QUESTIONS, TOPICS, TOPIC_BY_ID } from '../data/index.js';
import { useProgress } from '../lib/progress.jsx';
import { pct, shuffle } from '../lib/utils.js';
import QuestionCard from '../components/QuestionCard.jsx';
import Icon from '../components/Icon.jsx';
import Ring from '../components/Ring.jsx';

const FILTERS = [
  { id: 'all', label: 'Todas' },
  { id: 'new', label: 'No vistas' },
  { id: 'wrong', label: 'Falladas' },
  { id: 'calc', label: 'Solo cálculo' },
];
const COUNTS = [10, 20, 40, 0];

export default function Practice({ topicId, go }) {
  const [session, setSession] = useState(null);
  if (session) return <PracticeSession questions={session} onExit={() => setSession(null)} onRestart={setSession} go={go} />;
  return <Setup initialTopic={topicId} onStart={setSession} />;
}

function Setup({ initialTopic, onStart }) {
  const { state } = useProgress();
  const [topics, setTopics] = useState(() => (initialTopic && TOPIC_BY_ID[initialTopic] ? [initialTopic] : []));
  const [filter, setFilter] = useState('all');
  const [count, setCount] = useState(20);

  const pool = useMemo(() => {
    let qs = topics.length ? ALL_QUESTIONS.filter((q) => topics.includes(q.topic)) : ALL_QUESTIONS;
    if (filter === 'new') qs = qs.filter((q) => !state.q[q.id]);
    if (filter === 'wrong') qs = qs.filter((q) => state.q[q.id]?.last === false);
    if (filter === 'calc') qs = qs.filter((q) => q.calc);
    return qs;
  }, [topics, filter, state.q]);

  const toggle = (id) => setTopics((t) => (t.includes(id) ? t.filter((x) => x !== id) : [...t, id]));
  const start = () => {
    const picked = shuffle(pool);
    onStart(count ? picked.slice(0, count) : picked);
  };

  return (
    <div className="container">
      <div className="page-head">
        <div>
          <h1>Práctica guiada</h1>
          <p>Responde y recibe la explicación al instante, con la fuente (artículo o acuerdo) de cada respuesta.</p>
        </div>
      </div>

      <div className="card">
        <h3>1. Elige las secciones</h3>
        <p className="small muted">Sin selección = todo el temario.</p>
        <div className="row mt" style={{ gap: 8 }}>
          <button className={`chip ${topics.length === 0 ? 'selected' : ''}`} onClick={() => setTopics([])}>Todo el temario</button>
          {TOPICS.map((t) => {
            const n = ALL_QUESTIONS.filter((q) => q.topic === t.id).length;
            return (
              <button key={t.id} className={`chip ${topics.includes(t.id) ? 'selected' : ''}`} onClick={() => toggle(t.id)}>
                {t.letter} · {t.short} <span style={{ opacity: 0.7 }}>({n})</span>
              </button>
            );
          })}
        </div>

        <h3 className="mt-lg">2. Filtra</h3>
        <div className="row mt" style={{ gap: 8 }}>
          {FILTERS.map((f) => (
            <button key={f.id} className={`chip ${filter === f.id ? 'selected' : ''}`} onClick={() => setFilter(f.id)}>{f.label}</button>
          ))}
        </div>

        <h3 className="mt-lg">3. Cantidad</h3>
        <div className="row mt" style={{ gap: 8 }}>
          {COUNTS.map((c) => (
            <button key={c} className={`chip ${count === c ? 'selected' : ''}`} onClick={() => setCount(c)}>{c || 'Todas'}</button>
          ))}
        </div>

        <div className="row between mt-lg">
          <span className="muted small">{pool.length} preguntas disponibles con estos filtros</span>
          <button className="btn primary" disabled={!pool.length} onClick={start}>
            <Icon name="play" /> Empezar ({count ? Math.min(count, pool.length) : pool.length})
          </button>
        </div>
      </div>

      <p className="tiny faint mt">
        Atajos: <span className="kbd">A</span>–<span className="kbd">E</span> o <span className="kbd">1</span>–<span className="kbd">5</span> para responder, <span className="kbd">Enter</span> para continuar.
      </p>
    </div>
  );
}

export function PracticeSession({ questions, onExit, onRestart, go }) {
  const { state, recordAnswer, toggleFlag } = useProgress();
  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState({});
  const [done, setDone] = useState(false);
  const q = questions[i];
  const selected = answers[q?.id];
  const revealed = selected != null;

  const choose = useCallback(
    (opt) => {
      if (!q || answers[q.id] != null) return;
      setAnswers((a) => ({ ...a, [q.id]: opt }));
      recordAnswer(q.id, opt === q.a);
    },
    [q, answers, recordAnswer],
  );

  const next = useCallback(() => {
    if (i < questions.length - 1) setI(i + 1);
    else setDone(true);
  }, [i, questions.length]);

  useEffect(() => {
    if (done) return undefined;
    const onKey = (e) => {
      if (e.target.tagName === 'INPUT') return;
      const k = e.key.toLowerCase();
      const idx = '12345'.indexOf(k) >= 0 ? '12345'.indexOf(k) : 'abcde'.indexOf(k);
      if (idx >= 0 && idx < q.o.length && !revealed) choose(idx);
      else if (k === 'enter' && revealed) next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [q, revealed, choose, next, done]);

  // Con llaves: en Chrome reciente scrollTo devuelve una Promise y React la trataría como limpieza.
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [i]);

  const answeredCount = Object.keys(answers).length;
  const correctCount = questions.filter((x) => answers[x.id] === x.a).length;

  if (done) {
    const wrong = questions.filter((x) => answers[x.id] != null && answers[x.id] !== x.a);
    const ratio = answeredCount ? correctCount / answeredCount : 0;
    return (
      <div className="container">
        <div className="card" style={{ textAlign: 'center' }}>
          <Ring value={ratio} size={140} color={ratio >= 0.7 ? 'var(--success)' : 'var(--danger)'} sub={`${correctCount} de ${answeredCount}`} />
          <h1 className="mt">{ratio >= 0.7 ? '¡Buen trabajo!' : 'Sigue practicando'}</h1>
          <p className="muted mt">
            {ratio >= 0.7 ? 'Superaste el 70% requerido para aprobar.' : 'Te falta para el 70%. Repasa las explicaciones de las que fallaste.'}
          </p>
          <div className="row mt-lg" style={{ justifyContent: 'center' }}>
            {wrong.length > 0 && (
              <button className="btn primary" onClick={() => onRestart(shuffle(wrong))}>
                <Icon name="refresh" /> Repetir las {wrong.length} falladas
              </button>
            )}
            <button className="btn" onClick={() => onRestart(shuffle(questions))}><Icon name="shuffle" /> Repetir todo</button>
            <button className="btn" onClick={onExit}>Nueva práctica</button>
            <button className="btn ghost" onClick={() => go('inicio')}>Ir al panel</button>
          </div>
        </div>

        {wrong.length > 0 && (
          <div className="stack mt">
            <h2>Repasa tus errores</h2>
            {wrong.map((x) => (
              <QuestionCard key={x.id} q={x} selected={answers[x.id]} reveal />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="container" style={{ maxWidth: 820 }}>
      <div className="row between" style={{ marginBottom: 14 }}>
        <button className="btn sm ghost" onClick={() => (answeredCount ? setDone(true) : onExit())}>
          <Icon name="x" /> {answeredCount ? 'Terminar' : 'Salir'}
        </button>
        <span className="small muted">
          {correctCount} correctas de {answeredCount} · {pct(correctCount, answeredCount)}%
        </span>
      </div>
      <div className="bar" style={{ marginBottom: 16 }}>
        <span style={{ width: `${((i + (revealed ? 1 : 0)) / questions.length) * 100}%` }} />
      </div>

      <QuestionCard
        q={q}
        index={i}
        total={questions.length}
        selected={selected}
        onSelect={choose}
        reveal={revealed}
        flagged={!!state.flags[q.id]}
        onFlag={() => toggleFlag(q.id)}
      />

      <div className="row between mt">
        <button className="btn" disabled={i === 0} onClick={() => setI(i - 1)}>
          <Icon name="arrowLeft" /> Anterior
        </button>
        {revealed ? (
          <button className="btn primary" onClick={next}>
            {i < questions.length - 1 ? 'Siguiente' : 'Ver resultado'} <Icon name="arrowRight" />
          </button>
        ) : (
          <button className="btn ghost" onClick={() => choose(-1)} title="Ver la respuesta sin contestar (cuenta como fallada)">
            No sé — ver respuesta
          </button>
        )}
      </div>
    </div>
  );
}
