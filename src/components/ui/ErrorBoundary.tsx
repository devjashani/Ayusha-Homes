import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (import.meta.env.DEV) {
      console.error('[AYUSHA ErrorBoundary] Caught error:', error, errorInfo);
    }
  }

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen w-full flex items-center justify-center p-6 bg-[var(--bg,#F4F8F8)] text-[var(--ink,#1B2829)]">
          <div className="max-w-md w-full rounded-2xl p-8 bg-white border border-[var(--line,#D8E2E7)] shadow-xl text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-[var(--surface,#E7F3FB)] text-[var(--accent,#336E87)] flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-semibold tracking-tight text-[var(--ink,#1B2829)]">
              Something went wrong
            </h1>
            <p className="text-sm text-[var(--muted,#4F6264)] leading-relaxed">
              We encountered an unexpected error loading the application. Please try reloading the page.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={this.handleReload}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold bg-[var(--ink,#1B2829)] text-white hover:bg-[var(--ink-2,#263A3C)] transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reload Page</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

