import { supabase, SubmissionPayload } from '@/lib/supabase';

export interface WaitlistSubmission {
  name: string;
  email: string;
  persona: string;
  fromCountry: string;
  toCountry: string;
  note?: string;
  consent: boolean;
  createdAt?: string;
}

export interface TalkSubmission {
  name: string;
  email: string;
  message?: string;
  consent?: boolean;
}

export interface SubmissionResult {
  success: boolean;
  message: string;
}

/**
 * Submits a "Join the pilot" registration to Supabase public.submissions.
 * Enforces email trimming & lowercasing, 1000 char message cap, and consent: true.
 * Duplicate submissions (PG error 23505) are treated as success.
 */
export async function submitWaitlist(
  data: Omit<WaitlistSubmission, 'createdAt'>
): Promise<SubmissionResult> {
  if (!supabase) {
    throw new Error('Supabase client is not configured');
  }

  const sanitizedEmail = data.email.trim().toLowerCase();
  const sanitizedMessage = data.note ? data.note.trim().slice(0, 1000) : null;

  const payload: SubmissionPayload = {
    type: 'pilot',
    full_name: data.name.trim().slice(0, 100),
    email: sanitizedEmail.slice(0, 254),
    persona: data.persona,
    origin: data.fromCountry,
    destination: data.toCountry,
    message: sanitizedMessage || null,
    consent: true,
  };

  const { error } = await supabase.from('submissions').insert([payload]);

  if (error) {
    // 23505 = unique_violation (e.g. duplicate email for this type). Treat silently as success.
    if (error.code === '23505') {
      return {
        success: true,
        message: 'Thank you for joining the AYUSHA pilot waitlist. Our clinical corridor coordinator will be in touch shortly.',
      };
    }
    throw error;
  }

  return {
    success: true,
    message: 'Thank you for joining the AYUSHA pilot waitlist. Our clinical corridor coordinator will be in touch shortly.',
  };
}

/**
 * Submits a "Talk to us (Investor & Partner)" inquiry to Supabase public.submissions.
 * Enforces email trimming & lowercasing, 1000 char message cap, and consent: true.
 * Unused columns (persona, origin, destination) are left null.
 * Duplicate submissions (PG error 23505) are treated as success.
 */
export async function submitTalk(
  data: TalkSubmission
): Promise<SubmissionResult> {
  if (!supabase) {
    throw new Error('Supabase client is not configured');
  }

  const sanitizedEmail = data.email.trim().toLowerCase();
  const sanitizedMessage = data.message ? data.message.trim().slice(0, 1000) : null;

  const payload: SubmissionPayload = {
    type: 'talk',
    full_name: data.name.trim().slice(0, 100),
    email: sanitizedEmail.slice(0, 254),
    persona: null,
    origin: null,
    destination: null,
    message: sanitizedMessage || null,
    consent: true,
  };

  const { error } = await supabase.from('submissions').insert([payload]);

  if (error) {
    // 23505 = unique_violation. Treat silently as success.
    if (error.code === '23505') {
      return {
        success: true,
        message: 'Thank you for contacting us. We will get back to you shortly.',
      };
    }
    throw error;
  }

  return {
    success: true,
    message: 'Thank you for contacting us. We will get back to you shortly.',
  };
}
