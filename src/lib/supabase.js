import { createClient } from '@supabase/supabase-js';

// La llave `anon` es pública por diseño: la seguridad la da Row Level Security (supabase/schema.sql).
// Nunca pongas aquí la llave `service_role`.
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
