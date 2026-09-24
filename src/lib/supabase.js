import { createClient } from '@supabase/supabase-js';

// La llave `anon` es pública por diseño: la seguridad la da Row Level Security (supabase/schema.sql).
// Nunca pongas aquí la llave `service_role`.
// Si el enlace mágico venció o ya se usó, Supabase vuelve con `#error=…&error_code=…` en la URL.
// Se lee antes de crear el cliente (que limpia la URL) para poder explicárselo al usuario.
function readAuthError() {
  if (typeof window === 'undefined' || !window.location) return null;
  const { hash = '', search = '' } = window.location;
  const raw = `${hash.replace(/^#\/?/, '')}&${search.replace(/^\?/, '')}`;
  const params = new URLSearchParams(raw);
  const code = params.get('error_code') || params.get('error');
  if (!code) return null;
  window.history.replaceState(null, '', `${window.location.pathname}#/cuenta`);
  return code === 'otp_expired'
    ? 'El enlace venció o ya fue usado. Pide uno nuevo: cada enlace sirve una sola vez.'
    : `No se pudo iniciar sesión (${params.get('error_description') || code}). Pide un enlace nuevo.`;
}
export const initialAuthError = readAuthError();

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Sin variables configuradas la app funciona en modo invitado (solo localStorage).
export const supabase = url && anonKey
  ? createClient(url, anonKey, {
      auth: {
        // Flujo implícito: el enlace mágico inicia sesión en el navegador donde se abra
        // (con PKCE solo funcionaría en el mismo navegador donde se pidió, lo que falla en celulares).
        // Supabase lee y limpia el `#access_token=…` antes de que la app use el hash para navegar.
        flowType: 'implicit',
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null;
