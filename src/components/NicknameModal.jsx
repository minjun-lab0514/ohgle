// src/components/NicknameModal.jsx
import { useState } from 'react';
import './NicknameModal.css';

export default function NicknameModal({ onSubmit }) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) {
      setError('닉네임을 입력해주세요.');
      return;
    }
    if (trimmed.length > 12) {
      setError('닉네임은 12자 이내로 입력해주세요.');
      return;
    }
    onSubmit(trimmed);
  }

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-label="닉네임 입력">
      <div className="modal-box scale-in">
        <span className="modal-icon">✍️</span>
        <h2 className="modal-title">반갑습니다!</h2>
        <p className="modal-desc">
          해석을 남기기 전에<br />
          사용하실 닉네임을 알려주세요.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            className="modal-input"
            id="nickname-input"
            type="text"
            placeholder="닉네임 입력 (최대 12자)"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setError('');
            }}
            autoFocus
            maxLength={12}
          />
          {error && <p className="modal-error">{error}</p>}
          <button
            className="modal-submit"
            type="submit"
            disabled={!value.trim()}
          >
            완료
          </button>
        </form>
      </div>
    </div>
  );
}
