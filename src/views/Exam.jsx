import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ALL_QUESTIONS, EXAM_PRESETS, PASS_MARK, TOPIC_BY_ID } from '../data/index.js';
import { useProgress } from '../lib/progress.jsx';
import { LETTERS, answerIndexFromKey, fmtDate, fmtTime, isShortcutToIgnore, pct, sampleBalanced } from '../lib/utils.js';
import QuestionCard from '../components/QuestionCard.jsx';
import Icon from '../components/Icon.jsx';
import Ring from '../components/Ring.jsx';

export default function Exam({ go }) {
  const [run, setRun] = useState(null); // { preset, questions, minutes }
  const [result, setResult] = useState(null);

  if (result) return <Results result={result} onBack={() => setResult(null)} go={go} />;
  if (run)
    return (
      <ExamSession
        run={run}
        onCancel={() => setRun(null)}
        onFinish={(r) => {
          setRun(null);
          setResult(r);
        }}
      />
    );
  return <ExamHome onStart={setRun} />;
}

function ExamHome({ onStart }) {
  const { state } = useProgress();
  const [count, setCount] = useState(60);
  const [minutes, setMinutes] = useState(90);
  const history = [...state.exams].reverse();

  return (
    <div className="container">
      <div className="page-head">
        <div>
          <h1>Simulador de examen</h1>
          <p>Condiciones reales: tiempo límite, sin ver respuestas hasta entregar y aprobación con 70%.</p>
        </div>
      </div>

      <div className="grid grid-3">
        {EXAM_PRESETS.map((p) => (
          <div key={p.id} className="card stack">
            <div className="row" style={{ gap: 10 }}>
              <span className="badge-letter" style={{ background: p.id === 'legal' ? '#0f766e' : p.id === 'financiero' ? '#3b82f6' : '#7c3aed' }}>
                <Icon name={p.id === 'simulacro' ? 'shuffle' : 'list'} size={18} />
              </span>
              <h3>{p.title}</h3>
            </div>
            <p className="small muted" style={{ flex: 1 }}>{p.desc}</p>
            {p.configurable ? (
              <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div className="field">
                  <label htmlFor="sim-count">Preguntas</label>
                  <select id="sim-count" className="input" value={count} onChange={(e) => setCount(Number(e.target.value))}>
                    {[25, 40, 60, 100].map((n) => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="sim-minutes">Minutos</label>
                  <select id="sim-minutes" className="input" value={minutes} onChange={(e) => setMinutes(Number(e.target.value))}>
                    {[30, 45, 60, 90, 120, 150].map((n) => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
              </div>
            ) : (
              <span className="chip"><Icon name="clock" size={13} /> {p.minutes} minutos · {p.build().length} preguntas</span>
            )}
            <button
              className="btn primary"
              onClick={() =>
                onStart(
                  p.configurable
                    ? { preset: p, questions: sampleBalanced(ALL_QUESTIONS, count), minutes }
                    : { preset: p, questions: p.build(), minutes: p.minutes },
                )
              }
            >
              <Icon name="play" /> Comenzar
            </button>
          </div>
        ))}
      </div>

      <div className="card mt-lg">
        <h2>Historial</h2>
        {history.length === 0 ? (
          <p className="muted small mt">Todavía no hay simulacros registrados.</p>
        ) : (
          <div className="table-wrap mt">
            <table>
              <thead>
                <tr><th>Fecha</th><th>Examen</th><th>Puntaje</th><th>Tiempo</th><th>Resultado</th></tr>
              </thead>
              <tbody>
                {history.map((e) => (
                  <tr key={e.id}>
                    <td>{fmtDate(e.date)}</td>
                    <td>{e.title}</td>
                    <td>{e.score}/{e.total} ({e.pct}%)</td>
                    <td>{fmtTime(e.durationSec)}</td>
                    <td><span className={`chip ${e.pct >= PASS_MARK * 100 ? 'success' : 'danger'}`}>{e.pct >= PASS_MARK * 100 ? 'Aprobado' : 'No aprobado'}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function ExamSession({ run, onCancel, onFinish }) {
  const { recordAnswer, recordExam } = useProgress();
  const { questions, minutes, preset } = run;
  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState({});
  const [flags, setFlags] = useState({});
  const [confirm, setConfirm] = useState(false);
  const [startedAt] = useState(() => Date.now());
  const [now, setNow] = useState(() => Date.now());
  const remaining = minutes * 60 - (now - startedAt) / 1000;
  const q = questions[i];
  const finished = useRef(false);

  const submit = useCallback(() => {
    if (finished.current) return;
    finished.current = true;
    const byTopic = {};
    let score = 0;
    for (const x of questions) {
      const ok = answers[x.id] === x.a;
      if (ok) score++;
      if (answers[x.id] != null) recordAnswer(x.id, ok);
      const t = (byTopic[x.topic] ||= { c: 0, t: 0 });
      t.t++;
      if (ok) t.c++;
    }
    const exam = {
      id: `${Date.now()}`,
      kind: preset.id,
      title: preset.id === 'simulacro' ? `Simulacro mixto (${questions.length})` : preset.title.replace('Examen de Práctica — ', 'Práctica '),
      score,
      total: questions.length,
      pct: pct(score, questions.length),
      date: Date.now(),
      durationSec: Math.round((Date.now() - startedAt) / 1000),
      byTopic,
    };
    recordExam(exam);
    onFinish({ exam, questions, answers });
  }, [questions, answers, preset, startedAt, recordAnswer, recordExam, onFinish]);

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (remaining <= 0) submit();
  }, [remaining, submit]);

  useEffect(() => {
    const onKey = (e) => {
      if (confirm) {
        if (e.key === 'Escape') setConfirm(false);
        return;
      }
      if (isShortcutToIgnore(e)) return;
      const idx = answerIndexFromKey(e.key);
      if (idx >= 0 && idx < q.o.length) setAnswers((a) => ({ ...a, [q.id]: idx }));
      const k = e.key.toLowerCase();
      if (idx >= 0) return;
      if (k === 'arrowright') setI((v) => Math.min(v + 1, questions.length - 1));
      else if (k === 'arrowleft') setI((v) => Math.max(v - 1, 0));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [q, questions.length, confirm]);

  // Con llaves: en Chrome reciente scrollTo devuelve una Promise y React la trataría como limpieza.
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [i]);

  const answered = Object.keys(answers).length;
  const unanswered = questions.length - answered;

  return (
    <div className="container">
      <div className="exam-layout">
        <div>
          <QuestionCard
            q={q}
            index={i}
            total={questions.length}
            selected={answers[q.id]}
            onSelect={(opt) => setAnswers((a) => ({ ...a, [q.id]: opt }))}
            flagged={!!flags[q.id]}
            onFlag={() => setFlags((f) => ({ ...f, [q.id]: !f[q.id] }))}
          />
          <div className="row between mt">
            <button className="btn" disabled={i === 0} onClick={() => setI(i - 1)}><Icon name="arrowLeft" /> Anterior</button>
            {i < questions.length - 1 ? (
              <button className="btn primary" onClick={() => setI(i + 1)}>Siguiente <Icon name="arrowRight" /></button>
            ) : (
              <button className="btn primary" onClick={() => setConfirm(true)}>Entregar examen <Icon name="check" /></button>
            )}
          </div>
          <p className="tiny faint mt">Atajos: <span className="kbd">A</span>–<span className="kbd">E</span> responder · <span className="kbd">←</span> <span className="kbd">→</span> navegar</p>
        </div>

        <div className="card exam-side stack">
          <div className="row between">
            <span className="small muted">Tiempo restante</span>
            <span className={`timer ${remaining < 300 ? 'low' : ''}`}>{fmtTime(remaining)}</span>
          </div>
          <div className="bar"><span style={{ width: `${(answered / questions.length) * 100}%` }} /></div>
          <span className="small muted">{answered} respondidas · {unanswered} sin responder · {Object.values(flags).filter(Boolean).length} marcadas</span>
          <div className="q-grid">
            {questions.map((x, k) => (
              <button
                key={x.id}
                className={`q-dot ${answers[x.id] != null ? 'answered' : ''} ${k === i ? 'current' : ''} ${flags[x.id] ? 'flagged' : ''}`}
                onClick={() => setI(k)}
                aria-label={`Pregunta ${k + 1}`}
              >
                {k + 1}
              </button>
            ))}
          </div>
          <button className="btn primary" onClick={() => setConfirm(true)}>Entregar examen</button>
          <button className="btn ghost danger sm" onClick={onCancel}>Abandonar (no se guarda)</button>
        </div>
      </div>

      {confirm && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-title"
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.45)', display: 'grid', placeItems: 'center', zIndex: 50, padding: 16 }}
          onClick={() => setConfirm(false)}
        >
          <div className="card" style={{ maxWidth: 420, width: '100%' }} onClick={(e) => e.stopPropagation()}>
            <h2 id="confirm-title">¿Entregar el examen?</h2>
            <p className="muted mt">
              {unanswered > 0 ? `Tienes ${unanswered} preguntas sin responder; contarán como incorrectas.` : 'Respondiste todas las preguntas.'}
            </p>
            <div className="row mt-lg" style={{ justifyContent: 'flex-end' }}>
              {/* eslint-disable-next-line jsx-a11y/no-autofocus -- foco inicial del diálogo */}
              <button className="btn" autoFocus onClick={() => setConfirm(false)}>Seguir revisando</button>
              <button className="btn primary" onClick={submit}>Entregar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Results({ result, onBack, go }) {
  const { exam, questions, answers } = result;
  const [filter, setFilter] = useState('wrong');
  const passed = exam.pct >= PASS_MARK * 100;
  const topics = useMemo(
    () =>
      Object.entries(exam.byTopic)
        .map(([id, v]) => ({ topic: TOPIC_BY_ID[id], c: v.c, n: v.t }))
        .sort((a, b) => a.c / a.n - b.c / b.n),
    [exam],
  );
  const list = questions.filter((q) => (filter === 'all' ? true : answers[q.id] !== q.a));

  return (
    <div className="container">
      <div className="card">
        <div className="row" style={{ gap: 28, alignItems: 'center' }}>
          <Ring value={exam.pct / 100} size={150} stroke={13} color={passed ? 'var(--success)' : 'var(--danger)'} sub={`${exam.score} de ${exam.total}`} />
          <div className="stack" style={{ flex: 1, minWidth: 240 }}>
            <span className={`chip ${passed ? 'success' : 'danger'}`} style={{ alignSelf: 'flex-start' }}>
              <Icon name={passed ? 'trophy' : 'alert'} size={13} /> {passed ? 'Aprobado' : 'No aprobado'} (mínimo 70%)
            </span>
            <h1>{exam.title}</h1>
            <p className="muted">
              Tiempo usado: {fmtTime(exam.durationSec)}.{' '}
              {passed ? 'Excelente. Repite con otro simulacro para consolidar.' : `Te faltaron ${Math.ceil(exam.total * PASS_MARK) - exam.score} respuestas correctas para aprobar.`}
            </p>
            <div className="row">
              <button className="btn primary" onClick={onBack}><Icon name="refresh" /> Otro simulacro</button>
              <button className="btn" onClick={() => go('repaso')}>Ir a mis errores</button>
            </div>
          </div>
        </div>
      </div>

      <div className="card mt">
        <h2>Resultado por sección</h2>
        <div className="stack mt">
          {topics.map(({ topic, c, n }) => {
            const p = pct(c, n);
            return (
              <div key={topic.id} className="row" style={{ gap: 12, flexWrap: 'nowrap' }}>
                <span className="badge-letter" style={{ background: topic.color, width: 28, height: 28, borderRadius: 8, fontSize: '0.78rem' }}>{topic.letter}</span>
                <span style={{ flex: 1, minWidth: 0 }}>
                  <span className="row between small">
                    <span style={{ fontWeight: 600 }}>{topic.short}</span>
                    <span className="faint">{c}/{n} · {p}%</span>
                  </span>
                  <span className="bar" style={{ display: 'block', marginTop: 4 }}>
                    <span style={{ width: `${p}%`, background: p >= 70 ? 'var(--success)' : 'var(--danger)' }} />
                  </span>
                </span>
                <button className="btn sm ghost" onClick={() => go('estudiar', topic.id)}>Estudiar</button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="row between mt-lg" style={{ marginBottom: 12 }}>
        <h2>Revisión</h2>
        <div className="tabs" style={{ margin: 0 }}>
          <button className={`tab ${filter === 'wrong' ? 'active' : ''}`} onClick={() => setFilter('wrong')}>Incorrectas</button>
          <button className={`tab ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>Todas</button>
        </div>
      </div>
      <div className="stack">
        {list.length === 0 && <div className="card empty">¡Sin errores! 🎉</div>}
        {list.map((q) => (
          <div key={q.id}>
            <div className="small faint" style={{ marginBottom: 6 }}>
              #{questions.indexOf(q) + 1} · Tu respuesta: {answers[q.id] == null ? 'sin responder' : LETTERS[answers[q.id]]}
            </div>
            <QuestionCard q={q} selected={answers[q.id]} reveal />
          </div>
        ))}
      </div>
    </div>
  );
}
