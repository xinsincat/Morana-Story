import {StrictMode, Component, ReactNode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

class ErrorBoundary extends Component<{children: ReactNode}, {hasError: boolean, error: any}> {
  constructor(props: {children: ReactNode}) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', color: '#ef4444', backgroundColor: '#09090b', minHeight: '100vh', fontFamily: 'sans-serif' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>網頁發生錯誤 (Something went wrong)</h1>
          <pre style={{ backgroundColor: '#18181b', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', color: '#a1a1aa' }}>
            {String(this.state.error)}
          </pre>
          <p style={{ marginTop: '1rem', color: '#71717a' }}>請將此錯誤訊息截圖提供給 AI 助手，以協助您修復問題。</p>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
