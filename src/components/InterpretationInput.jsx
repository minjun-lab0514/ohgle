// src/components/InterpretationInput.jsx
import { useState, useEffect, useCallback, useRef } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import './InterpretationInput.css';

const MAX_CHARS = 300;

export default function InterpretationInput({ quoteId }) {
  const { user, nickname, requireAuth } = useAuth();
  const [text, setText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // 로그인 전 제출 시도한 텍스트를 보관 — 로그인 후 자동 제출
  const pendingTextRef = useRef(null);

  const doSubmit = useCallback(async (textToSubmit, uid, nick) => {
    if (!textToSubmit || textToSubmit.length > 500) return;
    if (!quoteId || !nick || !uid) return;

    setSubmitting(true);
    try {
      await addDoc(collection(db, 'quotes', quoteId, 'interpretations'), {
        nickname: nick.trim(),
        text: textToSubmit.trim(),
        likes: 0,
        likedBy: [],
        createdAt: serverTimestamp(),
        uid,
      });
      setText('');
    } catch (err) {
      console.error('해석 저장 실패:', err);
      alert('해석을 저장하는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setSubmitting(false);
    }
  }, [quoteId]);

  // 로그인+닉네임 완료 후 대기 중인 텍스트가 있으면 자동 제출
  useEffect(() => {
    if (user && nickname && pendingTextRef.current && !submitting) {
      const t = pendingTextRef.current;
      pendingTextRef.current = null;
      doSubmit(t, user.uid, nickname);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, nickname]);

  function handleFocus() {
    if (!user || !nickname) {
      requireAuth(null);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const trimmedText = text.trim();
    if (!trimmedText || submitting) return;

    if (!user || !nickname) {
      pendingTextRef.current = trimmedText;
      requireAuth(null);
      return;
    }

    doSubmit(trimmedText, user.uid, nickname);
  }

  return (
    <section className="input-section">
      <label className="input-label" htmlFor="interpretation-input">
        나의 해석 <span className="input-sub">이 명언이 당신에게 어떻게 다가왔나요?</span>
      </label>

      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <textarea
            id="interpretation-input"
            className="input-textarea"
            placeholder="당신만의 해석을 자유롭게 남겨보세요..."
            value={text}
            onChange={(e) => {
              if (e.target.value.length <= MAX_CHARS) setText(e.target.value);
            }}
            onFocus={handleFocus}
            rows={4}
          />
          <div className="input-footer">
            <div className="input-nickname">
              {nickname ? (
                <>
                  <span>작성자</span>
                  <span className="input-nickname-badge">{nickname}</span>
                </>
              ) : (
                <span>클릭하면 로그인합니다</span>
              )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span className="input-char-count">{text.length} / {MAX_CHARS}</span>
              <button
                className="input-submit"
                type="submit"
                disabled={!text.trim() || submitting}
              >
                {submitting ? '저장 중...' : '남기기'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}
