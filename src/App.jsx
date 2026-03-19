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

function GoogleBadgeIcon() {
  return (
    <svg
      className="header-google-icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="currentColor"
        d="M21.805 10.023H12v3.977h5.617c-.242 1.242-.977 2.297-2.082 3l3.227 2.508C20.533 17.664 21.805 15.047 21.805 12c0-.668-.055-1.312-.156-1.977z"
      />
      <path
        fill="currentColor"
        d="M12 22c2.7 0 4.965-.895 6.621-2.43l-3.227-2.508C14.484 17.742 13.305 18.09 12 18.09c-2.648 0-4.895-1.789-5.699-4.195L2.965 16.41C4.594 19.652 8.047 22 12 22z"
      />
      <path
        fill="currentColor"
        d="M6.301 13.895A6.133 6.133 0 0 1 5.91 12c0-.664.113-1.305.391-1.895L2.965 7.59A9.965 9.965 0 0 0 2 12c0 1.617.387 3.148 1.074 4.5z"
      />
      <path
        fill="currentColor"
        d="M12 5.91c1.477 0 2.797.508 3.836 1.504l2.875-2.875C16.957 2.895 14.695 2 12 2 8.047 2 4.594 4.348 2.965 7.59l3.336 2.515C7.105 7.699 9.352 5.91 12 5.91z"
      />
    </svg>
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
          <span className="header-nickname-badge">
            <GoogleBadgeIcon />
            {nickname}
          </span>
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
