"use client";

// Caché de audio ya sintetizado en el dispositivo (IndexedDB), por voz + velocidad + texto.
// Ahorra caracteres de Azure y la espera de volver a pedir una frase. Si IndexedDB no
// está disponible, simplemente no cachea.

const DB = "dankedonkey-audio";
const STORE = "clips";
const MAX_CLIPS = 400; // ~15-30 KB cada uno → unos pocos MB

type Clip = { key: string; blob: Blob; at: number };

export const clipKey = (voice: string, slow: boolean, text: string) => `${voice}|${slow ? "slow" : "norm"}|${text}`;

let dbPromise: Promise<IDBDatabase | null> | null = null;
function open(): Promise<IDBDatabase | null> {
  if (typeof indexedDB === "undefined") return Promise.resolve(null);
  return (dbPromise ??= new Promise((resolve) => {
    try {
      const req = indexedDB.open(DB, 1);
      req.onupgradeneeded = () => {
        const s = req.result.createObjectStore(STORE, { keyPath: "key" });
        s.createIndex("at", "at");
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => resolve(null);
    } catch {
      resolve(null);
    }
  }));
}

const done = <T,>(req: IDBRequest<T>) =>
  new Promise<T | undefined>((resolve) => {
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => resolve(undefined);
  });

export async function getClip(key: string): Promise<Blob | null> {
  try {
    const db = await open();
    if (!db) return null;
    const clip = (await done(db.transaction(STORE).objectStore(STORE).get(key))) as Clip | undefined;
    return clip?.blob ?? null;
  } catch {
    return null;
  }
}

export async function putClip(key: string, blob: Blob) {
  try {
    const db = await open();
    if (!db) return;
    const store = db.transaction(STORE, "readwrite").objectStore(STORE);
    store.put({ key, blob, at: Date.now() } satisfies Clip);
    // Si se pasa del tope, borra los más viejos.
    const total = (await done(store.count())) ?? 0;
    if (total > MAX_CLIPS) {
      let extra = total - MAX_CLIPS;
      const cur = store.index("at").openCursor();
      cur.onsuccess = () => {
        const c = cur.result;
        if (c && extra-- > 0) { c.delete(); c.continue(); }
      };
    }
  } catch {
    /* sin caché */
  }
}
