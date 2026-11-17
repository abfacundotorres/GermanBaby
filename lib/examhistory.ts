// Historial de simulacros: se guarda solo en este dispositivo (no se sincroniza).
const KEY = "germanbaby.exams.v1";

export type ExamRecord = { id: string; title: string; at: number; lesen: number; hoeren: number; schreiben: number | null; total: number };

export function loadExamHistory(): ExamRecord[] {
  try {
    const raw = localStorage.getItem(KEY);
    const list = raw ? (JSON.parse(raw) as ExamRecord[]) : [];
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

export function saveExamRecord(r: ExamRecord) {
  try {
    const list = [r, ...loadExamHistory()].slice(0, 30);
    localStorage.setItem(KEY, JSON.stringify(list));
  } catch { /* sin espacio o sin permiso */ }
}

/** Lectura aproximada del puntaje total. La referencia de aprobación de los exámenes oficiales es del 60 % por módulo. */
export function examVerdict(total: number): { title: string; detail: string } {
  if (total >= 75) return { title: "B2 sólido en este simulacro", detail: "Estás por encima de la referencia de aprobación. Seguí variando los temas." };
  if (total >= 60) return { title: "Cerca de B2", detail: "Estás en la referencia de aprobación, con poco margen. Repasá las preguntas falladas y el vocabulario de B2." };
  if (total >= 40) return { title: "B1 alto", detail: "Entendés lo esencial, pero todavía faltan vocabulario y estructuras de B2. Más lectura y escucha ayudan mucho." };
  return { title: "B1 o menos en esta prueba", detail: "Conviene reforzar B1 antes de volver a un simulacro de B2." };
}
