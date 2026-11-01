import React, { useState, useEffect } from 'react';
import type { SubmissionTypeFilter, SubmissionStatusFilter } from '../types';
import { Search, ArrowUpDown, X } from 'lucide-react';

interface FiltersBarProps {
  type: SubmissionTypeFilter;
  onTypeChange: (type: SubmissionTypeFilter) => void;
  status: SubmissionStatusFilter;
  onStatusChange: (status: SubmissionStatusFilter) => void;
  search: string;
  onSearchChange: (search: string) => void;
  sortAsc: boolean;
  onToggleSort: () => void;
}

export const FiltersBar: React.FC<FiltersBarProps> = ({
  type,
  onTypeChange,
  status,
  onStatusChange,
  search,
  onSearchChange,
  sortAsc,
  onToggleSort,
}) => {
  const [localSearch, setLocalSearch] = useState(search);

  // Sync if parent search changes externally (e.g. clear)
  useEffect(() => {
    setLocalSearch(search);
  }, [search]);

  // Debounce search input by 300ms ONLY when localSearch actually differs from parent search
  useEffect(() => {
    if (localSearch === search) return;

    const timer = setTimeout(() => {
      onSearchChange(localSearch);
    }, 300);

    return () => clearTimeout(timer);
  }, [localSearch, search, onSearchChange]);

  const handleClearSearch = () => {
    setLocalSearch('');
    if (search !== '') {
      onSearchChange('');
    }
  };

  const typeTabs: { id: SubmissionTypeFilter; label: string }[] = [
    { id: 'all', label: 'All Submissions' },
    { id: 'pilot', label: 'Pilot' },
    { id: 'talk', label: 'Talk to Us' },
  ];

  return (
    <div className="bg-white border border-[#DDE3E2] rounded-[1.25rem] p-3 sm:p-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
      {/* Left: Type Segmented Tabs */}
      <div className="inline-flex p-1 bg-[#F1F4F4] rounded-[0.875rem] border border-[#DDE3E2]/60 self-start md:self-auto">
        {typeTabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTypeChange(tab.id)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              type === tab.id
                ? 'bg-white text-[#1F292A] shadow-xs'
                : 'text-[#5A6D6C] hover:text-[#1F292A]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Right: Search, Status Select, Sort Toggle */}
      <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
        {/* Search input with 300ms debounce */}
        <div className="relative flex-1 sm:w-64 min-w-[180px]">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#5A6D6C]" />
          <input
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="Search name, email, msg..."
            className="w-full pl-8 pr-7 py-1.5 text-xs bg-white border border-[#DDE3E2] rounded-[0.875rem] text-[#1F292A] placeholder:text-[#8D9B9A] focus:outline-none focus:ring-2 focus:ring-[#336E87]"
          />
          {localSearch && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8D9B9A] hover:text-[#1F292A]"
              aria-label="Clear search query"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Status Select */}
        <div className="relative">
          <select
            value={status}
            onChange={(e) => onStatusChange(e.target.value as SubmissionStatusFilter)}
            className="px-3 py-1.5 text-xs font-medium text-[#1F292A] bg-white border border-[#DDE3E2] rounded-[0.875rem] focus:outline-none focus:ring-2 focus:ring-[#336E87] cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        {/* Sort Toggle */}
        <button
          type="button"
          onClick={onToggleSort}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#1F292A] bg-white hover:bg-[#F1F4F4] border border-[#DDE3E2] rounded-[0.875rem] transition-colors focus:outline-none focus:ring-2 focus:ring-[#336E87]"
          title={sortAsc ? 'Sorting Oldest First' : 'Sorting Newest First'}
        >
          <ArrowUpDown className="w-3.5 h-3.5 text-[#5A6D6C]" />
          <span>{sortAsc ? 'Oldest' : 'Newest'}</span>
        </button>
      </div>
    </div>
  );
};
