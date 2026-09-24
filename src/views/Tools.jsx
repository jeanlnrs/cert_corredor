import { useId, useMemo, useState } from 'react';
import { TOPICS } from '../data/index.js';
import { money, perc } from '../lib/utils.js';

const TABS = [
  { id: 'formulas', label: 'Hoja de fórmulas' },
  { id: 'bono', label: 'Bonos' },
  { id: 'tvm', label: 'Valor del dinero' },
  { id: 'cupon', label: 'Cupón corrido' },
  { id: 'opciones', label: 'Opciones' },
  { id: 'acciones', label: 'Acciones y convertibles' },
  { id: 'portafolio', label: 'Portafolio' },
  { id: 'capm', label: 'CAPM y Sharpe' },
  { id: 'fx', label: 'Divisas' },
];

export default function Tools() {
  const [tab, setTab] = useState('formulas');
  return (
    <div className="container">
      <div className="page-head">
        <div>
          <h1>Calculadoras</h1>
          <p>Resuelve los ejercicios del examen paso a paso y verifica tus cálculos manuales (en el examen solo se permite calculadora científica).</p>
        </div>
      </div>
      <div className="tabs">
        {TABS.map((t) => (
          <button key={t.id} className={`tab ${tab === t.id ? 'active' : ''}`} onClick={() => setTab(t.id)}>{t.label}</button>
        ))}
      </div>
      {tab === 'formulas' && <FormulaSheet />}
      {tab === 'bono' && <BondCalc />}
      {tab === 'tvm' && <TvmCalc />}
      {tab === 'cupon' && <AccruedCalc />}
      {tab === 'opciones' && <OptionCalc />}
      {tab === 'acciones' && <StockCalc />}
      {tab === 'portafolio' && <PortfolioCalc />}
      {tab === 'capm' && <CapmCalc />}
      {tab === 'fx' && <FxCalc />}
    </div>
  );
}

