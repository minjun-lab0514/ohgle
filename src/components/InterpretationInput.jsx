// src/components/InterpretationInput.jsx
import { useState } from 'react';
import './InterpretationInput.css';

const MAX_CHARS = 300;

export default function InterpretationInput({ nickname, onFocusWithoutNickname, onSubmit, submitting }) {
  const [text, setText] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    if (!text.trim() || submitting) return;
    await onSubmit(text.trim());
    setText('');
  }

  function handleFocus() {
    if (!nickname) {
      onFocusWithoutNickname();
    }
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
                <span>클릭하면 닉네임을 설정합니다</span>
              )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span className="input-char-count">{text.length} / {MAX_CHARS}</span>
              <button
                className="input-submit"
                type="submit"
                disabled={!text.trim() || !nickname || submitting}
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
