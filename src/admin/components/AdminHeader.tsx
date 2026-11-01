import React from 'react';
import { RotateCw, Download, LogOut, ShieldCheck, Loader2 } from 'lucide-react';

interface AdminHeaderProps {
  email: string;
  isRefreshing: boolean;
  isExporting: boolean;
  onRefresh: () => void;
  onExportCsv: () => void;
  onSignOut: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  email,
  isRefreshing,
  isExporting,
  onRefresh,
  onExportCsv,
  onSignOut,
}) => {
  return (
    <header className="bg-white border-b border-[#DDE3E2] sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand / Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-8 h-8 rounded-xl bg-[#336E87] flex items-center justify-center text-white shadow-sm">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <span className="text-base font-semibold tracking-tight text-[#1F292A] block leading-tight">
              AYUSHA <span className="text-[#336E87] font-normal">Admin</span>
            </span>
          </div>
        </div>

        {/* Right: Actions & User Info */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onRefresh}
            disabled={isRefreshing}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#1F292A] bg-[#F1F4F4] hover:bg-[#E5ECEC] border border-[#DDE3E2] rounded-[0.875rem] transition-colors focus:outline-none focus:ring-2 focus:ring-[#336E87] disabled:opacity-50"
            title="Refresh submissions"
          >
            <RotateCw className={`w-3.5 h-3.5 text-[#5A6D6C] ${isRefreshing ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>

          <button
            type="button"
            onClick={onExportCsv}
            disabled={isExporting}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-[#336E87] hover:bg-[#2D6177] rounded-[0.875rem] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#336E87] shadow-sm disabled:opacity-50"
            title="Export filtered submissions to CSV"
          >
            {isExporting ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Download className="w-3.5 h-3.5" />
            )}
            <span className="hidden sm:inline">Export CSV</span>
          </button>

          <div className="h-5 w-px bg-[#DDE3E2] mx-1 hidden sm:block" />

          <div className="hidden md:flex flex-col text-right">
            <span className="text-xs text-[#1F292A] font-medium max-w-[180px] truncate" title={email}>
              {email}
            </span>
            <span className="text-[10px] text-[#5A6D6C] uppercase tracking-wider font-mono">
              Admin
            </span>
          </div>

          <button
            type="button"
            onClick={onSignOut}
            className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 text-xs font-medium text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 rounded-[0.875rem] transition-colors focus:outline-none focus:ring-2 focus:ring-red-400"
            title="Sign out of Admin Dashboard"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sign out</span>
          </button>
        </div>
      </div>
    </header>
  );
};