// Reúne todas las fórmulas de las lecciones en una sola hoja de consulta.
function FormulaSheet() {
  const groups = TOPICS.map((t) => ({
    t,
    items: t.lessons.flatMap((l) => l.blocks.filter((b) => b.type === 'formula')),
  })).filter((g) => g.items.length);
  return (
    <div className="grid grid-2">
      {groups.map(({ t, items }) => (
        <div key={t.id} className="card stack">
          <div className="row" style={{ gap: 10 }}>
            <span className="badge-letter" style={{ background: t.color, width: 28, height: 28, borderRadius: 8, fontSize: '0.78rem' }}>{t.letter}</span>
            <h3>{t.short}</h3>
          </div>
          {items.map((f) => (
            <div key={f.name} className="formula">
              <div className="tiny muted" style={{ fontWeight: 650 }}>{f.name}</div>
              <div className="expr">{f.expr}</div>
              {f.note && <div className="small muted">{f.note}</div>}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function Num({ label, value, onChange, step = 'any', suffix }) {
  const id = useId();
  return (
    <div className="field">
      <label htmlFor={id}>{label}{suffix ? ` (${suffix})` : ''}</label>
      <input id={id} className="input" type="number" inputMode="decimal" step={step} value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

// Muestra un aviso cuando los datos no permiten calcular (campos vacíos, ceros, negativos).
function Invalid({ children }) {
  return <div className="callout warn small"><div>{children}</div></div>;
}

const n = (v) => {
  const x = parseFloat(v);
  return Number.isFinite(x) ? x : NaN;
};

function Panel({ title, children, result, note }) {
  return (
    <div className="grid grid-2">
      <div className="card stack">
        <h3>{title}</h3>
        {children}
      </div>
      <div className="card stack">
        <h3>Resultado</h3>
        {result}
        {note && <div className="callout key small"><div>{note}</div></div>}
      </div>
    </div>
  );
}

function KV({ rows }) {
  return (
    <dl className="kv">
      {rows.map(([k, v]) => (
        <FragmentRow key={k} k={k} v={v} />
      ))}
    </dl>
  );
}
function FragmentRow({ k, v }) {
  return (
    <>
      <dt>{k}</dt>
      <dd>{v}</dd>
    </>
  );
}

/* ---------------- Bonos ---------------- */
function bondPrice(face, cRate, freq, years, y) {
  const periods = Math.round(years * freq);
  const c = (face * cRate) / freq;
  const r = y / freq;
  if (r === 0) return c * periods + face;
  return c * (1 - Math.pow(1 + r, -periods)) / r + face / Math.pow(1 + r, periods);
}
function solveYtm(face, cRate, freq, years, price) {
  let lo = -0.99, hi = 5;
  // Si el precio queda fuera del rango alcanzable, no hay una tasa razonable que lo explique.
  if (bondPrice(face, cRate, freq, years, hi) > price || bondPrice(face, cRate, freq, years, lo) < price) return NaN;
  for (let k = 0; k < 200; k++) {
    const mid = (lo + hi) / 2;
    if (bondPrice(face, cRate, freq, years, mid) > price) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}

function BondCalc() {
  const [face, setFace] = useState('1000');
  const [coupon, setCoupon] = useState('10');
  const [freq, setFreq] = useState('2');
  const [years, setYears] = useState('10');
  const [ytm, setYtm] = useState('12');
  const [pricePct, setPricePct] = useState('92');
  const [callPct, setCallPct] = useState('101');
  const [callYears, setCallYears] = useState('5');

  const F = n(face), C = n(coupon) / 100, f = n(freq), Y = n(years);
  // Datos mínimos para que las fórmulas tengan sentido.
  const baseOk = F > 0 && C >= 0 && f > 0 && Y > 0 && Math.round(Y * f) >= 1;
  const priceOk = baseOk && n(ytm) > -100;
  const price = priceOk ? bondPrice(F, C, f, Y, n(ytm) / 100) : NaN;
  const P = (n(pricePct) / 100) * F;
  const yieldsOk = baseOk && P > 0;
  const annualC = F * C;
  const cy = yieldsOk ? annualC / P : NaN;
  const ytmApprox = yieldsOk ? (annualC + (F - P) / Y) / ((F + P) / 2) : NaN;
  const ytmExact = yieldsOk ? solveYtm(F, C, f, Y, P) : NaN;
  const Pc = (n(callPct) / 100) * F;
  const callOk = yieldsOk && Pc > 0 && n(callYears) > 0;
  const ytc = callOk ? (annualC + (Pc - P) / n(callYears)) / ((Pc + P) / 2) : NaN;

  return (
    <div className="stack">
      <Panel
        title="Precio a partir del YTM"
        result={
          !priceOk ? (
            <Invalid>Ingresa un valor nominal y años mayores que cero, una tasa cupón no negativa y un YTM mayor que −100%.</Invalid>
          ) : <>
            <div className="result-box">
              <div className="small muted">Precio del bono</div>
              <div className="v">{money(price)}</div>
              <div className="small muted">{perc(price / F, 3)} del valor nominal · {price > F + 0.005 ? 'a PRIMA' : price < F - 0.005 ? 'a DESCUENTO' : 'a la PAR'}</div>
            </div>
            <KV rows={[
              ['Cupón por período', money((F * C) / f)],
              ['Períodos', Math.round(Y * f)],
              ['Tasa por período', perc(n(ytm) / 100 / f, 4)],
            ]} />
          </>
        }
        note="Precio = Σ Cupón/(1+r)^t + Nominal/(1+r)^n. Si YTM = cupón, el bono vale la par; si YTM > cupón, se vende con descuento."
      >
        <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <Num label="Valor nominal" value={face} onChange={setFace} />
          <Num label="Tasa cupón anual" suffix="%" value={coupon} onChange={setCoupon} />
          <div className="field">
            <label htmlFor="bond-freq">Pagos por año</label>
            <select id="bond-freq" className="input" value={freq} onChange={(e) => setFreq(e.target.value)}>
              <option value="1">Anual (1)</option>
              <option value="2">Semestral (2)</option>
              <option value="4">Trimestral (4)</option>
              <option value="12">Mensual (12)</option>
            </select>
          </div>
          <Num label="Años al vencimiento" value={years} onChange={setYears} />
          <Num label="YTM anual" suffix="%" value={ytm} onChange={setYtm} />
        </div>
      </Panel>

      <Panel
        title="Rendimientos a partir del precio"
        result={
          !yieldsOk ? (
            <Invalid>Ingresa un precio de compra mayor que cero (y los datos del bono en el bloque superior).</Invalid>
          ) : <KV rows={[
            ['Rendimiento nominal (NY)', perc(C)],
            ['Rendimiento corriente (CY)', perc(cy)],
            ['YTM aproximado (fórmula del curso)', perc(ytmApprox)],
            ['YTM exacto (nominal anual)', perc(ytmExact)],
            ['YTC aproximado (a la fecha de call)', perc(ytc)],
          ]} />
        }
        note="YTM ≈ [C + (N − P)/n] / [(N + P)/2]. YTC ≈ [C + (Pc − P)/n] / [(Pc + P)/2]. Usa los mismos datos de nominal, cupón, frecuencia y años del bloque superior."
      >
        <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <Num label="Precio de compra" suffix="% del nominal" value={pricePct} onChange={setPricePct} />
          <div />
          <Num label="Precio de call" suffix="%" value={callPct} onChange={setCallPct} />
          <Num label="Años hasta el call" value={callYears} onChange={setCallYears} />
        </div>
      </Panel>
    </div>
  );
}

/* ---------------- Valor del dinero ---------------- */
function TvmCalc() {
  const [solve, setSolve] = useState('vp');
  const [vp, setVp] = useState('1000');
  const [vf, setVf] = useState('1500');
  const [rate, setRate] = useState('8');
  const [periods, setPeriods] = useState('5');
  const i = n(rate) / 100, N = n(periods);

  let result, formula;
  if (solve === 'vp') { result = money(n(vf) / Math.pow(1 + i, N)); formula = 'VP = VF / (1 + i)^n'; }
  if (solve === 'vf') { result = money(n(vp) * Math.pow(1 + i, N)); formula = 'VF = VP × (1 + i)^n'; }
  if (solve === 'i') { result = perc(Math.pow(n(vf) / n(vp), 1 / N) - 1, 4); formula = 'i = (VF / VP)^(1/n) − 1'; }
  if (solve === 'n') {
    const periodsNeeded = Math.log(n(vf) / n(vp)) / Math.log(1 + i);
    result = Number.isFinite(periodsNeeded) && periodsNeeded >= 0 ? `${periodsNeeded.toFixed(3)} períodos` : '—';
    formula = 'n = ln(VF / VP) / ln(1 + i)';
  }

  return (
    <Panel
      title="Valor del dinero en el tiempo"
      result={
        <div className="result-box">
          <div className="small muted">{{ vp: 'Valor presente', vf: 'Valor futuro', i: 'Tasa por período', n: 'Número de períodos' }[solve]}</div>
          <div className="v">{result}</div>
          <div className="small muted" style={{ fontFamily: 'ui-monospace, Consolas, monospace' }}>{formula}</div>
        </div>
      }
      note="La tasa de descuento es el 'precio' del riesgo: a mayor tasa, menor valor presente."
    >
      <div className="tabs" style={{ marginBottom: 4 }}>
        {[['vp', 'Calcular VP'], ['vf', 'Calcular VF'], ['i', 'Calcular tasa'], ['n', 'Calcular n']].map(([id, l]) => (
          <button key={id} className={`tab ${solve === id ? 'active' : ''}`} onClick={() => setSolve(id)}>{l}</button>
        ))}
      </div>
      <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {solve !== 'vp' && <Num label="Valor presente (VP)" value={vp} onChange={setVp} />}
        {solve !== 'vf' && <Num label="Valor futuro (VF)" value={vf} onChange={setVf} />}
        {solve !== 'i' && <Num label="Tasa por período" suffix="%" value={rate} onChange={setRate} />}
        {solve !== 'n' && <Num label="Períodos (n)" value={periods} onChange={setPeriods} />}
      </div>
    </Panel>
  );
}

/* ---------------- Cupón corrido ---------------- */
function days30360(a, b) {
  const d1 = Math.min(a.getUTCDate(), 30);
  let d2 = b.getUTCDate();
  if (d2 === 31 && d1 === 30) d2 = 30;
  return 360 * (b.getUTCFullYear() - a.getUTCFullYear()) + 30 * (b.getUTCMonth() - a.getUTCMonth()) + (Math.min(d2, 30) - d1);
}
function AccruedCalc() {
  const [face, setFace] = useState('1000');
  const [rate, setRate] = useState('8');
  const [last, setLast] = useState('2021-12-31');
  const [settle, setSettle] = useState('2022-03-15');

  const rows = useMemo(() => {
    const a = new Date(`${last}T00:00:00Z`);
    const b = new Date(`${settle}T00:00:00Z`);
    if (Number.isNaN(a.getTime()) || Number.isNaN(b.getTime()) || b < a) return null;
    const actual = Math.round((b - a) / 86400000);
    const y = b.getUTCFullYear();
    const leap = (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
    const d30 = days30360(a, b);
    const F = n(face), r = n(rate) / 100;
    return [
      ['Actual/360', actual, 360, (F * r * actual) / 360],
      ['Actual/365', actual, 365, (F * r * actual) / 365],
      ['Actual/Actual', actual, leap ? 366 : 365, (F * r * actual) / (leap ? 366 : 365)],
      ['30/360', d30, 360, (F * r * d30) / 360],
    ];
  }, [face, rate, last, settle]);

  return (
    <Panel
      title="Cupón corrido (interés acumulado)"
      result={
        rows ? (
          <div className="table-wrap">
            <table>
              <thead><tr><th>Base</th><th>Días</th><th>Año</th><th>Cupón corrido</th></tr></thead>
              <tbody>
                {rows.map(([b, d, y, v]) => (
                  <tr key={b}><td><strong>{b}</strong></td><td>{d}</td><td>{y}</td><td>{money(v)}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : <p className="muted">Revisa las fechas: la de liquidación debe ser posterior al último cupón.</p>
      }
      note="Lo paga el comprador al vendedor por los días que éste mantuvo el bono sin cobrar el cupón. Ejemplo del curso: 8%, $1,000, del 31/12/2021 al 15/03/2022."
    >
      <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <Num label="Valor nominal" value={face} onChange={setFace} />
        <Num label="Tasa cupón anual" suffix="%" value={rate} onChange={setRate} />
        <div className="field"><label htmlFor="cc-last">Fecha del último cupón</label><input id="cc-last" className="input" type="date" value={last} onChange={(e) => setLast(e.target.value)} /></div>
        <div className="field"><label htmlFor="cc-settle">Fecha de liquidación</label><input id="cc-settle" className="input" type="date" value={settle} onChange={(e) => setSettle(e.target.value)} /></div>
      </div>
    </Panel>
  );
}

/* ---------------- Opciones ---------------- */
function OptionCalc() {
  const [type, setType] = useState('call');
  const [side, setSide] = useState('buy');
  const [strike, setStrike] = useState('100');
  const [premium, setPremium] = useState('5');
  const [spot, setSpot] = useState('110');

  const K = n(strike), Pm = n(premium), S = n(spot);
  const valid = K > 0 && Pm >= 0 && S >= 0;
  const intrinsic = (s) => (type === 'call' ? Math.max(s - K, 0) : Math.max(K - s, 0));
  const pnl = (s) => (side === 'buy' ? 1 : -1) * (intrinsic(s) - Pm);
  const be = type === 'call' ? K + Pm : K - Pm;
  const maxGain = side === 'buy' ? (type === 'call' ? 'Ilimitada' : money(K - Pm)) : money(Pm);
  const maxLoss = side === 'buy' ? money(Pm) : type === 'call' ? 'Ilimitada' : money(K - Pm);
  const moneyness = S === K ? 'At the money' : (type === 'call' ? S > K : S < K) ? 'In the money' : 'Out of the money';

  // Gráfico de ganancia/pérdida al vencimiento
  const W = 520, H = 230, pad = 34;
  const lo = Math.max(0, K * 0.5), hi = K * 1.5;
  const xs = Array.from({ length: 61 }, (_, k) => lo + ((hi - lo) * k) / 60);
  const ys = xs.map(pnl);
  const yMax = Math.max(...ys.map(Math.abs), Pm * 2, 1);
  const X = (s) => pad + ((s - lo) / (hi - lo)) * (W - 2 * pad);
  const Yp = (v) => H / 2 - (v / yMax) * (H / 2 - pad / 2);
  const path = xs.map((s, k) => `${k ? 'L' : 'M'}${X(s).toFixed(1)},${Yp(ys[k]).toFixed(1)}`).join(' ');

  return (
    <Panel
      title="Opción al vencimiento"
      result={
        !valid ? (
          <Invalid>Ingresa un precio de ejercicio mayor que cero, y una prima y un precio spot que no sean negativos.</Invalid>
        ) : <>
          <svg className="chart" viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-label="Gráfico de ganancia o pérdida">
            <line x1={pad} x2={W - pad} y1={H / 2} y2={H / 2} stroke="var(--border)" />
            <line x1={X(K)} x2={X(K)} y1={pad / 2} y2={H - pad / 2} stroke="var(--border)" strokeDasharray="4 4" />
            {be > lo && be < hi && <circle cx={X(be)} cy={H / 2} r="4" fill="var(--warn)" />}
            <path d={path} fill="none" stroke={side === 'buy' ? 'var(--primary)' : 'var(--danger)'} strokeWidth="2.5" />
            {S >= lo && S <= hi && <circle cx={X(S)} cy={Yp(pnl(S))} r="5" fill="var(--text)" />}
            <text x={X(K)} y={H - 4} textAnchor="middle">Strike {K}</text>
            <text x={pad} y={14}>Ganancia</text>
            <text x={pad} y={H - 18}>Pérdida</text>
          </svg>
          <KV rows={[
            ['Estado (moneyness)', moneyness],
            ['Valor intrínseco', money(intrinsic(S))],
            ['Resultado al precio spot', money(pnl(S))],
            ['Punto de equilibrio', money(be)],
            ['Ganancia máxima', maxGain],
            ['Pérdida máxima', maxLoss],
          ]} />
        </>
      }
      note="Call: equilibrio = strike + prima. Put: equilibrio = strike − prima. El comprador arriesga la prima; el vendedor gana como máximo la prima."
    >
      <div className="tabs" style={{ marginBottom: 0 }}>
        <button className={`tab ${type === 'call' ? 'active' : ''}`} onClick={() => setType('call')}>Call</button>
        <button className={`tab ${type === 'put' ? 'active' : ''}`} onClick={() => setType('put')}>Put</button>
        <button className={`tab ${side === 'buy' ? 'active' : ''}`} onClick={() => setSide('buy')}>Compra (larga)</button>
        <button className={`tab ${side === 'sell' ? 'active' : ''}`} onClick={() => setSide('sell')}>Venta (corta)</button>
      </div>
      <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <Num label="Precio de ejercicio (strike)" value={strike} onChange={setStrike} />
        <Num label="Prima" value={premium} onChange={setPremium} />
        <Num label="Precio spot al vencimiento" value={spot} onChange={setSpot} />
      </div>
    </Panel>
  );
}

/* ---------------- Acciones ---------------- */
function StockCalc() {
  const [shares, setShares] = useState('1000000');
  const [price, setPrice] = useState('50');
  const [ratioN, setRatioN] = useState('3');
  const [ratioM, setRatioM] = useState('2');
  const [conv, setConv] = useState('40');
  const [bondPct, setBondPct] = useState('102');
  const [stock, setStock] = useState('42');
  const [p0, setP0] = useState('100');
  const [p1, setP1] = useState('110');
  const [div, setDiv] = useState('5');
  const [eps, setEps] = useState('4');

  const factor = 1000 / n(conv);
  const parity = (n(bondPct) * 10) / factor;
  return (
    <div className="grid grid-2">
      <div className="card stack">
        <h3>Split / split inverso N:M</h3>
        <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <Num label="Acciones en circulación" value={shares} onChange={setShares} />
          <Num label="Precio actual" value={price} onChange={setPrice} />
          <Num label="N (nuevas)" value={ratioN} onChange={setRatioN} />
          <Num label="M (anteriores)" value={ratioM} onChange={setRatioM} />
        </div>
        {n(shares) > 0 && n(price) > 0 && n(ratioN) > 0 && n(ratioM) > 0 ? (
          <KV rows={[
            ['Nuevas acciones', money((n(shares) * n(ratioN)) / n(ratioM), 0)],
            ['Nuevo precio', money((n(price) * n(ratioM)) / n(ratioN))],
            ['Capitalización (no cambia)', money(n(shares) * n(price), 0)],
          ]} />
        ) : (
          <Invalid>Todos los valores del split deben ser mayores que cero.</Invalid>
        )}
      </div>
      <div className="card stack">
        <h3>Bono convertible</h3>
        <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <Num label="Precio de conversión" value={conv} onChange={setConv} />
          <Num label="Precio del bono" suffix="%" value={bondPct} onChange={setBondPct} />
          <Num label="Precio de la acción" value={stock} onChange={setStock} />
        </div>
        {n(conv) > 0 && n(bondPct) > 0 && n(stock) >= 0 ? (
          <KV rows={[
            ['Factor de conversión (nominal $1,000)', `${factor.toFixed(2)} acciones`],
            ['Precio de paridad de la acción', money(parity)],
            ['Valor de conversión', money(factor * n(stock))],
            ['¿Conviene convertir?', n(stock) > parity ? 'Sí: la acción vale más que la paridad' : 'No'],
          ]} />
        ) : (
          <Invalid>Ingresa un precio de conversión y un precio del bono mayores que cero.</Invalid>
        )}
      </div>
      <div className="card stack">
        <h3>Rentabilidad esperada</h3>
        <div className="grid" style={{ gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
          <Num label="Precio hoy (P₀)" value={p0} onChange={setP0} />
          <Num label="Precio esperado (P₁)" value={p1} onChange={setP1} />
          <Num label="Dividendo (D₁)" value={div} onChange={setDiv} />
        </div>
        <KV rows={[
          ['Rendimiento por dividendo', perc(n(div) / n(p0))],
          ['Variación en precio', perc((n(p1) - n(p0)) / n(p0))],
          ['Rentabilidad total', perc((n(div) + n(p1) - n(p0)) / n(p0))],
        ]} />
      </div>
      <div className="card stack">
        <h3>Razones bursátiles</h3>
        <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <Num label="Utilidad por acción (UPA)" value={eps} onChange={setEps} />
          <Num label="Precio de la acción" value={p0} onChange={setP0} />
        </div>
        <KV rows={[
          ['Relación P/U', `${(n(p0) / n(eps)).toFixed(2)} veces`],
          ['Rendimiento por utilidades (UPA/P)', perc(n(eps) / n(p0))],
          ['Rendimiento del dividendo', perc(n(div) / n(p0))],
          ['Payout (dividendo/UPA)', perc(n(div) / n(eps))],
        ]} />
      </div>
    </div>
  );
}

/* ---------------- Portafolio ---------------- */
function PortfolioCalc() {
  const [probs, setProbs] = useState(['25', '50', '25']);
  const [rets, setRets] = useState([['25', '40', '35'], ['15', '30', '20'], ['5', '10', '-5']]);
  const [weights, setWeights] = useState(['30', '50', '20']);
  const names = ['Boom', 'Estable', 'Recesión'];
  const assets = ['X', 'Y', 'Z'];

  const p = probs.map((v) => n(v) / 100);
  const w = weights.map((v) => n(v) / 100);
  const R = rets.map((row) => row.map((v) => n(v) / 100));
  const er = assets.map((_, a) => R.reduce((s, row, k) => s + p[k] * row[a], 0));
  const sd = assets.map((_, a) => Math.sqrt(R.reduce((s, row, k) => s + p[k] * (row[a] - er[a]) ** 2, 0)));
  const portScen = R.map((row) => row.reduce((s, v, a) => s + v * w[a], 0));
  const erp = portScen.reduce((s, v, k) => s + v * p[k], 0);
  const sdp = Math.sqrt(portScen.reduce((s, v, k) => s + p[k] * (v - erp) ** 2, 0));
  const weighted = sd.reduce((s, v, a) => s + v * w[a], 0);

  const setCell = (k, a, v) => setRets((r) => r.map((row, i) => (i === k ? row.map((c, j) => (j === a ? v : c)) : row)));

  return (
    <div className="grid grid-2">
      <div className="card stack">
        <h3>Escenarios (ejemplo del curso)</h3>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Escenario</th><th>Prob. %</th>{assets.map((a) => <th key={a}>{a} %</th>)}</tr></thead>
            <tbody>
              {names.map((nm, k) => (
                <tr key={nm}>
                  <td><strong>{nm}</strong></td>
                  <td><input className="input" type="number" aria-label={`Probabilidad escenario ${nm} (%)`} value={probs[k]} onChange={(e) => setProbs((ps) => ps.map((x, i) => (i === k ? e.target.value : x)))} /></td>
                  {assets.map((a, j) => (
                    <td key={a}><input className="input" type="number" aria-label={`Retorno de ${a} en ${nm} (%)`} value={rets[k][j]} onChange={(e) => setCell(k, j, e.target.value)} /></td>
                  ))}
                </tr>
              ))}
              <tr>
                <td><strong>Peso %</strong></td>
                <td className="faint small">{Math.round(p.reduce((a, b) => a + b, 0) * 100)}%</td>
                {assets.map((a, j) => (
                  <td key={a}><input className="input" type="number" aria-label={`Peso de ${a} en el portafolio (%)`} value={weights[j]} onChange={(e) => setWeights((ws) => ws.map((x, i) => (i === j ? e.target.value : x)))} /></td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="card stack">
        <h3>Resultado</h3>
        <KV rows={[
          ...assets.map((a, j) => [`Título ${a}: E(R) · σ`, `${perc(er[j])} · ${perc(sd[j])}`]),
          ['Retorno esperado del portafolio', perc(erp)],
          ['Desviación estándar del portafolio', perc(sdp, 3)],
          ['σ ponderada (sin covarianza)', perc(weighted, 3)],
        ]} />
        <div className="callout key small"><div>El retorno del portafolio sí es el promedio ponderado; el riesgo no, porque depende de la covarianza entre títulos (diversificación).</div></div>
      </div>
    </div>
  );
}

/* ---------------- CAPM ---------------- */
function CapmCalc() {
  const [rf, setRf] = useState('6');
  const [km, setKm] = useState('15');
  const [beta, setBeta] = useState('0.3');
  const [rp, setRp] = useState('15');
  const [sd, setSd] = useState('22');
  const [rf2, setRf2] = useState('7');
  const k = n(rf) / 100 + n(beta) * (n(km) / 100 - n(rf) / 100);
  const s = (n(rp) - n(rf2)) / n(sd);
  return (
    <div className="grid grid-2">
      <div className="card stack">
        <h3>CAPM: Kj = Rf + β (Km − Rf)</h3>
        <div className="grid" style={{ gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
          <Num label="Rf" suffix="%" value={rf} onChange={setRf} />
          <Num label="Km" suffix="%" value={km} onChange={setKm} />
          <Num label="Beta" value={beta} onChange={setBeta} />
        </div>
        <div className="result-box">
          <div className="small muted">Rentabilidad exigida</div>
          <div className="v">{perc(k)}</div>
          <div className="small muted">Prima de mercado: {perc(n(km) / 100 - n(rf) / 100)}</div>
        </div>
      </div>
      <div className="card stack">
        <h3>Ratio de Sharpe: (Rp − Rf) / σp</h3>
        <div className="grid" style={{ gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
          <Num label="Rp" suffix="%" value={rp} onChange={setRp} />
          <Num label="Rf" suffix="%" value={rf2} onChange={setRf2} />
          <Num label="σp" suffix="%" value={sd} onChange={setSd} />
        </div>
        <div className="result-box">
          <div className="small muted">Sharpe</div>
          <div className="v">{Number.isFinite(s) ? s.toFixed(3) : '—'}</div>
          <div className="small muted">Mayor Sharpe = más retorno por unidad de riesgo.</div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Divisas ---------------- */
function FxCalc() {
  const [a, setA] = useState('4788.63');
  const [b, setB] = useState('4925.70');
  const [bid, setBid] = useState('1.0850');
  const [ask, setAsk] = useState('1.0853');
  const [lot, setLot] = useState('100000');
  const change = (n(b) - n(a)) / n(a);
  const pips = Math.round((n(ask) - n(bid)) * 10000 * 10) / 10;
  return (
    <div className="grid grid-2">
      <div className="card stack">
        <h3>Apreciación / depreciación</h3>
        <p className="small muted">Tipo de cambio expresado como unidades de moneda local por 1 unidad de divisa (ej. COP por USD).</p>
        <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <Num label="Tipo de cambio inicial" value={a} onChange={setA} />
          <Num label="Tipo de cambio final" value={b} onChange={setB} />
        </div>
        <KV rows={[
          ['Variación del tipo de cambio', perc(change)],
          ['Moneda local', change > 0 ? `se DEPRECIA ${perc(change)}` : change < 0 ? `se APRECIA ${perc(-change)}` : 'sin cambio'],
          ['Tipo de cambio inverso inicial', (1 / n(a)).toPrecision(6)],
        ]} />
      </div>
      <div className="card stack">
        <h3>Spread en pips</h3>
        <div className="grid" style={{ gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
          <Num label="Bid" value={bid} onChange={setBid} />
          <Num label="Ask" value={ask} onChange={setAsk} />
          <Num label="Tamaño (unidades)" value={lot} onChange={setLot} />
        </div>
        <KV rows={[
          ['Spread', `${pips} pips`],
          ['Valor de 1 pip', money(n(lot) * 0.0001)],
          ['Costo del spread', money(pips * n(lot) * 0.0001)],
        ]} />
      </div>
    </div>
  );
}
