import Icon from './Icon.jsx';

const CALLOUT_ICON = { key: 'key', tip: 'bulb', warn: 'alert' };

export default function Blocks({ blocks }) {
  return (
    <div className="lesson">
      {blocks.map((b, i) => {
        switch (b.type) {
          case 'p':
            return <p key={i}>{b.text}</p>;
          case 'list':
            return (
              <ul key={i}>
                {b.items.map((it, j) => <li key={j}>{it}</li>)}
              </ul>
            );
          case 'steps':
            return (
              <div key={i} className="stack">
                {b.title && <h3>{b.title}</h3>}
                <ol className="steps">
                  {b.items.map((it, j) => <li key={j}>{it}</li>)}
                </ol>
              </div>
            );
          case 'table':
            return (
              <div key={i} className="table-wrap">
                <table>
                  <thead>
                    <tr>{b.head.map((h) => <th key={h}>{h}</th>)}</tr>
                  </thead>
                  <tbody>
                    {b.rows.map((r, j) => (
                      <tr key={j}>{r.map((c, k) => <td key={k}>{k === 0 ? <strong>{c}</strong> : c}</td>)}</tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case 'formula':
            return (
              <div key={i} className="formula">
                <div className="tiny muted" style={{ fontWeight: 650, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{b.name}</div>
                <div className="expr">{b.expr}</div>
                {b.note && <div className="small muted">{b.note}</div>}
              </div>
            );
          case 'callout':
            return (
              <div key={i} className={`callout ${b.tone}`}>
                <Icon name={CALLOUT_ICON[b.tone] || 'info'} />
                <div>{b.text}</div>
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
