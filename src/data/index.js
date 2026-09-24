import { TOPICS, TOPIC_BY_ID } from './topics.js';
import { EXAM_LEGAL } from './examLegal.js';
import { EXAM_FIN } from './examFinanciero.js';
import { BANK } from './bank.js';
import { FLASHCARDS } from './flashcards.js';

export { TOPICS, TOPIC_BY_ID, EXAM_LEGAL, EXAM_FIN, BANK, FLASHCARDS };

export const ALL_QUESTIONS = [...EXAM_LEGAL, ...EXAM_FIN, ...BANK];
export const QUESTION_BY_ID = Object.fromEntries(ALL_QUESTIONS.map((q) => [q.id, q]));

export const questionsForTopic = (topicId) => ALL_QUESTIONS.filter((q) => q.topic === topicId);

// Mínimo aprobatorio del Examen General Básico (Acuerdo 5-2014, art. 7)
export const PASS_MARK = 0.7;

export const EXAM_PRESETS = [
  {
    id: 'legal',
    title: 'Examen de Práctica — Parte Legal',
    desc: 'Las 50 preguntas del PDF, en su orden original, con respuestas verificadas contra la Ley y los Acuerdos.',
    minutes: 60,
    build: () => EXAM_LEGAL,
  },
  {
    id: 'financiero',
    title: 'Examen de Práctica — Parte Financiera',
    desc: '94 preguntas + 2 ejercicios de valoración de bonos (Parte II). Solo calculadora científica.',
    minutes: 120,
    build: () => EXAM_FIN,
  },
  {
    id: 'simulacro',
    title: 'Simulacro mixto',
    desc: 'Preguntas aleatorias de todo el temario (A–L), en proporción a cada sección.',
    minutes: 90,
    configurable: true,
  },
];
