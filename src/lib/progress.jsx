import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { todayKey } from './utils.js';
import { supabase } from './supabase.js';
import { useAuth } from './auth.jsx';
import { mergeProgress } from './merge.js';

const SAVE_DELAY_MS = 1500;

const KEY = 'cv-progress-v1';
// Cuenta a la que pertenece el progreso guardado en este navegador ('' = invitado).
const OWNER_KEY = 'cv-progress-owner';
const EMPTY = { q: {}, cards: {}, lessons: {}, exams: [], days: [], flags: {} };

const isObj = (v) => v && typeof v === 'object' && !Array.isArray(v);

// Normaliza datos guardados (localStorage o nube) para que un valor corrupto no rompa la app.
function sanitize(raw) {
  if (!isObj(raw)) return EMPTY;
  return {
    q: isObj(raw.q) ? raw.q : {},
    cards: isObj(raw.cards) ? raw.cards : {},
    lessons: isObj(raw.lessons) ? raw.lessons : {},
    exams: Array.isArray(raw.exams) ? raw.exams : [],
    days: Array.isArray(raw.days) ? raw.days : [],
    flags: isObj(raw.flags) ? raw.flags : {},
  };
}

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? sanitize(JSON.parse(raw)) : EMPTY;
  } catch {
    return EMPTY;
  }
}

function readOwner() {
  try {
    return localStorage.getItem(OWNER_KEY) || '';
  } catch {
    return '';
  }
}

function writeOwner(id) {
  try {
    localStorage.setItem(OWNER_KEY, id || '');
  } catch {
    /* sin almacenamiento */
  }
}

// Intervalos de repaso (Leitner) por caja, en días.
const BOX_DAYS = [0, 1, 3, 7, 16];

const ProgressContext = createContext(null);

