export type SubmissionType = 'pilot' | 'talk';
export type SubmissionTypeFilter = 'all' | 'pilot' | 'talk';

export type SubmissionStatus = 'new' | 'contacted' | 'qualified' | 'archived';
export type SubmissionStatusFilter = 'all' | SubmissionStatus;

export interface Submission {
  id: string;
  created_at: string;
  type: SubmissionType;
  full_name: string;
  email: string;
  persona: string | null;
  origin: string | null;
  destination: string | null;
  message: string | null;
  consent: boolean;
  status: SubmissionStatus;
  notes: string | null;
}

export interface AdminStats {
  total: number;
  newCount: number;
  pilot: number;
  talk: number;
  last7Days: number;
}

export interface SubmissionFilters {
  type: SubmissionTypeFilter;
  status: SubmissionStatusFilter;
  search: string;
  sortAsc: boolean;
  page: number;
}

