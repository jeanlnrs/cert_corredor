import { useState } from 'react';
import { useAuth } from '../lib/auth.jsx';
import { useProgress } from '../lib/progress.jsx';
import Icon from '../components/Icon.jsx';

export const SYNC_LABEL = {
  idle: 'Sin sincronizar',
  loading: 'Descargando tu progreso…',
  saving: 'Guardando…',
  saved: 'Guardado en la nube',
  error: 'Error al sincronizar',
};

function friendlyError(e) {
  const msg = e?.message || '';
  if (/invalid.*credentials|invalid login/i.test(msg)) return 'Correo o contraseña incorrectos.';
  if (/user already registered|already been registered/i.test(msg)) return 'Ya existe una cuenta con ese correo. Inicia sesión.';
  if (/password.*characters|at least 6/i.test(msg)) return 'La contraseña debe tener al menos 6 caracteres.';
  if (/rate limit|too many/i.test(msg)) return 'Demasiados intentos. Espera unos minutos.';
  if (/failed to fetch|network/i.test(msg)) return 'Sin conexión. Revisa tu internet.';
  return msg || 'Algo salió mal. Intenta de nuevo.';
}

// ─── Formulario de login / registro ──────────────────────────────────────────
function AuthForm({ onDone }) {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);
  const [registered, setRegistered] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    if (mode === 'register' && password !== confirm) {
      setError('Las contraseñas no coinciden.');
      return;
    }
    setBusy(true);
    try {
      if (mode === 'login') {
        await signIn(email.trim(), password);
        onDone?.();
      } else {
        await signUp(email.trim(), password);
        setRegistered(true);
      }
    } catch (e) {
      setError(friendlyError(e));
    } finally {
      setBusy(false);
    }
  };

  if (registered) {
    return (
      <div className="stack">
        <div className="callout tip">
          <Icon name="check" />
          <div>
            Cuenta creada. Revisa tu correo <strong>{email}</strong> para confirmarla y luego inicia sesión.
          </div>
        </div>
        <button className="btn ghost sm" onClick={() => { setRegistered(false); setMode('login'); }}>
          Ir a iniciar sesión
        </button>
      </div>
    );
  }

  return (
    <form className="stack" onSubmit={submit}>
      <div className="field">
        <label htmlFor="acc-email">Correo electrónico</label>
        <input
          id="acc-email" className="input" type="email" required
          autoComplete="email" placeholder="tu@correo.com"
          value={email} onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="field">
        <label htmlFor="acc-pw">Contraseña</label>
        <input
          id="acc-pw" className="input" type="password" required
          autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
          placeholder="Mínimo 6 caracteres"
          value={password} onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {mode === 'register' && (
        <div className="field">
          <label htmlFor="acc-pw2">Confirmar contraseña</label>
          <input
            id="acc-pw2" className="input" type="password" required
            autoComplete="new-password" placeholder="Repite la contraseña"
            value={confirm} onChange={(e) => setConfirm(e.target.value)}
          />
        </div>
      )}

      {error && (
        <div className="callout warn">
          <Icon name="alert" /><div>{error}</div>
        </div>
      )}

      <button className="btn primary" disabled={busy || !email || !password}>
        {busy ? 'Cargando…' : mode === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}
      </button>

      <p className="small muted" style={{ textAlign: 'center' }}>
        {mode === 'login' ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}{' '}
        <button
          type="button" className="btn ghost sm"
          onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(null); }}
        >
          {mode === 'login' ? 'Regístrate' : 'Inicia sesión'}
        </button>
      </p>
    </form>
  );
}