export function ProgressProvider({ children }) {
  const [state, setState] = useState(load);
  const { user } = useAuth();
  // Se usa el id (no el objeto) para no re-sincronizar cada vez que Supabase refresca el token.
  const userId = user?.id ?? null;
  const prevUserId = useRef(null);
  // idle | loading | saving | saved | error
  const [sync, setSync] = useState({ status: 'idle', at: null, error: null });
  const stateRef = useRef(state);
  // Solo se sube a la nube después de haber descargado y combinado el progreso remoto.
  const hydratedFor = useRef(null);

  useEffect(() => {
    stateRef.current = state;
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* almacenamiento no disponible: el progreso vive solo en memoria */
    }
  }, [state]);

  const upload = useCallback(async (userId, data) => {
    setSync((s) => ({ ...s, status: 'saving' }));
    const { error } = await supabase
      .from('progress')
      .upsert({ user_id: userId, data, updated_at: new Date().toISOString() });
    setSync(error ? { status: 'error', at: null, error: error.message } : { status: 'saved', at: Date.now(), error: null });
  }, []);

  // Descarga el progreso de la nube y lo combina con `base` (el progreso local que corresponde a esta cuenta).
  const pull = useCallback(async (id, base) => {
    const { data, error } = await supabase.from('progress').select('data').eq('user_id', id).maybeSingle();
    if (error) {
      setSync({ status: 'error', at: null, error: error.message });
      return false;
    }
    const merged = mergeProgress(base, data?.data ? sanitize(data.data) : null);
    setState(merged);
    writeOwner(id);
    await upload(id, merged);
    return true;
  }, [upload]);

  // Al iniciar sesión, cerrar sesión o cambiar de usuario.
  useEffect(() => {
    hydratedFor.current = null;
    const previous = prevUserId.current;
    prevUserId.current = userId;

    if (!supabase || !userId) {
      setSync({ status: 'idle', at: null, error: null });
      // Al cerrar sesión se limpia este navegador: el progreso queda a salvo en la cuenta
      // y la próxima persona que use el equipo no lo hereda.
      if (previous) {
        setState(EMPTY);
        writeOwner('');
      }
      return undefined;
    }

    // Solo se combina el progreso de invitado o el de esta misma cuenta, nunca el de otra.
    const owner = readOwner();
    const base = !owner || owner === userId ? stateRef.current : EMPTY;
    let cancelled = false;
    setSync({ status: 'loading', at: null, error: null });
    pull(userId, base).then((ok) => {
      if (!cancelled && ok) hydratedFor.current = userId;
    });
    return () => {
      cancelled = true;
    };
  }, [userId, pull]);

  // Guarda de inmediato (se usa antes de cerrar sesión para no perder los últimos segundos).
  const flush = useCallback(async () => {
    if (userId && hydratedFor.current === userId) await upload(userId, stateRef.current);
  }, [userId, upload]);

  // Guardado automático con retardo tras cada cambio.
  useEffect(() => {
    if (!userId || hydratedFor.current !== userId) return undefined;
    const t = setTimeout(() => upload(userId, state), SAVE_DELAY_MS);
    return () => clearTimeout(t);
  }, [state, userId, upload]);

  // Al volver a la pestaña, traer lo estudiado en otros dispositivos.
  useEffect(() => {
    if (!userId) return undefined;
    const onVisible = () => {
      if (document.visibilityState === 'visible' && hydratedFor.current === userId) pull(userId, stateRef.current);
    };
    document.addEventListener('visibilitychange', onVisible);
    return () => document.removeEventListener('visibilitychange', onVisible);
  }, [userId, pull]);

  const touchDay = (s) => {
    const d = todayKey();
    return s.days.includes(d) ? s.days : [...s.days, d].slice(-400);
  };

  const recordAnswer = useCallback((id, correct) => {
    setState((s) => {
      const prev = s.q[id] || { n: 0, c: 0 };
      return {
        ...s,
        days: touchDay(s),
        q: { ...s.q, [id]: { n: prev.n + 1, c: prev.c + (correct ? 1 : 0), last: correct, t: Date.now() } },
      };
    });
  }, []);

  const recordExam = useCallback((exam) => {
    setState((s) => ({ ...s, days: touchDay(s), exams: [...s.exams, exam].slice(-100) }));
  }, []);

  const markLesson = useCallback((key, done = true) => {
    setState((s) => ({ ...s, days: touchDay(s), lessons: { ...s.lessons, [key]: done } }));
  }, []);

  const rateCard = useCallback((id, knew) => {
    setState((s) => {
      const box = s.cards[id]?.box ?? 0;
      const next = knew ? Math.min(box + 1, BOX_DAYS.length - 1) : 0;
      const due = Date.now() + BOX_DAYS[next] * 86400000;
      return { ...s, days: touchDay(s), cards: { ...s.cards, [id]: { box: next, due, u: Date.now() } } };
    });
  }, []);

  const toggleFlag = useCallback((id) => {
    setState((s) => {
      const flags = { ...s.flags };
      if (flags[id]) delete flags[id];
      else flags[id] = true;
      return { ...s, flags };
    });
  }, []);

  const reset = useCallback(() => setState(EMPTY), []);

  const value = useMemo(
    () => ({ state, sync, flush, recordAnswer, recordExam, markLesson, rateCard, toggleFlag, reset }),
    [state, sync, flush, recordAnswer, recordExam, markLesson, rateCard, toggleFlag, reset],
  );
  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export const useProgress = () => useContext(ProgressContext);

// Dominio de un conjunto de preguntas: proporción cuya última respuesta fue correcta.
export function mastery(state, questions) {
  if (!questions.length) return { answered: 0, correct: 0, total: 0, ratio: 0 };
  let answered = 0;
  let correct = 0;
  for (const q of questions) {
    const r = state.q[q.id];
    if (r) {
      answered++;
      if (r.last) correct++;
    }
  }
  return { answered, correct, total: questions.length, ratio: correct / questions.length };
}

export function streak(days) {
  const set = new Set(days);
  let n = 0;
  const d = new Date();
  if (!set.has(todayKey(d))) d.setDate(d.getDate() - 1);
  while (set.has(todayKey(d))) {
    n++;
    d.setDate(d.getDate() - 1);
  }
  return n;
}
