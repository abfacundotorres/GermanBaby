// Historial de escritura con rúbrica: solo en este dispositivo.
const KEY = "germanbaby.writing.v1";
export type WritingRecord = { id: string; at: number; total: number; scores: Record<string, number> };

export function loadWriting(): WritingRecord[] {
  try { const l = JSON.parse(localStorage.getItem(KEY) ?? "[]"); return Array.isArray(l) ? l : []; } catch { return []; }
}
export function saveWriting(r: WritingRecord) {
  try { localStorage.setItem(KEY, JSON.stringify([r, ...loadWriting()].slice(0, 40))); } catch { /* sin espacio */ }
}