// ─── Panel de cambio de contraseña ───────────────────────────────────────────
function ChangePassword() {
  const { updatePassword } = useAuth();
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [confirm, setConfirm] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);
  const [done, setDone] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    if (next !== confirm) { setError('Las contraseñas nuevas no coinciden.'); return; }
    if (next.length < 6) { setError('La contraseña debe tener al menos 6 caracteres.'); return; }
    setBusy(true);
    try {
      await updatePassword(next);
      setDone(true);
      setCurrent(''); setNext(''); setConfirm('');
      setTimeout(() => { setOpen(false); setDone(false); }, 2000);
    } catch (e) {
      setError(friendlyError(e));
    } finally {
      setBusy(false);
    }
  };

  if (!open) {
    return (
      <button className="btn ghost sm" onClick={() => setOpen(true)}>
        <Icon name="edit" /> Cambiar contraseña
      </button>
    );
  }

  return (
    <form className="stack" onSubmit={submit} style={{ borderTop: '1px solid var(--border)', paddingTop: 16 }}>
      <p className="small muted" style={{ margin: 0 }}>Cambiar contraseña</p>

      <div className="field">
        <label htmlFor="cp-next">Nueva contraseña</label>
        <input
          id="cp-next" className="input" type="password" required
          autoComplete="new-password" placeholder="Mínimo 6 caracteres"
          value={next} onChange={(e) => setNext(e.target.value)}
        />
      </div>

      <div className="field">
        <label htmlFor="cp-confirm">Confirmar nueva contraseña</label>
        <input
          id="cp-confirm" className="input" type="password" required
          autoComplete="new-password" placeholder="Repite la nueva contraseña"
          value={confirm} onChange={(e) => setConfirm(e.target.value)}
        />
      </div>

      {error && <div className="callout warn"><Icon name="alert" /><div>{error}</div></div>}
      {done  && <div className="callout tip"><Icon name="check" /><div>Contraseña actualizada.</div></div>}

      <div className="row" style={{ gap: 8 }}>
        <button className="btn primary" disabled={busy || !next || !confirm}>
          {busy ? 'Guardando…' : 'Guardar'}
        </button>
        <button type="button" className="btn ghost sm" onClick={() => { setOpen(false); setError(null); }}>
          Cancelar
        </button>
      </div>
    </form>
  );
}

// ─── Vista principal ──────────────────────────────────────────────────────────
export default function Account() {
  const { enabled, ready, user, signOut } = useAuth();
  const { sync, flush } = useProgress();

  if (!enabled) {
    return (
      <div className="container" style={{ maxWidth: 520 }}>
        <div className="page-head"><div><h1>Tu cuenta</h1></div></div>
        <div className="card stack">
          <div className="callout warn">
            <Icon name="alert" />
            <div>
              La sincronización no está configurada. Faltan <code>VITE_SUPABASE_URL</code> y <code>VITE_SUPABASE_ANON_KEY</code>.
              Tu progreso se guarda solo en este navegador.
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!ready) {
    return (
      <div className="container" style={{ maxWidth: 520 }}>
        <div className="page-head"><div><h1>Tu cuenta</h1></div></div>
        <div className="card empty">Cargando…</div>
      </div>
    );
  }

  return (
    <div className="container" style={{ maxWidth: 520 }}>
      <div className="page-head">
        <div>
          <h1>Tu cuenta</h1>
          <p>
            {user
              ? 'Tu progreso se sincroniza automáticamente.'
              : 'Inicia sesión para guardar tu progreso en la nube.'}
          </p>
        </div>
      </div>

      <div className="card stack">
        {user ? (
          <>
            {/* Info del usuario */}
            <div className="row" style={{ gap: 12 }}>
              <span className="brand-mark">{user.email?.[0]?.toUpperCase()}</span>
              <div>
                <strong>{user.email}</strong>
                <div className="small muted">Sesión iniciada</div>
              </div>
            </div>

            {/* Estado de sincronización */}
            <div className={`callout ${sync.status === 'error' ? 'warn' : 'tip'}`}>
              <Icon name={sync.status === 'error' ? 'alert' : 'check'} />
              <div>
                {SYNC_LABEL[sync.status]}
                {sync.at && <span className="muted"> · {new Date(sync.at).toLocaleTimeString('es-PA')}</span>}
                {sync.error && <div className="small">{sync.error}</div>}
              </div>
            </div>

            {/* Cambio de contraseña */}
            <ChangePassword />

            {/* Cerrar sesión */}
            <button
              className="btn ghost sm"
              onClick={async () => { await flush(); await signOut(); }}
            >
              <Icon name="arrowLeft" /> Cerrar sesión
            </button>
          </>
        ) : (
          <AuthForm />
        )}
      </div>

      {!user && (
        <p className="tiny faint mt">
          Al iniciar sesión, lo que estudiaste como invitado se suma a tu cuenta: no se pierde nada.
        </p>
      )}
    </div>
  );
}
