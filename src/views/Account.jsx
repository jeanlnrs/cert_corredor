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

export default function Account() {
  const { enabled, ready, user, sendMagicLink, verifyCode, signOut } = useAuth();
  const { sync } = useProgress();
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  const run = async (fn) => {
    setBusy(true);
    setError(null);
    try {
      await fn();
    } catch (e) {
      setError(e.message || 'Algo salió mal. Intenta de nuevo.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: 560 }}>
      <div className="page-head">
        <div>
          <h1>Tu cuenta</h1>
          <p>Inicia sesión para guardar tu progreso en la nube y continuar en cualquier dispositivo.</p>
        </div>
      </div>

      {!enabled ? (
        <div className="card stack">
          <div className="callout warn">
            <Icon name="alert" />
            <div>
              La sincronización no está configurada. Faltan las variables <code>VITE_SUPABASE_URL</code> y <code>VITE_SUPABASE_ANON_KEY</code> (ver README).
              Mientras tanto, tu progreso se guarda solo en este navegador.
            </div>
          </div>
        </div>
      ) : !ready ? (
        <div className="card empty">Cargando…</div>
      ) : user ? (
        <div className="card stack">
          <div className="row" style={{ gap: 12 }}>
            <span className="brand-mark">{user.email?.[0]?.toUpperCase()}</span>
            <div>
              <strong>{user.email}</strong>
              <div className="small muted">Sesión iniciada</div>
            </div>
          </div>
          <div className={`callout ${sync.status === 'error' ? 'warn' : 'tip'}`}>
            <Icon name={sync.status === 'error' ? 'alert' : 'check'} />
            <div>
              {SYNC_LABEL[sync.status]}
              {sync.at && <span className="muted"> · {new Date(sync.at).toLocaleTimeString('es-PA')}</span>}
              {sync.error && <div className="small">{sync.error}</div>}
            </div>
          </div>
          <p className="small muted">
            Tu progreso se guarda automáticamente unos segundos después de cada respuesta y se actualiza al volver a esta pestaña.
          </p>
          <button className="btn" onClick={() => run(signOut)} disabled={busy}>
            <Icon name="arrowLeft" /> Cerrar sesión
          </button>
        </div>
      ) : (
        <div className="card stack">
          {!sent ? (
            <form
              className="stack"
              onSubmit={(e) => {
                e.preventDefault();
                run(async () => {
                  await sendMagicLink(email.trim());
                  setSent(true);
                });
              }}
            >
              <div className="field">
                <label htmlFor="email">Correo electrónico</label>
                <input id="email" className="input" type="email" required autoComplete="email" placeholder="tu@correo.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <button className="btn primary" disabled={busy || !email}>
                {busy ? 'Enviando…' : 'Enviarme un enlace para entrar'}
              </button>
              <p className="small muted">Sin contraseñas: te llega un enlace a tu correo y con un clic quedas dentro.</p>
            </form>
          ) : (
            <div className="stack">
              <div className="callout tip">
                <Icon name="check" />
                <div>
                  Te enviamos un enlace a <strong>{email}</strong>. Ábrelo <strong>en este mismo navegador</strong> para iniciar sesión.
                </div>
              </div>
              <form
                className="stack"
                onSubmit={(e) => {
                  e.preventDefault();
                  run(() => verifyCode(email.trim(), code.trim()));
                }}
              >
                <div className="field">
                  <label htmlFor="code">¿El correo trae un código de 6 dígitos? Escríbelo aquí</label>
                  <input id="code" className="input" inputMode="numeric" autoComplete="one-time-code" value={code} onChange={(e) => setCode(e.target.value)} />
                </div>
                <button className="btn" disabled={busy || code.trim().length < 6}>Entrar con el código</button>
              </form>
              <button className="btn ghost sm" onClick={() => { setSent(false); setCode(''); }}>Usar otro correo o reenviar</button>
            </div>
          )}
          {error && <div className="callout warn"><Icon name="alert" /><div>{error}</div></div>}
        </div>
      )}

      <p className="tiny faint mt">
        Al iniciar sesión por primera vez, el progreso que ya tienes en este navegador se combina con el de tu cuenta: no se pierde nada.
      </p>
    </div>
  );
}
