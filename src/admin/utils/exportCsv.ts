import type { SupabaseClient } from '@supabase/supabase-js';
import type { Submission, SubmissionFilters } from '../types';

function sanitizeCsvCell(value: unknown): string {
  if (value === null || value === undefined) {
    return '""';
  }
  let str = String(value);

  // CSV formula injection protection: if string begins with =, +, -, or @, prefix with a single quote
  if (/^[=+\-@]/.test(str)) {
    str = `'${str}`;
  }

  // Escape double quotes by doubling them
  const escaped = str.replace(/"/g, '""');
  return `"${escaped}"`;
}

export async function exportSubmissionsToCsv(
  supabase: SupabaseClient,
  filters: SubmissionFilters
): Promise<void> {
  const CHUNK_SIZE = 1000;
  const MAX_ROWS = 5000;
  const allRows: Submission[] = [];

  let offset = 0;
  let hasMore = true;

  while (hasMore && allRows.length < MAX_ROWS) {
    const chunkLimit = Math.min(CHUNK_SIZE, MAX_ROWS - allRows.length);
    let query = supabase
      .from('submissions')
      .select('id, created_at, type, full_name, email, persona, origin, destination, message, consent, status, notes')
      .order('created_at', { ascending: filters.sortAsc })
      .range(offset, offset + chunkLimit - 1);

    if (filters.type !== 'all') {
      query = query.eq('type', filters.type);
    }

    if (filters.status !== 'all') {
      query = query.eq('status', filters.status);
    }

    if (filters.search.trim()) {
      // Escape % and , characters to prevent breaking PostgREST .or() filter syntax
      const cleanSearch = filters.search.trim().replace(/[,%()]/g, '');
      if (cleanSearch) {
        query = query.or(
          `full_name.ilike.%${cleanSearch}%,email.ilike.%${cleanSearch}%,message.ilike.%${cleanSearch}%`
        );
      }
    }

    const { data, error } = await query;

    if (error) {
      throw new Error('Failed to fetch submissions for export.');
    }

    if (!data || data.length === 0) {
      break;
    }

    allRows.push(...(data as Submission[]));
    offset += data.length;

    if (data.length < chunkLimit) {
      hasMore = false;
    }
  }

  const headers = [
    'ID',
    'Created At',
    'Type',
    'Full Name',
    'Email',
    'Persona',
    'Origin',
    'Destination',
    'Message',
    'Consent',
    'Status',
    'Notes',
  ];

  const csvRows: string[] = [headers.map(sanitizeCsvCell).join(',')];

  for (const row of allRows) {
    const values = [
      row.id,
      row.created_at,
      row.type,
      row.full_name,
      row.email,
      row.persona || '',
      row.origin || '',
      row.destination || '',
      row.message || '',
      row.consent ? 'true' : 'false',
      row.status,
      row.notes || '',
    ];
    csvRows.push(values.map(sanitizeCsvCell).join(','));
  }

  const csvContent = csvRows.join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const filename = `ayusha-submissions-${year}-${month}-${day}.csv`;

  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

