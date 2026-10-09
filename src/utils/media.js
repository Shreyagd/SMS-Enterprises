// Video uploads. Videos are far too large for localStorage, so an upload goes:
//   1. to the Node server (POST /api/upload) when it is running → a real file URL every visitor can load;
//   2. otherwise into this browser's IndexedDB → an "idb:video:<id>" reference only this browser can play.

const VIDEO_EXT = /\.(mp4|webm|ogg|ogv|mov|m4v)(\?|#|$)/i;
export const MAX_VIDEO_MB = 200;

export function isVideo(src) {
  if (!src) return false;
  return src.startsWith('idb:video:') || src.startsWith('data:video') || VIDEO_EXT.test(src);
}

export const isLocalOnly = (src) => !!src && src.startsWith('idb:');

// ── IndexedDB blob store
const DB_NAME = 'sms_media';
const STORE = 'files';

function openDb() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => req.result.createObjectStore(STORE);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function idbPut(key, blob) {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readwrite');
    tx.objectStore(STORE).put(blob, key);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

async function idbGet(key) {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const req = db.transaction(STORE, 'readonly').objectStore(STORE).get(key);
    req.onsuccess = () => resolve(req.result || null);
    req.onerror = () => reject(req.error);
  });
}

// Upload a video file. Resolves { url, localOnly }.
export async function uploadVideo(file) {
  if (file.size > MAX_VIDEO_MB * 1024 * 1024) {
    throw new Error(`Video is larger than ${MAX_VIDEO_MB} MB. Please export a smaller version.`);
  }
  try {
    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: { 'Content-Type': file.type || 'application/octet-stream', 'X-Filename': encodeURIComponent(file.name) },
      body: file
    });
    const isJson = (res.headers.get('content-type') || '').includes('application/json');
    if (res.ok && isJson) {
      const data = await res.json();
      if (data.url) return { url: data.url, localOnly: false };
    }
  } catch {
    // No server — fall through to browser storage
  }
  const key = `video:${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  await idbPut(key, file);
  return { url: `idb:${key}`, localOnly: true };
}

// Turn a stored reference into something <video>/<img> can play. Cached per session.
const resolved = new Map();
export async function resolveMediaSrc(src) {
  if (!isLocalOnly(src)) return src;
  if (resolved.has(src)) return resolved.get(src);
  const blob = await idbGet(src.slice('idb:'.length));
  const url = blob ? URL.createObjectURL(blob) : null;
  resolved.set(src, url);
  return url;
}

// Resume / document upload for job applications. Resolves { name, url }.
// Server running → stored as a file. No server → embedded in the application (small files only).
export const MAX_RESUME_MB = 5;
const MAX_EMBEDDED_RESUME_MB = 2;

export async function uploadResume(file) {
  if (file.size > MAX_RESUME_MB * 1024 * 1024) {
    throw new Error(`Resume is larger than ${MAX_RESUME_MB} MB. Please upload a smaller PDF.`);
  }
  try {
    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: { 'Content-Type': file.type || 'application/octet-stream', 'X-Filename': encodeURIComponent(file.name) },
      body: file
    });
    const isJson = (res.headers.get('content-type') || '').includes('application/json');
    if (res.ok && isJson) {
      const data = await res.json();
      if (data.url) return { name: file.name, url: data.url };
    }
  } catch {
    // No server — embed below
  }
  if (file.size > MAX_EMBEDDED_RESUME_MB * 1024 * 1024) {
    throw new Error(`Please upload a resume smaller than ${MAX_EMBEDDED_RESUME_MB} MB (PDF works best).`);
  }
  const url = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
  return { name: file.name, url };
}
