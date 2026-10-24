import { createClient } from '@supabase/supabase-js';

// Configured through .env (local) or Vercel → Settings → Environment Variables (live site).
const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// null when Supabase isn't configured — the site then falls back to the local server / browser storage
export const supabase = url && anonKey ? createClient(url, anonKey) : null;

export const MEDIA_BUCKET = 'media';
export const RESUME_BUCKET = 'resumes';

// Upload a file to Supabase Storage; resolves the stored path
export async function uploadToBucket(bucket, folder, file, contentType) {
  const safeName = (file.name || 'file').replace(/[^a-zA-Z0-9._-]+/g, '_').slice(-80);
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 7)}-${safeName}`;
  const { error } = await supabase.storage.from(bucket).upload(path, file, {
    contentType: contentType || file.type || 'application/octet-stream',
    upsert: false
  });
  if (error) throw new Error(error.message);
  return path;
}

export function publicUrl(bucket, path) {
  return supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl;
}
