import { useCallback, useEffect, useState } from 'react';
import { ProgressProvider, useProgress } from './lib/progress.jsx';
import Icon from './components/Icon.jsx';
import Dashboard from './views/Dashboard.jsx';
import Study from './views/Study.jsx';
import Practice from './views/Practice.jsx';
import Exam from './views/Exam.jsx';
import Flashcards from './views/Flashcards.jsx';
import Tools from './views/Tools.jsx';
import Review from './views/Review.jsx';

const NAV = [
  { id: 'inicio', label: 'Panel', icon: 'home' },
  { id: 'estudiar', label: 'Estudiar', icon: 'book' },
  { id: 'practicar', label: 'Practicar', icon: 'target' },
  { id: 'examen', label: 'Simulacro', icon: 'clock' },
  { id: 'tarjetas', label: 'Tarjetas', icon: 'cards' },
  { id: 'herramientas', label: 'Calculadoras', icon: 'calc' },
  { id: 'repaso', label: 'Mis errores', icon: 'refresh' },
];
const MOBILE_NAV = ['inicio', 'estudiar', 'practicar', 'examen', 'tarjetas', 'herramientas'];

function parseHash() {
  const parts = window.location.hash.replace(/^#\/?/, '').split('/').filter(Boolean).map(decodeURIComponent);
  return { view: NAV.some((n) => n.id === parts[0]) ? parts[0] : 'inicio', params: parts.slice(1) };
}

function useTheme() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('cv-theme') || 'auto';
    } catch {
      return 'auto';
    }
  });
  useEffect(() => {
    if (theme === 'auto') document.documentElement.removeAttribute('data-theme');
    else document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('cv-theme', theme);
    } catch {
      /* sin almacenamiento */
    }
  }, [theme]);
  const isDark = theme === 'dark' || (theme === 'auto' && window.matchMedia?.('(prefers-color-scheme: dark)').matches);
  return [isDark, () => setTheme(isDark ? 'light' : 'dark')];
}

function Shell() {
  const [route, setRoute] = useState(parseHash);
  const [isDark, toggleTheme] = useTheme();
  const { reset } = useProgress();

  useEffect(() => {
    const on = () => setRoute(parseHash());
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);

  const go = useCallback((view, ...params) => {
    const hash = `#/${[view, ...params.filter((p) => p != null && p !== '')].map(encodeURIComponent).join('/')}`;
    if (window.location.hash === hash) setRoute(parseHash());
    else window.location.hash = hash;
    window.scrollTo({ top: 0 });
  }, []);

  const { view, params } = route;
  // La clave fuerza a reiniciar el estado interno de la vista al navegar.
  const key = `${view}/${params.join('/')}`;

  let content;
  switch (view) {
    case 'estudiar': content = <Study key={key} topicId={params[0]} lessonIdx={params[1]} go={go} />; break;
    case 'practicar': content = <Practice key={key} topicId={params[0]} go={go} />; break;
    case 'examen': content = <Exam key={key} go={go} />; break;
    case 'tarjetas': content = <Flashcards key={key} topicId={params[0]} />; break;
    case 'herramientas': content = <Tools key={key} />; break;
    case 'repaso': content = <Review key={key} go={go} />; break;
    default: content = <Dashboard go={go} />;
  }

  const confirmReset = () => {
    if (window.confirm('¿Borrar todo tu progreso (respuestas, tarjetas y simulacros)? Esta acción no se puede deshacer.')) reset();
  };

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark">CV</span>
          <div>
            <strong>Corredor de Valores</strong>
            <small>Preparación · SMV Panamá</small>
          </div>
        </div>
        {NAV.map((n) => (
          <button key={n.id} className={`nav-item ${view === n.id ? 'active' : ''}`} onClick={() => go(n.id)}>
            <Icon name={n.icon} /> {n.label}
          </button>
        ))}
        <div className="sidebar-foot">
          <button className="nav-item" onClick={toggleTheme}>
            <Icon name={isDark ? 'sun' : 'moon'} /> {isDark ? 'Tema claro' : 'Tema oscuro'}
          </button>
          <button className="nav-item" onClick={confirmReset}>
            <Icon name="x" /> Reiniciar progreso
          </button>
          <p className="tiny faint" style={{ padding: '6px 12px' }}>Tu progreso se guarda en este navegador.</p>
        </div>
      </aside>

      <main className="main">
        <div className="row mobile-only" style={{ justifyContent: 'space-between', marginBottom: 8 }}>
          <button className="btn sm ghost" onClick={() => go('repaso')}>
            <Icon name="refresh" /> Mis errores
          </button>
          <button className="btn sm ghost" onClick={toggleTheme} aria-label="Cambiar tema">
            <Icon name={isDark ? 'sun' : 'moon'} />
          </button>
        </div>
        {content}
      </main>

      <nav className="bottom-nav">
        {NAV.filter((n) => MOBILE_NAV.includes(n.id)).map((n) => (
          <button key={n.id} className={view === n.id ? 'active' : ''} onClick={() => go(n.id)}>
            <Icon name={n.icon} />
            {n.label}
          </button>
        ))}
      </nav>
    </div>
  );
}

export default function App() {
  return (
    <ProgressProvider>
      <Shell />
    </ProgressProvider>
  );
}
