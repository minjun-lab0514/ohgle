// src/App.jsx
import { useQuote } from './hooks/useQuote';
import { useAuth } from './contexts/AuthContext';

import QuoteDisplay from './components/QuoteDisplay';
import InterpretationInput from './components/InterpretationInput';
import InterpretationList from './components/InterpretationList';
import LoginModal from './components/LoginModal';
import SetNicknameModal from './components/SetNicknameModal';

import './App.css';

export default function App() {
  const { quote, quoteId, loading, error } = useQuote();
  const { showLoginModal, showSetNickname } = useAuth();

  const modals = (
    <>
      {showLoginModal && <LoginModal />}
      {showSetNickname && <SetNicknameModal />}
    </>
  );

  if (loading) {
    return (
      <div className="app">
        <AppHeader />
        <main className="main">
          <div className="state-center">
            <div className="state-spinner" />
            <span>오늘의 명언을 불러오는 중...</span>
          </div>
        </main>
        {modals}
      </div>
    );
  }

  if (error || !quote) {
    return (
      <div className="app">
        <AppHeader />
        <main className="main">
          <div className="state-center">
            <span className="state-error-icon">🌿</span>
            <p className="state-error-title">명언을 불러올 수 없어요</p>
            <p>{error || 'Firebase 설정을 확인해주세요.'}</p>
          </div>
        </main>
        {modals}
      </div>
    );
  }

  return (
    <div className="app">
      <AppHeader />

      <main className="main">
        <div className="content">
          <QuoteDisplay quote={quote} />

          <div className="section-divider"><hr /></div>

          <InterpretationInput quoteId={quoteId} />

          <InterpretationList quoteId={quoteId} />
        </div>
      </main>

      <footer className="footer">
        © {new Date().getFullYear()} Ohgle · 오늘의 명언, 당신의 해석
      </footer>

      {modals}
    </div>
  );
}

function AppHeader() {
  const { user, nickname, setShowLoginModal, logout } = useAuth();

  return (
    <header className="header">
      <div className="header-logo">
        오<span>글</span>
      </div>

      {user && nickname ? (
        <div className="header-nickname">
          <span className="header-nickname-badge">{nickname}</span>
          <button className="header-nickname-edit" onClick={logout}>
            로그아웃
          </button>
        </div>
      ) : !user ? (
        <button
          className="header-login-btn"
          onClick={() => setShowLoginModal(true)}
        >
          로그인
        </button>
      ) : null}
    </header>
  );
}
