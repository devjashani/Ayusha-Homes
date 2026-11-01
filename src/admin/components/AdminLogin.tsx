import React, { useState, useEffect } from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';
import { Lock, Mail, AlertCircle, Loader2 } from 'lucide-react';

interface AdminLoginProps {
  supabase: SupabaseClient;
  onLoginSuccess: (email: string) => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ supabase, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // 5-attempt / 30-second lockout state
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutSecondsLeft, setLockoutSecondsLeft] = useState(0);

  useEffect(() => {
    if (lockoutSecondsLeft <= 0) return;
    const interval = setInterval(() => {
      setLockoutSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setFailedAttempts(0);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [lockoutSecondsLeft]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (lockoutSecondsLeft > 0 || loading) return;

    setErrorMessage(null);
    setLoading(true);

    try {
      const cleanEmail = email.trim().toLowerCase();
      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password,
      });

      if (error || !data.user) {
        const nextAttempts = failedAttempts + 1;
        setFailedAttempts(nextAttempts);
        if (nextAttempts >= 5) {
          setLockoutSecondsLeft(30);
          setErrorMessage('Too many failed attempts. Form locked for 30 seconds.');
        } else {
          setErrorMessage('Invalid email or password.');
        }
        setLoading(false);
        return;
      }

      // Check admin authorization via is_admin RPC
      const { data: isAdmin, error: rpcError } = await supabase.rpc('is_admin');
      if (rpcError || !isAdmin) {
        await supabase.auth.signOut();
        setErrorMessage('This account is not authorized.');
        setLoading(false);
        return;
      }

      // Success
      setFailedAttempts(0);
      const userEmail = data.user.email || cleanEmail;
      onLoginSuccess(userEmail);
    } catch {
      setErrorMessage('Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  const isLocked = lockoutSecondsLeft > 0;

  return (
    <div className="min-h-screen bg-[#F1F4F4] text-[#1F292A] font-['Onest'] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white border border-[#DDE3E2] rounded-[2rem] p-8 shadow-sm">
        {/* Header / Brand */}
        <div className="mb-6 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#336E87]/10 text-[#336E87] mb-3">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-[#1F292A]">
            AYUSHA Admin
          </h1>
          <p className="text-sm text-[#5A6D6C] mt-1">
            Sign in with authorized administrator credentials
          </p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div
            role="alert"
            className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2.5"
          >
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
            <span className="leading-relaxed">{errorMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="admin-email"
              className="block text-xs font-semibold uppercase tracking-wider text-[#5A6D6C] mb-1.5"
            >
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5A6D6C]" />
              <input
                id="admin-email"
                type="email"
                required
                autoComplete="email"
                disabled={isLocked || loading}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="owner@domain.com"
                className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-white border border-[#DDE3E2] rounded-[0.875rem] text-[#1F292A] placeholder:text-[#8D9B9A] focus:outline-none focus:ring-2 focus:ring-[#336E87] focus:border-transparent transition-colors disabled:opacity-50 disabled:bg-[#F1F4F4]"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="admin-password"
              className="block text-xs font-semibold uppercase tracking-wider text-[#5A6D6C] mb-1.5"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5A6D6C]" />
              <input
                id="admin-password"
                type="password"
                required
                autoComplete="current-password"
                disabled={isLocked || loading}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-white border border-[#DDE3E2] rounded-[0.875rem] text-[#1F292A] placeholder:text-[#8D9B9A] focus:outline-none focus:ring-2 focus:ring-[#336E87] focus:border-transparent transition-colors disabled:opacity-50 disabled:bg-[#F1F4F4]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLocked || loading}
            className="w-full mt-2 py-3 px-4 bg-[#336E87] hover:bg-[#2D6177] text-white font-medium text-sm rounded-[0.875rem] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#336E87] disabled:opacity-50 flex items-center justify-center gap-2 shadow-sm"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Verifying credentials...</span>
              </>
            ) : isLocked ? (
              <span>Locked ({lockoutSecondsLeft}s)</span>
            ) : (
              <span>Sign In</span>
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-[#8D9B9A]">
          Authorized personnel only. Access strictly governed by database policies.
        </p>
      </div>
    </div>
  );
};

