// src/components/SetNicknameModal.jsx
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './NicknameModal.css';
import './SetNicknameModal.css';

export default function SetNicknameModal() {
  const { saveNickname, checkNicknameAvailable, logout } = useAuth();
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [checking, setChecking] = useState(false);

  async function handleSubmit(e) {
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
    if (!/^[가-힣a-zA-Z0-9]+$/.test(trimmed)) {
      setError('닉네임은 한글, 영문, 숫자만 사용할 수 있습니다.');
      return;
    }

    setChecking(true);
    try {
      const available = await checkNicknameAvailable(trimmed);
      if (!available) {
        setError('이미 사용 중인 닉네임입니다.');
        return;
      }
      await saveNickname(trimmed);
    } catch (err) {
      console.error('닉네임 저장 실패:', err);
      setError('오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setChecking(false);
    }
  }

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-label="닉네임 설정">
      <div className="modal-box scale-in">
        <span className="modal-icon">✍️</span>
        <h2 className="modal-title">반갑습니다!</h2>
        <p className="modal-desc">
          처음이시군요!<br />
          사용하실 닉네임을 알려주세요.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            className="modal-input"
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
            disabled={!value.trim() || checking}
          >
            {checking ? '확인 중...' : '완료'}
          </button>
        </form>

        <button className="modal-text-btn" onClick={logout}>
          취소 (로그아웃)
        </button>
      </div>
    </div>
  );
}
