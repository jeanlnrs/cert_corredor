import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { todayKey } from './utils.js';

const KEY = 'cv-progress-v1';
const EMPTY = { q: {}, cards: {}, lessons: {}, exams: [], days: [], flags: {} };

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? { ...EMPTY, ...JSON.parse(raw) } : EMPTY;
  } catch {
    return EMPTY;
  }
}

// Intervalos de repaso (Leitner) por caja, en días.
const BOX_DAYS = [0, 1, 3, 7, 16];

const ProgressContext = createContext(null);

export function ProgressProvider({ children }) {
  const [state, setState] = useState(load);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* almacenamiento no disponible: el progreso vive solo en memoria */
    }
  }, [state]);

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
      return { ...s, days: touchDay(s), cards: { ...s.cards, [id]: { box: next, due } } };
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
    () => ({ state, recordAnswer, recordExam, markLesson, rateCard, toggleFlag, reset }),
    [state, recordAnswer, recordExam, markLesson, rateCard, toggleFlag, reset],
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
