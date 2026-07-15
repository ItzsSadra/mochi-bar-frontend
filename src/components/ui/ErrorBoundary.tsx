"use client";

import { Component, ReactNode } from "react";
import { HiExclamationTriangle } from "react-icons/hi2";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="flex min-h-[40vh] items-center justify-center px-5">
          <div className="text-center">
            <HiExclamationTriangle className="mx-auto text-4xl text-red-400" />
            <h2 className="mt-4 text-lg font-bold" style={{ color: "var(--foreground)" }}>
              خطایی رخ داد
            </h2>
            <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
              متأسفانه مشکلی پیش آمده است. لطفاً دوباره تلاش کنید.
            </p>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="btn-primary mt-5"
            >
              تلاش مجدد
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
