import { TOPIC_BY_ID } from '../data/index.js';
import { LETTERS } from '../lib/utils.js';
import Icon from './Icon.jsx';

// Muestra una pregunta. Si `reveal` es true, colorea la correcta y la elegida y muestra la explicación.
export default function QuestionCard({ q, index, total, selected, onSelect, reveal, flagged, onFlag }) {
  const topic = TOPIC_BY_ID[q.topic];
  const correct = selected === q.a;
  return (
    <div className="card">
      <div className="row between" style={{ marginBottom: 12 }}>
        <div className="row" style={{ gap: 8 }}>
          {total != null && <span className="chip">Pregunta {index + 1} de {total}</span>}
          {topic && (
            <span className="chip" style={{ color: topic.color }}>
              {topic.letter} · {topic.short}
            </span>
          )}
          {q.exam && <span className="chip">Examen {q.exam === 'legal' ? 'legal' : 'financiero'} #{q.num}</span>}
          {q.calc && <span className="chip primary">Cálculo</span>}
          {q.updated && <span className="chip warn" title="Ajustada a la norma vigente">Actualizada</span>}
        </div>
        {onFlag && (
          <button className={`btn sm ${flagged ? '' : 'ghost'}`} onClick={onFlag} title="Marcar para revisar" style={flagged ? { color: 'var(--warn)' } : undefined}>
            <Icon name="flag" /> {flagged ? 'Marcada' : 'Marcar'}
          </button>
        )}
      </div>

      <div className="q-text">{q.q}</div>

      <div className="options" role="radiogroup">
        {q.o.map((opt, i) => {
          let cls = 'option';
          if (reveal) {
            if (i === q.a) cls += ' correct';
            else if (i === selected) cls += ' wrong';
          } else if (i === selected) cls += ' selected';
          return (
            <button
              key={i}
              className={cls}
              role="radio"
              aria-checked={i === selected}
              disabled={reveal}
              onClick={() => onSelect?.(i)}
            >
              <span className="key">{LETTERS[i]}</span>
              <span>{opt}</span>
            </button>
          );
        })}
      </div>

      {reveal && (
        <div className={`explain ${selected == null ? '' : correct ? 'ok' : 'bad'}`}>
          <div className="title">
            <Icon name={correct ? 'check' : 'x'} size={18} />
            {selected == null ? `Respuesta correcta: ${LETTERS[q.a]}` : correct ? '¡Correcto!' : `Incorrecto — la respuesta es ${LETTERS[q.a]}`}
          </div>
          <div>{q.e}</div>
          <div className="row small faint" style={{ marginTop: 8 }}>
            {q.src && <span>Fuente: {q.src}</span>}
            {q.verify && (
              <span className="chip warn" title="La norma que la sustenta no está en tu carpeta de material">
                <Icon name="alert" size={12} /> Verificar con el texto oficial
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
