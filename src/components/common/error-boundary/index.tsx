import React, {Component, ErrorInfo, ReactNode} from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  hasNextI18Error: boolean;
}
class ErrorBoundary extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {hasError: false, hasNextI18Error: false};
  }

  static getDerivedStateFromError(error: Error) {
    console.log(error);
    if (error.message.includes('i18')) return {hasError: true, hasNextI18Error: true};
    return {hasError: true, hasNextI18Error: false};
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log({error, errorInfo});
  }

  render() {
    // If this error is NextI18, automatic reload page
    if (this.state.hasNextI18Error) {
      window.location.reload();
    }
    // Check if the error is thrown
    if (this.state.hasError) {
      // You can render any custom fallback UI
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
