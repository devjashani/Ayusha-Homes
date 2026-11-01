import type { SubmissionStatus, SubmissionType } from '../types';

export function formatDate(isoString: string): string {
  try {
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return isoString;

    const day = d.getDate();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    const hours = d.getHours().toString().padStart(2, '0');
    const minutes = d.getMinutes().toString().padStart(2, '0');

    return `${day} ${month} ${year}, ${hours}:${minutes}`;
  } catch {
    return isoString;
  }
}

export function getStatusStyle(status: SubmissionStatus): {
  badge: string;
  dot: string;
  label: string;
} {
  switch (status) {
    case 'new':
      return {
        badge: 'bg-[#336E87]/10 text-[#336E87] border-[#336E87]/25 font-semibold',
        dot: 'bg-[#336E87]',
        label: 'New',
      };
    case 'contacted':
      return {
        badge: 'bg-[#549A98]/10 text-[#2C6E6C] border-[#549A98]/25 font-medium',
        dot: 'bg-[#549A98]',
        label: 'Contacted',
      };
    case 'qualified':
      return {
        badge: 'bg-[#7EA294]/15 text-[#2A5C50] border-[#7EA294]/30 font-medium',
        dot: 'bg-[#7EA294]',
        label: 'Qualified',
      };
    case 'archived':
      return {
        badge: 'bg-[#B5BEBA]/20 text-[#5A6D6C] border-[#B5BEBA]/40 font-medium',
        dot: 'bg-[#B5BEBA]',
        label: 'Archived',
      };
    default:
      return {
        badge: 'bg-gray-100 text-gray-700 border-gray-200 font-medium',
        dot: 'bg-gray-400',
        label: status,
      };
  }
}

export function getTypeBadgeStyle(type: SubmissionType): {
  badge: string;
  label: string;
} {
  if (type === 'pilot') {
    return {
      badge: 'bg-[#336E87]/10 text-[#336E87] border-[#336E87]/20 font-medium',
      label: 'Pilot',
    };
  }
  return {
    badge: 'bg-[#549A98]/10 text-[#2C6E6C] border-[#549A98]/20 font-medium',
    label: 'Talk',
  };
}

