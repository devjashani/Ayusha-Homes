import React from 'react';
import type { AdminStats } from '../types';
import { Inbox, Sparkles, Send, MessageSquare, Calendar } from 'lucide-react';

interface StatCardsProps {
  stats: AdminStats | null;
  loading: boolean;
}

export const StatCards: React.FC<StatCardsProps> = ({ stats, loading }) => {
  const cards = [
    {
      title: 'Total Submissions',
      value: stats?.total ?? 0,
      icon: Inbox,
      accent: 'text-[#1F292A] bg-[#F1F4F4]',
    },
    {
      title: 'New',
      value: stats?.newCount ?? 0,
      icon: Sparkles,
      accent: 'text-[#336E87] bg-[#336E87]/10',
    },
    {
      title: 'Pilot Requests',
      value: stats?.pilot ?? 0,
      icon: Send,
      accent: 'text-[#549A98] bg-[#549A98]/10',
    },
    {
      title: 'Talk to Us',
      value: stats?.talk ?? 0,
      icon: MessageSquare,
      accent: 'text-[#7EA294] bg-[#7EA294]/15',
    },
    {
      title: 'Last 7 Days',
      value: stats?.last7Days ?? 0,
      icon: Calendar,
      accent: 'text-[#336E87] bg-[#336E87]/10',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
      {cards.map((card, index) => {
        const Icon = card.icon;
        const isFifthOnMobile = index === 4;

        return (
          <div
            key={card.title}
            className={`bg-white border border-[#DDE3E2] rounded-[1.25rem] p-4 sm:p-5 shadow-xs transition-shadow ${
              isFifthOnMobile ? 'col-span-2 lg:col-span-1' : 'col-span-1'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#5A6D6C] truncate">
                {card.title}
              </span>
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${card.accent}`}>
                <Icon className="w-3.5 h-3.5" />
              </div>
            </div>

            {loading ? (
              <div className="h-8 w-16 bg-[#F1F4F4] animate-pulse rounded-lg mt-1" />
            ) : (
              <div className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1F292A]">
                {card.value.toLocaleString()}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

