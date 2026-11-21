import { test } from "node:test";
import assert from "node:assert/strict";

// Un localStorage mínimo para probar la lógica de progreso fuera del navegador.
const store = new Map<string, string>();
Object.assign(globalThis, {
  localStorage: { getItem: (k: string) => store.get(k) ?? null, setItem: (k: string, v: string) => void store.set(k, v), removeItem: (k: string) => void store.delete(k) },
  window: { addEventListener() {}, removeEventListener() {} },
});

test("saltar lecciones y deshacerlo: solo toca lo marcado y respeta lo que se hizo después", async () => {
  const { LESSON_ORDER } = await import("../lib/curriculum.ts");
  const { skipBefore, undoSkip, getProgress, completeLesson } = await import("../lib/progress.ts");
  const target = LESSON_ORDER[5];
  const marked = skipBefore(target);
  assert.equal(marked.length, 5);
  assert.ok(marked.every((k) => getProgress().lessons[k]?.stars === 1));
  assert.equal(getProgress().lessons[target], undefined, "la lección elegida no se marca");
  // Una lección rehecha de verdad (precisión > 0) no se borra al deshacer.
  completeLesson(marked[0], 0.9, []);
  assert.equal(undoSkip(marked), 4);
  assert.ok(getProgress().lessons[marked[0]], "la rehecha se conserva");
  assert.equal(skipBefore(target).length, 4, "no vuelve a marcar las que ya están");
});

test("copia de seguridad: incluye los historiales y no los mezcla con el progreso", async () => {
  const { exportProgress, importProgress, getProgress } = await import("../lib/progress.ts");
  store.set("germanbaby.writing.v1", JSON.stringify([{ id: "a1-vorstellung", at: 1, total: 12, scores: {} }]));
  store.set("germanbaby.exams.v1", JSON.stringify([{ id: "a2-1", title: "x", at: 1, lesen: 50, hoeren: 50, schreiben: null, total: 50 }]));
  const text = exportProgress();
  assert.ok(JSON.parse(text).extras.writing.length === 1 && JSON.parse(text).extras.exams.length === 1);
  store.delete("germanbaby.writing.v1"); store.delete("germanbaby.exams.v1");
  assert.ok(importProgress(text));
  assert.equal(JSON.parse(store.get("germanbaby.writing.v1")!).length, 1);
  assert.equal(JSON.parse(store.get("germanbaby.exams.v1")!).length, 1);
  assert.equal((getProgress() as unknown as { extras?: unknown }).extras, undefined, "extras no queda dentro del progreso");
  assert.equal(importProgress("no es json"), false);
});
