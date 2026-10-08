export interface WaitlistSubmission {
  name: string;
  email: string;
  persona: string;
  fromCountry: string;
  toCountry: string;
  note?: string;
  consent: boolean;
  createdAt: string;
}

export async function submitWaitlist(data: Omit<WaitlistSubmission, 'createdAt'>): Promise<{ success: boolean; message: string }> {
  // Simulate network latency (300-600ms)
  await new Promise((resolve) => setTimeout(resolve, 500));

  const submission: WaitlistSubmission = {
    ...data,
    createdAt: new Date().toISOString(),
  };

  // Local storage persistence for prototype/demo
  try {
    const existing = JSON.parse(localStorage.getItem('ayusha_waitlist') || '[]');
    existing.push(submission);
    localStorage.setItem('ayusha_waitlist', JSON.stringify(existing));
    console.info('[AYUSHA Waitlist] Registered submission:', submission);
  } catch (err) {
    console.warn('[AYUSHA Waitlist] Failed to save to localStorage:', err);
  }

  // TODO: Connect to production endpoint:
  // e.g. await fetch('/api/waitlist', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(submission) });

  return {
    success: true,
    message: "Thank you for joining the AYUSHA pilot waitlist. Our clinical corridor coordinator will be in touch shortly.",
  };
}
