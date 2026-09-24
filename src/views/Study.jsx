import { useEffect } from 'react';
import { TOPICS, TOPIC_BY_ID, questionsForTopic, FLASHCARDS } from '../data/index.js';
import { mastery, useProgress } from '../lib/progress.jsx';
import Blocks from '../components/Blocks.jsx';
import Icon from '../components/Icon.jsx';

export default function Study({ topicId, lessonIdx, go }) {
  if (!topicId || !TOPIC_BY_ID[topicId]) return <TopicList go={go} />;
  return <TopicView topic={TOPIC_BY_ID[topicId]} lessonIdx={Number(lessonIdx) || 0} go={go} />;
}

function TopicList({ go }) {
  const { state } = useProgress();
  return (
    <div className="container">
      <div className="page-head">
        <div>
          <h1>Temario de estudio</h1>
          <p>Las 12 secciones del Examen General Básico, resumidas a partir de tu material.</p>
        </div>
      </div>
      <div className="grid grid-3">
        {TOPICS.map((t) => {
          const read = t.lessons.filter((_, i) => state.lessons[`${t.id}:${i}`]).length;
          const m = mastery(state, questionsForTopic(t.id));
          return (
            <button key={t.id} className="card topic-card" onClick={() => go('estudiar', t.id)}>
              <div className="row" style={{ gap: 12, flexWrap: 'nowrap' }}>
                <span className="badge-letter" style={{ background: t.color }}>{t.letter}</span>
                <h3>{t.title}</h3>
              </div>
              <p className="desc">{t.summary}</p>
              <div className="row between tiny muted">
                <span>{read}/{t.lessons.length} lecciones</span>
                <span>{m.total} preguntas · {Math.round(m.ratio * 100)}% dominio</span>
              </div>
              <div className="bar"><span style={{ width: `${(read / t.lessons.length) * 100}%`, background: t.color }} /></div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function TopicView({ topic, lessonIdx, go }) {
  const { state, markLesson } = useProgress();
  const lesson = topic.lessons[lessonIdx] || topic.lessons[0];
  const idx = topic.lessons.indexOf(lesson);
  const key = `${topic.id}:${idx}`;
  const done = !!state.lessons[key];
  const qCount = questionsForTopic(topic.id).length;
  const cardCount = FLASHCARDS.filter((c) => c.topic === topic.id).length;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [topic.id, idx]);

  const next = () => {
    markLesson(key, true);
    if (idx < topic.lessons.length - 1) go('estudiar', topic.id, idx + 1);
  };

  return (
    <div className="container">
      <button className="btn sm ghost" onClick={() => go('estudiar')} style={{ marginBottom: 12 }}>
        <Icon name="arrowLeft" /> Temario
      </button>
      <div className="page-head">
        <div className="row" style={{ gap: 14, flexWrap: 'nowrap', alignItems: 'center' }}>
          <span className="badge-letter" style={{ background: topic.color, width: 48, height: 48, fontSize: '1.2rem' }}>{topic.letter}</span>
          <div>
            <h1>{topic.title}</h1>
            <p>{topic.summary}</p>
          </div>
        </div>
      </div>

      <div className="exam-layout">
        <div className="card">
          <div className="row between" style={{ marginBottom: 16 }}>
            <div>
              <span className="tiny faint" style={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Lección {idx + 1} de {topic.lessons.length}
              </span>
              <h2 style={{ marginTop: 2 }}>{lesson.title}</h2>
            </div>
            {lesson.general && (
              <span className="chip warn" title="El material de la carpeta no desarrolla este tema; son notas generales de apoyo.">
                Nota general complementaria
              </span>
            )}
          </div>
          <Blocks blocks={lesson.blocks} />
          <div className="row between mt-lg">
            <button className="btn" disabled={idx === 0} onClick={() => go('estudiar', topic.id, idx - 1)}>
              <Icon name="arrowLeft" /> Anterior
            </button>
            {idx < topic.lessons.length - 1 ? (
              <button className="btn primary" onClick={next}>
                Marcar leída y seguir <Icon name="arrowRight" />
              </button>
            ) : (
              <button className="btn primary" onClick={() => { markLesson(key, true); go('practicar', topic.id); }}>
                Terminar y practicar <Icon name="play" />
              </button>
            )}
          </div>
        </div>

        <div className="stack exam-side">
          <div className="card">
            <h3>Lecciones</h3>
            <div className="stack mt" style={{ gap: 4 }}>
              {topic.lessons.map((l, i) => {
                const read = state.lessons[`${topic.id}:${i}`];
                return (
                  <button
                    key={i}
                    className={`nav-item ${i === idx ? 'active' : ''}`}
                    onClick={() => go('estudiar', topic.id, i)}
                  >
                    <span style={{ width: 20, display: 'grid', placeItems: 'center', color: read ? 'var(--success)' : 'var(--faint)' }}>
                      {read ? <Icon name="check" size={16} /> : <span className="tiny">{i + 1}</span>}
                    </span>
                    <span className="small">{l.title}</span>
                  </button>
                );
              })}
            </div>
            {done && <p className="tiny faint mt">Esta lección está marcada como leída.</p>}
          </div>
          <div className="card">
            <h3>Pon a prueba lo aprendido</h3>
            <div className="stack mt">
              <button className="btn primary" onClick={() => go('practicar', topic.id)}>
                <Icon name="target" /> Practicar {qCount} preguntas
              </button>
              {cardCount > 0 && (
                <button className="btn" onClick={() => go('tarjetas', topic.id)}>
                  <Icon name="cards" /> {cardCount} tarjetas de memoria
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
