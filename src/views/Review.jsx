import { useState } from 'react';
import { ALL_QUESTIONS, TOPIC_BY_ID } from '../data/index.js';
import { useProgress } from '../lib/progress.jsx';
import { shuffle } from '../lib/utils.js';
import QuestionCard from '../components/QuestionCard.jsx';
import Icon from '../components/Icon.jsx';
import { PracticeSession, usePracticeRun } from './Practice.jsx';

export default function Review({ go }) {
  const { state, toggleFlag } = useProgress();
  const [tab, setTab] = useState('wrong');
  const [run, start, stop] = usePracticeRun();

  if (run) return <PracticeSession key={run.id} questions={run.questions} onExit={stop} onRestart={start} go={go} />;

  const wrong = ALL_QUESTIONS.filter((q) => state.q[q.id]?.last === false);
  const flagged = ALL_QUESTIONS.filter((q) => state.flags[q.id]);
  const verify = ALL_QUESTIONS.filter((q) => q.verify);
  const list = { wrong, flagged, verify }[tab];

  return (
    <div className="container" style={{ maxWidth: 900 }}>
      <div className="page-head">
        <div>
          <h1>Mis errores y marcadas</h1>
          <p>Las preguntas que fallaste en tu último intento, las que marcaste y las que conviene confirmar con el texto oficial.</p>
        </div>
        {list.length > 0 && tab !== 'verify' && (
          <button className="btn primary" onClick={() => start(shuffle(list))}>
            <Icon name="play" /> Practicar estas {list.length}
          </button>
        )}
      </div>

      <div className="tabs">
        <button className={`tab ${tab === 'wrong' ? 'active' : ''}`} onClick={() => setTab('wrong')}>Falladas ({wrong.length})</button>
        <button className={`tab ${tab === 'flagged' ? 'active' : ''}`} onClick={() => setTab('flagged')}>Marcadas ({flagged.length})</button>
        <button className={`tab ${tab === 'verify' ? 'active' : ''}`} onClick={() => setTab('verify')}>Por verificar ({verify.length})</button>
      </div>

      {tab === 'verify' && (
        <div className="callout warn mt" style={{ marginBottom: 16 }}>
          <Icon name="alert" />
          <div>
            Estas respuestas dependen de normas que no están en tu carpeta (p. ej. Acuerdo 5-2004 de sociedades de inversión o el reglamento de pensiones)
            o de datos estadísticos. Son la mejor respuesta disponible, pero confírmalas en la web de la SMV antes del examen.
          </div>
        </div>
      )}

      {list.length === 0 ? (
        <div className="card empty">
          <Icon name="check" size={32} />
          <p className="mt">
            {tab === 'wrong' ? 'No tienes preguntas falladas pendientes. ¡Sigue así!' : 'No tienes preguntas marcadas. Usa el botón "Marcar" durante la práctica.'}
          </p>
        </div>
      ) : (
        <div className="stack">
          {list.map((q) => (
            <div key={q.id}>
              <div className="row between small faint" style={{ marginBottom: 6 }}>
                <span>{TOPIC_BY_ID[q.topic]?.title}</span>
                {state.q[q.id] && <span>Intentos: {state.q[q.id].n} · aciertos: {state.q[q.id].c}</span>}
              </div>
              <QuestionCard q={q} reveal selected={null} flagged={!!state.flags[q.id]} onFlag={() => toggleFlag(q.id)} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
