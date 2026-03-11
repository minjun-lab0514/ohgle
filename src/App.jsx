// src/App.jsx
import { useState } from 'react';
import { db } from './firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

import { useQuote } from './hooks/useQuote';
import QuoteDisplay from './components/QuoteDisplay';
import NicknameModal from './components/NicknameModal';
import InterpretationInput from './components/InterpretationInput';
import InterpretationList from './components/InterpretationList';

import './App.css';

const NICKNAME_KEY = 'ohgle_nickname';
const DEVICE_ID_KEY = 'ohgle_device_id';

function getOrCreateDeviceId() {
  let id = localStorage.getItem(DEVICE_ID_KEY);
  if (!id) {
    id = 'dev_' + Math.random().toString(36).slice(2) + Date.now().toString(36);
    localStorage.setItem(DEVICE_ID_KEY, id);
  }
  return id;
}

export default function App() {
  const { quote, quoteId, loading, error } = useQuote();

  const [nickname, setNickname] = useState(() => localStorage.getItem(NICKNAME_KEY) || '');
  const [deviceId] = useState(getOrCreateDeviceId);
  const [showNicknameModal, setShowNicknameModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function handleNicknameSubmit(name) {
    setNickname(name);
    localStorage.setItem(NICKNAME_KEY, name);
    setShowNicknameModal(false);
  }

  function handleFocusWithoutNickname() {
    setShowNicknameModal(true);
  }

  async function handleSubmitInterpretation(rawText) {
    const text = rawText.trim();
    const cleanNickname = nickname.trim();
    
    if (submitting || !text || text.length > 500) return;
    if (!quoteId || !cleanNickname) return;
    
    setSubmitting(true);
    try {
      await addDoc(collection(db, 'quotes', quoteId, 'interpretations'), {
        nickname: cleanNickname,
        text,
        likes: 0,
        likedBy: [],
        createdAt: serverTimestamp(),
        deviceId,
      });
    } catch (err) {
      console.error('해석 저장 실패:', err);
      alert('해석을 저장하는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setSubmitting(false);
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="app">
        <AppHeader nickname={nickname} onEditNickname={() => setShowNicknameModal(true)} />
        <main className="main">
          <div className="state-center">
            <div className="state-spinner" />
            <span>오늘의 명언을 불러오는 중...</span>
          </div>
        </main>
      </div>
    );
  }

  // Error state (e.g., Firebase not configured yet)
  if (error || !quote) {
    return (
      <div className="app">
        <AppHeader nickname={nickname} onEditNickname={() => setShowNicknameModal(true)} />
        <main className="main">
          <div className="state-center">
            <span className="state-error-icon">🌿</span>
            <p className="state-error-title">명언을 불러올 수 없어요</p>
            <p>{error || 'Firebase 설정을 확인해주세요.'}</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="app">
      <AppHeader nickname={nickname} onEditNickname={() => setShowNicknameModal(true)} />

      <main className="main">
        <div className="content">
          <QuoteDisplay quote={quote} />

          <div className="section-divider"><hr /></div>

          <InterpretationInput
            nickname={nickname}
            onFocusWithoutNickname={handleFocusWithoutNickname}
            onSubmit={handleSubmitInterpretation}
            submitting={submitting}
          />

          <InterpretationList quoteId={quoteId} deviceId={deviceId} />
        </div>
      </main>

      <footer className="footer">
        © 2025 Ohgle · 오늘의 명언, 당신의 해석
      </footer>

      {showNicknameModal && (
        <NicknameModal onSubmit={handleNicknameSubmit} />
      )}
    </div>
  );
}

function AppHeader({ nickname, onEditNickname }) {
  return (
    <header className="header">
      <div className="header-logo">
        오<span>글</span>
      </div>
      {nickname && (
        <div className="header-nickname">
          <span className="header-nickname-badge">{nickname}</span>
          <button className="header-nickname-edit" onClick={onEditNickname}>
            변경
          </button>
        </div>
      )}
    </header>
  );
}
