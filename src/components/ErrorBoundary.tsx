import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  public handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 rounded-2xl bg-slate-900 border border-rose-500/30 text-slate-200 my-4 shadow-xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">
                {this.props.fallbackTitle || 'Tampilan Hasil Menemui Kendala Rendisi'}
              </h3>
              <p className="text-xs text-slate-400">
                Data hasil tetap tersimpan. Klik tombol di bawah untuk menyegarkan tampilan.
              </p>
            </div>
          </div>
          <div className="bg-slate-950 p-3 rounded-lg text-xs font-mono text-rose-300 mb-4 overflow-x-auto">
            {this.state.error?.message || 'Unknown render exception'}
          </div>
          <button
            onClick={this.handleReset}
            className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs flex items-center gap-2 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Segarkan Tampilan
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
