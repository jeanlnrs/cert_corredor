import { useCallback, useEffect, useMemo, useState } from 'react';
import { FLASHCARDS, TOPIC_BY_ID, TOPICS } from '../data/index.js';
import { useProgress } from '../lib/progress.jsx';
import { shuffle } from '../lib/utils.js';
import Icon from '../components/Icon.jsx';

const BOX_LABELS = ['Nueva', 'Aprendiendo', 'Repasando', 'Casi dominada', 'Dominada'];

export default function Flashcards({ topicId }) {
  const { state, rateCard } = useProgress();
  const [deck, setDeck] = useState(topicId && TOPIC_BY_ID[topicId] ? topicId : 'all');
  const [onlyDue, setOnlyDue] = useState(true);
  const [queue, setQueue] = useState([]);
  const [flipped, setFlipped] = useState(false);
  const [reviewed, setReviewed] = useState(0);

  const cards = useMemo(() => FLASHCARDS.filter((c) => deck === 'all' || c.topic === deck), [deck]);
  const dueCount = cards.filter((c) => (state.cards[c.id]?.due ?? 0) <= Date.now()).length;

  const build = useCallback(() => {
    const now = Date.now();
    const list = onlyDue ? cards.filter((c) => (state.cards[c.id]?.due ?? 0) <= now) : cards;
    setQueue(shuffle(list));
    setFlipped(false);
    setReviewed(0);
    // Solo se reconstruye al cambiar de mazo o filtro, no al calificar tarjetas.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards, onlyDue]);

  useEffect(build, [build]);

  const card = queue[0];

  const rate = useCallback(
    (knew) => {
      if (!card) return;
      rateCard(card.id, knew);
      setFlipped(false);
      setReviewed((n) => n + 1);
      // Si no la sabía, vuelve al final de la cola de esta sesión.
      setQueue((q) => (knew ? q.slice(1) : [...q.slice(1), q[0]]));
    },
    [card, rateCard],
  );

  useEffect(() => {
    const onKey = (e) => {
      if (!card) return;
      if (e.key === ' ') {
        e.preventDefault();
        setFlipped((f) => !f);
      } else if (flipped && e.key === '1') rate(false);
      else if (flipped && e.key === '2') rate(true);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [card, flipped, rate]);

  const boxes = [0, 1, 2, 3, 4].map((b) => cards.filter((c) => (state.cards[c.id]?.box ?? 0) === b).length);
  const topic = card && TOPIC_BY_ID[card.topic];

  return (
    <div className="container" style={{ maxWidth: 860 }}>
      <div className="page-head">
        <div>
          <h1>Tarjetas de memoria</h1>
          <p>Cifras, plazos y fórmulas clave con repetición espaciada: las que no sabes vuelven antes.</p>
        </div>
      </div>

      <div className="card">
        <div className="row between">
          <div className="row" style={{ gap: 8 }}>
            <select className="input" style={{ width: 'auto' }} value={deck} onChange={(e) => setDeck(e.target.value)}>
              <option value="all">Todos los temas ({FLASHCARDS.length})</option>
              {TOPICS.filter((t) => FLASHCARDS.some((c) => c.topic === t.id)).map((t) => (
                <option key={t.id} value={t.id}>
                  {t.letter} · {t.short} ({FLASHCARDS.filter((c) => c.topic === t.id).length})
                </option>
              ))}
            </select>
            <button className={`chip ${onlyDue ? 'selected' : ''}`} onClick={() => setOnlyDue(true)}>Pendientes ({dueCount})</button>
            <button className={`chip ${!onlyDue ? 'selected' : ''}`} onClick={() => setOnlyDue(false)}>Todas</button>
          </div>
          <span className="small muted">{reviewed} repasadas en esta sesión</span>
        </div>
        <div className="grid mt" style={{ gridTemplateColumns: 'repeat(5, 1fr)', gap: 8 }}>
          {boxes.map((n, b) => (
            <div key={b} style={{ textAlign: 'center' }}>
              <div style={{ fontWeight: 750, fontSize: '1.1rem' }}>{n}</div>
              <div className="tiny muted">{BOX_LABELS[b]}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-lg">
        {!card ? (
          <div className="card empty">
            <Icon name="check" size={32} />
            <h2 className="mt">¡Al día!</h2>
            <p className="mt">No tienes tarjetas pendientes en este mazo. Vuelve mañana o repasa todas.</p>
            <button className="btn primary mt" onClick={() => setOnlyDue(false)}>Repasar todas</button>
          </div>
        ) : (
          <>
            <div className={`flip ${flipped ? 'flipped' : ''}`}>
              <div className="flip-inner" onClick={() => setFlipped((f) => !f)}>
                <div className="flip-face">
                  {topic && <span className="chip" style={{ color: topic.color }}>{topic.letter} · {topic.short}</span>}
                  <div className="big">{card.front}</div>
                  <span className="tiny faint">Toca o presiona <span className="kbd">Espacio</span> para voltear</span>
                </div>
                <div className="flip-face back">
                  <span className="tiny faint">{card.front}</span>
                  <div className="ans">{card.back}</div>
                </div>
              </div>
            </div>
            <div className="row mt-lg" style={{ justifyContent: 'center' }}>
              {flipped ? (
                <>
                  <button className="btn" style={{ minWidth: 150, color: 'var(--danger)' }} onClick={() => rate(false)}>
                    <Icon name="refresh" /> Repasar <span className="kbd">1</span>
                  </button>
                  <button className="btn primary" style={{ minWidth: 150 }} onClick={() => rate(true)}>
                    <Icon name="check" /> Lo sabía <span className="kbd">2</span>
                  </button>
                </>
              ) : (
                <button className="btn primary" style={{ minWidth: 200 }} onClick={() => setFlipped(true)}>Mostrar respuesta</button>
              )}
            </div>
            <p className="tiny faint mt" style={{ textAlign: 'center' }}>{queue.length} tarjetas restantes en esta sesión</p>
          </>
        )}
      </div>
    </div>
  );
}
