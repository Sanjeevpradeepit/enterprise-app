import React from 'react';

import { crashService } from './crash.service';
import { CrashFallback } from './fallback';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<
  Props,
  State
> {
  state: State = {
    hasError: false,
  };

  static getDerivedStateFromError(error: Error) {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error) {
    crashService.captureException(error);
  }

  reset = () => {
    this.setState({
      hasError: false,
      error: undefined,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <CrashFallback
          error={this.state.error}
          resetError={this.reset}
        />
      );
    }

    return this.props.children;
  }
}