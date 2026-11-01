import { createClient, SupabaseClient } from '@supabase/supabase-js';

export interface SubmissionPayload {
  type: 'pilot' | 'talk';
  full_name: string;
  email: string;
  persona?: string | null;
  origin?: string | null;
  destination?: string | null;
  message?: string | null;
  consent: boolean;
}

function cleanEnvVar(val: unknown): string {
  if (typeof val !== 'string') return '';
  return val.trim().replace(/^["']|["']$/g, '').trim();
}

function initializeSupabaseClient(): SupabaseClient | null {
  const rawUrl = import.meta.env.VITE_SUPABASE_URL;
  const rawKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  const url = cleanEnvVar(rawUrl);
  const key = cleanEnvVar(rawKey);

  const isUrlValid = Boolean(
    url && (url.startsWith('https://') || url.startsWith('http://'))
  );
  const isKeyValid = Boolean(key.length > 0);

  if (!isUrlValid || !isKeyValid) {
    if (import.meta.env.DEV) {
      const invalidVars: string[] = [];
      if (!isUrlValid) invalidVars.push('VITE_SUPABASE_URL');
      if (!isKeyValid) invalidVars.push('VITE_SUPABASE_ANON_KEY');
      console.warn(
        `[AYUSHA Supabase] Missing or invalid configuration: ${invalidVars.join(', ')}`
      );
    }
    return null;
  }

  try {
    return createClient(url, key);
  } catch {
    if (import.meta.env.DEV) {
      console.warn('[AYUSHA Supabase] Failed to initialize client');
    }
    return null;
  }
}

export const supabase: SupabaseClient | null = initializeSupabaseClient();
