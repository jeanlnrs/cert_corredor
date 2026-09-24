import { createClient } from '@supabase/supabase-js';

// La llave `anon` es pública por diseño: la seguridad la da Row Level Security (supabase/schema.sql).
// Nunca pongas aquí la llave `service_role`.
const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Sin variables configuradas la app funciona en modo invitado (solo localStorage).
export const supabase = url && anonKey
  ? createClient(url, anonKey, {
      auth: {
        // PKCE devuelve `?code=` en la URL y no choca con el enrutamiento por hash de la app.
        flowType: 'pkce',
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null;
