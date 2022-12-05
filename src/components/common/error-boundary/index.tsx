import React, {Component, ErrorInfo, ReactNode} from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}
class ErrorBoundary extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {hasError: false};
  }

  static getDerivedStateFromError(error: Error) {
    console.log(error);
    return {hasError: true};
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log({error, errorInfo});
    console.log('Reload trigger');
    if (typeof window !== undefined) window.location.reload();
  }

  render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      // You can render any custom fallback UI
      console.log('Reload trigger');
      window.location.reload();
      return (
        <div>
          <h2>Sorry for your inconvinient</h2>
          <h2>Todooy is in progress of Update Or Caught Error. Please try Again </h2>
        </div>
      );
    }

    // Return children components in case of no error
    return this.props.children;
  }
}

export default ErrorBoundary;
