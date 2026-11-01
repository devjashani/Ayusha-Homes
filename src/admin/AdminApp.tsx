/**
 * ============================================================================
 * AYUSHA ADMIN PORTAL - SECURITY ARCHITECTURE NOTICE
 * ============================================================================
 * 
 * Client-side UI guards, route checks, and session states are provided purely for
 * operator convenience and user experience. REAL SYSTEM SECURITY AND DATA INTEGRITY
 * ARE STRICTLY ENFORCED AT THE DATABASE LEVEL:
 * 
 * 1. ROW LEVEL SECURITY (RLS):
 *    - All SELECT, UPDATE, and DELETE operations on `public.submissions` require
 *      the Postgres security definer function `public.is_admin()` to return TRUE.
 *    - `public.is_admin()` verifies that the authenticated `auth.uid()` exists
 *      inside the locked `public.admin_users` table.
 *    - The public anon role is strictly limited to INSERT only (with consent=true).
 *      Anonymous callers cannot read, update, or delete any records.
 * 
 * 2. AUTHENTICATION & ACCESS CONTROL:
 *    - New user registration MUST remain DISABLED in the Supabase Dashboard:
 *      (Authentication > Providers > Email > "Allow new users to sign up" = OFF).
 *    - Admin users can ONLY be created manually by the project owner in the Supabase
 *      Auth console and explicitly provisioned in `public.admin_users`.
 *    - Service role / secret keys are NEVER exposed or used in this client bundle.
 * ============================================================================
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '../lib/supabase';
import type {
  Submission,
  SubmissionStatus,
  SubmissionTypeFilter,
  SubmissionStatusFilter,
  AdminStats,
  SubmissionFilters,
} from './types';
import { AdminHeader } from './components/AdminHeader';
import { AdminLogin } from './components/AdminLogin';
import { StatCards } from './components/StatCards';
import { FiltersBar } from './components/FiltersBar';
import { SubmissionsTable } from './components/SubmissionsTable';
import { SubmissionDrawer } from './components/SubmissionDrawer';
import { Toast } from './components/Toast';
import { exportSubmissionsToCsv } from './utils/exportCsv';
import { AlertTriangle, Database } from 'lucide-react';

const PAGE_SIZE = 25;
const INACTIVITY_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes

export default function AdminApp() {
  // Title & Robots meta tag management
  useEffect(() => {
    const originalTitle = document.title;
    document.title = 'AYUSHA Admin';

    let metaTag = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
    let created = false;

    if (!metaTag) {
      metaTag = document.createElement('meta');
      metaTag.name = 'robots';
      metaTag.content = 'noindex,nofollow';
      document.head.appendChild(metaTag);
      created = true;
    } else {
      metaTag.content = 'noindex,nofollow';
    }

    return () => {
      document.title = originalTitle;
      if (created && metaTag && metaTag.parentNode) {
        metaTag.parentNode.removeChild(metaTag);
      }
    };
  }, []);

  // Auth & Session state
  const [sessionEmail, setSessionEmail] = useState<string | null>(null);
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [authChecking, setAuthChecking] = useState<boolean>(true);

  // Dashboard Data state
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [statsLoading, setStatsLoading] = useState<boolean>(true);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [listLoading, setListLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [actionError, setActionError] = useState<string | null>(null);

  // Selected Submission for Drawer
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Filters state
  const [filters, setFilters] = useState<SubmissionFilters>({
    type: 'all',
    status: 'all',
    search: '',
    sortAsc: false,
    page: 0,
  });

  // Keep a stable ref to filters for the realtime listener
  const filtersRef = useRef(filters);
  useEffect(() => {
    filtersRef.current = filters;
  }, [filters]);

  // Verify Admin authorization via is_admin RPC
  const verifyAdmin = useCallback(async (): Promise<boolean> => {
    if (!supabase) return false;
    try {
      const { data: isAdmin, error } = await supabase.rpc('is_admin');
      if (error) {
        return false;
      }
      return Boolean(isAdmin);
    } catch {
      return false;
    }
  }, []);

  // Listen for auth state changes & initial session check
  useEffect(() => {
    if (!supabase) {
      setAuthChecking(false);
      return;
    }

    let isMounted = true;

    async function checkCurrentSession() {
      if (!supabase) return;
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user?.email) {
          const ok = await verifyAdmin();
          if (isMounted) {
            if (ok) {
              setSessionEmail(session.user.email);
              setIsAuthorized(true);
            } else {
              setSessionEmail(null);
              setIsAuthorized(false);
            }
          }
        } else {
          if (isMounted) {
            setSessionEmail(null);
            setIsAuthorized(false);
          }
        }
      } catch {
        if (isMounted) {
          setSessionEmail(null);
          setIsAuthorized(false);
        }
      } finally {
        if (isMounted) setAuthChecking(false);
      }
    }

    checkCurrentSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!isMounted) return;
        if (event === 'SIGNED_IN' && session?.user?.email) {
          const ok = await verifyAdmin();
          if (isMounted) {
            if (ok) {
              setSessionEmail(session.user.email);
              setIsAuthorized(true);
            } else {
              setSessionEmail(null);
              setIsAuthorized(false);
            }
          }
        } else if (event === 'SIGNED_OUT') {
          if (isMounted) {
            setSessionEmail(null);
            setIsAuthorized(false);
          }
        }
      }
    );

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [verifyAdmin]);

  // 30-Minute Idle Auto Sign-Out
  const lastActivityRef = useRef<number>(Date.now());

  useEffect(() => {
    if (!isAuthorized || !supabase) return;

    const resetTimer = () => {
      lastActivityRef.current = Date.now();
    };

    const events = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart'];
    events.forEach((eventName) => {
      window.addEventListener(eventName, resetTimer, { passive: true });
    });

    const interval = setInterval(async () => {
      if (Date.now() - lastActivityRef.current > INACTIVITY_TIMEOUT_MS) {
        if (supabase) {
          await supabase.auth.signOut();
        }
        setSessionEmail(null);
        setIsAuthorized(false);
      }
    }, 30000); // Check every 30 seconds

    return () => {
      events.forEach((eventName) => {
        window.removeEventListener(eventName, resetTimer);
      });
      clearInterval(interval);
    };
  }, [isAuthorized]);

  // Fetch Stats (Head queries, exact count)
  const fetchStats = useCallback(async () => {
    if (!supabase || !isAuthorized) return;
    setStatsLoading(true);

    try {
      const now = new Date();
      const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();

      const [totalRes, newRes, pilotRes, talkRes, last7Res] = await Promise.all([
        supabase.from('submissions').select('*', { count: 'exact', head: true }),
        supabase.from('submissions').select('*', { count: 'exact', head: true }).eq('status', 'new'),
        supabase.from('submissions').select('*', { count: 'exact', head: true }).eq('type', 'pilot'),
        supabase.from('submissions').select('*', { count: 'exact', head: true }).eq('type', 'talk'),
        supabase.from('submissions').select('*', { count: 'exact', head: true }).gte('created_at', sevenDaysAgo),
      ]);

      setStats({
        total: totalRes.count ?? 0,
        newCount: newRes.count ?? 0,
        pilot: pilotRes.count ?? 0,
        talk: talkRes.count ?? 0,
        last7Days: last7Res.count ?? 0,
      });
    } catch {
      // Retain previous stats on failure
    } finally {
      setStatsLoading(false);
    }
  }, [isAuthorized]);

  // Fetch Submissions List (Paginated & Filtered)
  const fetchSubmissions = useCallback(async () => {
    if (!supabase || !isAuthorized) return;
    setListLoading(true);
    setActionError(null);

    try {
      const offset = filters.page * PAGE_SIZE;
      let query = supabase
        .from('submissions')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: filters.sortAsc })
        .range(offset, offset + PAGE_SIZE - 1);

      if (filters.type !== 'all') {
        query = query.eq('type', filters.type);
      }

      if (filters.status !== 'all') {
        query = query.eq('status', filters.status);
      }

      if (filters.search.trim()) {
        const cleanSearch = filters.search.trim().replace(/[,%()]/g, '');
        if (cleanSearch) {
          query = query.or(
            `full_name.ilike.%${cleanSearch}%,email.ilike.%${cleanSearch}%,message.ilike.%${cleanSearch}%`
          );
        }
      }

      const { data, count, error } = await query;

      if (error) {
        setActionError('Failed to load submissions.');
      } else {
        setSubmissions((data as Submission[]) || []);
        setTotalCount(count ?? 0);
      }
    } catch {
      setActionError('Failed to load submissions.');
    } finally {
      setListLoading(false);
    }
  }, [filters, isAuthorized]);

  // Initial stats load when authorized
  useEffect(() => {
    if (isAuthorized) {
      fetchStats();
    }
  }, [isAuthorized, fetchStats]);

  // Submissions list query on authorized or filter change
  useEffect(() => {
    if (isAuthorized) {
      fetchSubmissions();
    }
  }, [isAuthorized, fetchSubmissions]);

  // Realtime subscription setup - only runs on auth change, uses filtersRef for current state
  useEffect(() => {
    if (!supabase || !isAuthorized) return;

    let channel: ReturnType<typeof supabase.channel> | null = null;

    try {
      channel = supabase
        .channel('admin-submissions-realtime')
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'submissions' },
          (payload) => {
            const newRow = payload.new as Submission;
            setToastMessage(`New submission from ${newRow.full_name || 'Anonymous'}`);
            fetchStats();

            // Refresh list if on page 1 with default filters
            const currentFilters = filtersRef.current;
            if (
              currentFilters.page === 0 &&
              currentFilters.type === 'all' &&
              currentFilters.status === 'all' &&
              !currentFilters.search.trim()
            ) {
              fetchSubmissions();
            }
          }
        )
        .subscribe();
    } catch {
      // Realtime not supported or failed to connect; silently rely on manual refresh
    }

    return () => {
      if (supabase && channel) {
        supabase.removeChannel(channel);
      }
    };
  }, [isAuthorized, fetchStats, fetchSubmissions]);

  // Filter callbacks with stable equality checks
  const handleTypeChange = useCallback((newType: SubmissionTypeFilter) => {
    setFilters((prev) => (prev.type === newType ? prev : { ...prev, type: newType, page: 0 }));
  }, []);

  const handleStatusChange = useCallback((newStatus: SubmissionStatusFilter) => {
    setFilters((prev) => (prev.status === newStatus ? prev : { ...prev, status: newStatus, page: 0 }));
  }, []);

  const handleSearchChange = useCallback((searchVal: string) => {
    setFilters((prev) => (prev.search === searchVal ? prev : { ...prev, search: searchVal, page: 0 }));
  }, []);

  const handleToggleSort = useCallback(() => {
    setFilters((prev) => ({ ...prev, sortAsc: !prev.sortAsc, page: 0 }));
  }, []);

  const handlePageChange = useCallback((newPage: number) => {
    setFilters((prev) => (prev.page === newPage ? prev : { ...prev, page: newPage }));
  }, []);

  // Handlers
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await Promise.all([fetchStats(), fetchSubmissions()]);
    setIsRefreshing(false);
  };

  const handleSignOut = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    setSessionEmail(null);
    setIsAuthorized(false);
  };

  const handleExportCsv = async () => {
    if (!supabase || isExporting) return;
    setIsExporting(true);
    try {
      await exportSubmissionsToCsv(supabase, filters);
    } catch {
      setActionError('Failed to export CSV. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  // Optimistic Status Update
  const handleUpdateStatus = async (id: string, newStatus: SubmissionStatus) => {
    if (!supabase) return;

    const previousSubmissions = [...submissions];
    const previousSelected = selectedSubmission;

    // Optimistic UI update
    setSubmissions((prev) =>
      prev.map((sub) => (sub.id === id ? { ...sub, status: newStatus } : sub))
    );
    if (selectedSubmission && selectedSubmission.id === id) {
      setSelectedSubmission({ ...selectedSubmission, status: newStatus });
    }

    try {
      const { error } = await supabase
        .from('submissions')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) {
        throw error;
      }
      fetchStats();
    } catch {
      // Rollback on error
      setSubmissions(previousSubmissions);
      if (previousSelected) {
        setSelectedSubmission(previousSelected);
      }
      setActionError('Failed to update status. Rolled back to previous state.');
    }
  };

  // Save Notes handler
  const handleUpdateNotes = async (id: string, notes: string) => {
    if (!supabase) return;

    try {
      const { error } = await supabase
        .from('submissions')
        .update({ notes })
        .eq('id', id);

      if (error) throw error;

      setSubmissions((prev) =>
        prev.map((sub) => (sub.id === id ? { ...sub, notes } : sub))
      );
      if (selectedSubmission && selectedSubmission.id === id) {
        setSelectedSubmission({ ...selectedSubmission, notes });
      }
    } catch {
      setActionError('Failed to save notes.');
      throw new Error('Failed to save notes.');
    }
  };

  // Delete Submission handler
  const handleDeleteSubmission = async (id: string) => {
    if (!supabase) return;

    try {
      const { error } = await supabase
        .from('submissions')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setSubmissions((prev) => prev.filter((sub) => sub.id !== id));
      setTotalCount((prev) => Math.max(0, prev - 1));
      setSelectedSubmission(null);
      fetchStats();
    } catch {
      setActionError('Failed to delete submission.');
      throw new Error('Failed to delete submission.');
    }
  };

  // 1. Check if Supabase client is configured
  if (!supabase) {
    return (
      <div className="min-h-screen bg-[#F1F4F4] text-[#1F292A] font-['Onest'] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white border border-[#DDE3E2] rounded-[2rem] p-8 text-center shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 mx-auto flex items-center justify-center mb-3">
            <Database className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-[#1F292A]">Supabase Not Configured</h2>
          <p className="text-xs text-[#5A6D6C] mt-2 leading-relaxed">
            Environment variables <code className="font-mono bg-[#F1F4F4] px-1 py-0.5 rounded text-[#1F292A]">VITE_SUPABASE_URL</code> and <code className="font-mono bg-[#F1F4F4] px-1 py-0.5 rounded text-[#1F292A]">VITE_SUPABASE_ANON_KEY</code> must be defined in your <code className="font-mono">.env.local</code> or deployment settings.
          </p>
        </div>
      </div>
    );
  }

  // 2. Loading session state
  if (authChecking) {
    return (
      <div className="min-h-screen bg-[#F1F4F4] flex flex-col items-center justify-center font-['Onest'] text-[#1F292A]">
        <div className="w-8 h-8 border-2 border-[#336E87] border-t-transparent rounded-full animate-spin" />
        <p className="mt-3 text-xs tracking-wider uppercase text-[#5A6D6C] font-mono">
          Verifying authorization...
        </p>
      </div>
    );
  }

  // 3. Unauthenticated / Unauthorized Login screen
  if (!isAuthorized || !sessionEmail) {
    return (
      <AdminLogin
        supabase={supabase}
        onLoginSuccess={(authedEmail: string) => {
          setSessionEmail(authedEmail);
          setIsAuthorized(true);
        }}
      />
    );
  }

  // 4. Authenticated Admin Dashboard
  return (
    <div className="min-h-screen bg-[#F1F4F4] text-[#1F292A] font-['Onest'] antialiased">
      {/* Top Header */}
      <AdminHeader
        email={sessionEmail}
        isRefreshing={isRefreshing}
        isExporting={isExporting}
        onRefresh={handleRefresh}
        onExportCsv={handleExportCsv}
        onSignOut={handleSignOut}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Action Error Banner */}
        {actionError && (
          <div
            role="alert"
            className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{actionError}</span>
            </div>
            <button
              type="button"
              onClick={() => setActionError(null)}
              className="text-red-700 hover:text-red-900 font-semibold text-xs ml-2 cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* 1. Stat Cards Row */}
        <StatCards stats={stats} loading={statsLoading} />

        {/* 2. Filters Bar */}
        <FiltersBar
          type={filters.type}
          onTypeChange={handleTypeChange}
          status={filters.status}
          onStatusChange={handleStatusChange}
          search={filters.search}
          onSearchChange={handleSearchChange}
          sortAsc={filters.sortAsc}
          onToggleSort={handleToggleSort}
        />

        {/* 3. Submissions Table / Cards */}
        <SubmissionsTable
          submissions={submissions}
          totalCount={totalCount}
          loading={listLoading}
          page={filters.page}
          pageSize={PAGE_SIZE}
          onPageChange={handlePageChange}
          onSelectRow={(sub: Submission) => setSelectedSubmission(sub)}
          onUpdateStatus={handleUpdateStatus}
        />
      </main>

      {/* Detail Drawer / Mobile Sheet */}
      <SubmissionDrawer
        submission={selectedSubmission}
        onClose={() => setSelectedSubmission(null)}
        onUpdateStatus={handleUpdateStatus}
        onUpdateNotes={handleUpdateNotes}
        onDeleteSubmission={handleDeleteSubmission}
      />

      {/* Realtime Toast Notification */}
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}
    </div>
  );
}
